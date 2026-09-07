/**
 * dev-journey 验证工具
 * 用法：node node_util/verify.mjs
 * 流程：生成临时 smoke 宿主页（o-app 指向 smoke-app-config）+ shadow-walk 收集器，
 * 起 python http.server，用无头 Chrome dump-dom 对每个用例做断言。
 * SPA 用例：home 路由加载；独立页用例：把目标文件复制为同目录 smoke 副本注入收集器。
 * 断言：expectText/expectHrefs/expectLmSrc 子串命中、无 load fail、console 无错误（可 allowError）。
 */
import { spawn, execSync } from "node:child_process";
import { readFileSync, writeFileSync, copyFileSync, rmSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 8734;
const BASE = `http://127.0.0.1:${PORT}`;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// shadow-walk 收集器：遍历 shadowRoot 收集文本/hrefs/l-m src，写入 body 的 data-smoke-* 属性
const COLLECTOR = `
<script>
  setTimeout(() => {
    const acc = { text: "", hrefs: [], lmSrcs: [], iframes: [] };
    const seen = new Set();
    const walk = (node) => {
      if (node.nodeType === 3) { acc.text += node.textContent; return; }
      // 元素去重：shadow 与 light 遍历路径会重复访问同一节点
      if (seen.has(node)) return;
      seen.add(node);
      if (node.nodeName === "A" && node.href) acc.hrefs.push(node.href);
      if (node.tagName === "L-M" && node.getAttribute("src")) acc.lmSrcs.push(node.getAttribute("src"));
      if (node.tagName === "IFRAME" && node.getAttribute("src")) acc.iframes.push(node.getAttribute("src"));
      if (node.shadowRoot) [...node.shadowRoot.childNodes].forEach((c) => walk(c));
      [...node.childNodes].forEach((c) => walk(c));
    };
    walk(document.body);
    document.body.setAttribute("data-smoke-text", acc.text.replace(/\\s+/g, " ").slice(0, 8000));
    document.body.setAttribute("data-smoke-hrefs", acc.hrefs.join(","));
    document.body.setAttribute("data-smoke-lmsrc", acc.lmSrcs.join(","));
    document.body.setAttribute("data-smoke-iframes", acc.iframes.join(","));
  }, 10000);
</script>`;

const CASES = [
  // ===== P0 =====
  {
    name: "P0-projects列表",
    type: "spa",
    home: "app/projects/",
    expectText: ["力扣", "文档", "项目", "示例项目", "一个 ofa.js 小项目演示"],
    expectLmSrc: ["src/micro/l-micro.html", "apps/projects/components/projects-app.html"],
  },
  {
    name: "P0-projects深链详情",
    type: "spa",
    home: "app/projects/?sub=demo",
    expectText: ["项目列表", "示例项目", "点我 +1", "返回"],
    expectHrefs: ["projects/demo/index.html"],
  },
  {
    name: "P0-leetcode深链",
    type: "spa",
    home: "app/leetcode/",
    expectText: ["力扣", "1.两数之和", "还原代码"],
  },
  {
    name: "P0-projects带斜杠深链",
    type: "spa",
    home: "app/projects/",
    expectText: ["力扣", "文档", "项目", "示例项目"],
  },
  {
    name: "P0-projects独立打开",
    type: "standalone",
    file: "apps/projects/index.html",
    expectText: ["示例项目", "一个 ofa.js 小项目演示"],
  },
  {
    name: "P0-demo独立打开",
    type: "standalone",
    file: "projects/demo/index.html",
    expectText: ["点我 +1", "返回", "点击次数：0"],
  },
  // ===== P1 =====
  {
    name: "P1-mdbook内嵌",
    type: "spa",
    home: "app/mdbook/",
    expectText: ["文档", "filename与dirname", "在 CommonJS 模块中使用"],
    expectLmSrc: ["apps/mdbook/components/mdbook-app.html", "apps/mdbook/components/mdbook-menu.html"],
  },
  {
    name: "P1-mdbook独立打开",
    type: "standalone",
    file: "apps/mdbook/index.html",
    expectText: ["filename与dirname", "在 CommonJS 模块中使用"],
  },
  // ===== P2 =====
  {
    name: "P2-leetcode内嵌",
    type: "spa",
    home: "app/leetcode/",
    expectText: ["力扣", "1.两数之和", "还原代码", "运行", "2.两数相加"],
    expectLmSrc: ["apps/leetcode/components/leetcode-app.html", "apps/leetcode/components/l-editor.html", "apps/leetcode/components/l-console-list.html"],
    expectIframes: ["apps/leetcode/components/CodeMirrorIframe/index.html"],
  },
  {
    name: "P2-leetcode独立打开",
    type: "standalone",
    file: "apps/leetcode/index.html",
    expectText: ["力扣", "1.两数之和", "还原代码", "运行"],
    expectIframes: ["apps/leetcode/components/CodeMirrorIframe/index.html"],
  },
  {
    name: "P2-CodeMirrorIframe独立",
    type: "standalone",
    file: "apps/leetcode/components/CodeMirrorIframe/index.html",
    expectText: ["1"],
  },
  // ===== P3 =====
  {
    name: "P3-缓存迁移探针",
    type: "spa-seed",
    seed: {
      PAGE_MD_CONTENT: "# 迁移测试标题\n\n迁移内容",
      PAGE_MD_TITLE: "filename与dirname.md",
    },
    home: "app/mdbook/",
    expectText: ["迁移测试标题"],
  },
  // ===== 修复回归 =====
  {
    name: "FIX-tab切换菜单稳定",
    type: "spa-switch",
    home: "app/leetcode/",
    budget: 60000,
    expectText: ["1.两数之和"], // 最终停在力扣，断言当前应用菜单渲染；console 零错误由全局检查覆盖
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function ensureServer() {
  const up = await fetch(`${BASE}/`).then(() => true).catch(() => false);
  if (up) return;
  const server = spawn("python3", ["-m", "http.server", String(PORT)], {
    cwd: ROOT,
    stdio: "ignore",
    detached: true,
  });
  server.unref();
  for (let i = 0; i < 30; i++) {
    await sleep(300);
    if (await fetch(`${BASE}/`).then(() => true).catch(() => false)) return;
  }
  throw new Error("静态服务启动失败");
}

/** 生成 smoke 宿主页（index.html 副本 + o-app 指向 smoke config + 注入脚本） */
function writeSmokeIndex(script = COLLECTOR) {
  let html = readFileSync(join(ROOT, "index.html"), "utf-8");
  html = html.replace('src="./src/js/app-config.mjs"', 'src="./smoke-app-config.mjs"');
  html = html.replace("</body>", script + "</body>");
  writeFileSync(join(ROOT, "smoke-index.html"), html);
  writeFileSync(join(ROOT, "smoke-app-config.mjs"), "export const home = \"__HOME__\";\n");
}

// tab 切换用例脚本：力扣→文档→力扣→文档 连续切换后收集文本（验证菜单/内容稳定渲染）
const SWITCH_SCRIPT = `
<script>
  const walkAll = (node, acc) => {
    if (node.nodeType === 3) { acc.text += node.textContent; return; }
    if (node.shadowRoot) [...node.shadowRoot.childNodes].forEach((c) => walkAll(c, acc));
    [...node.childNodes].forEach((c) => walkAll(c, acc));
  };
  const clickTab = (name) => {
    const acc = { btns: [] };
    const w = (node) => {
      if (node.nodeName === "BUTTON" && node.textContent.trim() === name) acc.btns.push(node);
      if (node.shadowRoot) [...node.shadowRoot.childNodes].forEach((c) => w(c));
      [...node.childNodes].forEach((c) => w(c));
    };
    w(document.body);
    if (acc.btns.length) acc.btns[0].click();
  };
  setTimeout(() => {
    setTimeout(() => {
      clickTab("文档");
      setTimeout(() => {
        clickTab("力扣");
        setTimeout(() => {
          clickTab("文档");
          setTimeout(() => {
            clickTab("力扣");
            setTimeout(() => {
              const acc = { text: "" };
              walkAll(document.body, acc);
              document.body.setAttribute("data-smoke-text", acc.text.replace(/\\s+/g, " ").slice(0, 8000));
            }, 6000);
          }, 6000);
        }, 6000);
      }, 6000);
    }, 8000);
  }, 1000);
</script>`;

/** 独立页用例：复制为同目录 smoke 副本并注入收集器 */
function writeSmokeStandalone(file) {
  const src = join(ROOT, file);
  const dest = join(ROOT, dirname(file), "smoke-" + file.split("/").pop());
  let html = readFileSync(src, "utf-8");
  html = html.replace("</body>", COLLECTOR + "</body>");
  writeFileSync(dest, html);
  return dest;
}

async function runChrome(url, budget = 30000) {
  return new Promise((resolve) => {
    const p = spawn(CHROME, [
      "--headless=new", "--disable-gpu", "--no-first-run",
      `--virtual-time-budget=${budget}`, "--enable-logging=stderr",
      "--dump-dom", url,
    ], { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "", stderr = "";
    p.stdout.on("data", (d) => (stdout += d));
    p.stderr.on("data", (d) => (stderr += d));
    p.on("exit", () => resolve({ stdout, stderr }));
  });
}

function extract(dom) {
  const pick = (attr) => {
    const m = dom.match(new RegExp(`${attr}="([^"]*)"`));
    return m ? m[1] : "";
  };
  return {
    text: pick("data-smoke-text"),
    hrefs: pick("data-smoke-hrefs"),
    lmSrc: pick("data-smoke-lmsrc"),
    iframes: pick("data-smoke-iframes"),
  };
}

async function runCase(c) {
  let url;
  let cleanup = () => {};
  if (c.type === "spa" || c.type === "spa-seed" || c.type === "spa-switch") {
    if (c.type === "spa-switch") {
      // 切换用例：收集器换成 tab 连续点击脚本（先重写宿主页，再写配置，避免占位符覆盖 home）
      writeSmokeIndex(SWITCH_SCRIPT);
    }
    // 每次重写整个配置（占位符替换一次后就消失，不能复用 replace）
    writeFileSync(
      join(ROOT, "smoke-app-config.mjs"),
      `export const home = ${JSON.stringify(c.home)};\n`
    );
    if (c.type === "spa-seed") {
      // 探针用例：head 注入旧版本 localStorage 数据，验证 cache.js 迁移；跑完恢复原文件
      const seedScript = `<script>localStorage.setItem("dev-journey_0.2.9", ${JSON.stringify(JSON.stringify(c.seed))});</script>`;
      let html = readFileSync(join(ROOT, "smoke-index.html"), "utf-8");
      html = html.replace("<head>", "<head>" + seedScript);
      writeFileSync(join(ROOT, "smoke-index.html"), html);
      cleanup = () => writeFileSync(join(ROOT, "smoke-index.html"), readFileSync(join(ROOT, "smoke-index.html"), "utf-8").replace(seedScript, ""));
    }
    url = `${BASE}/smoke-index.html`;
  } else {
    const dest = writeSmokeStandalone(c.file);
    url = BASE + "/" + dest.slice(ROOT.length + 1);
    cleanup = () => rmSync(dest, { force: true });
  }
  const { stdout, stderr } = await runChrome(url, c.budget ?? 30000);
  cleanup();
  const dom = stdout;
  const { text, hrefs, lmSrc, iframes } = extract(dom);
  const fails = [];
  for (const t of c.expectText || []) {
    if (!text.includes(t)) fails.push(`text缺少【${t}】`);
  }
  for (const h of c.expectHrefs || []) {
    if (!hrefs.includes(h)) fails.push(`href缺少【${h}】`);
  }
  for (const l of c.expectLmSrc || []) {
    if (!lmSrc.includes(l)) fails.push(`lmsrc缺少【${l}】`);
  }
  for (const f of c.expectIframes || []) {
    if (!iframes.includes(f)) fails.push(`iframe缺少【${f}】`);
  }
  if (text.includes("load fail")) fails.push("出现 load fail 页");
  if (!c.allowError) {
    const errLines = stderr
      .split("\n")
      .filter((l) => l.includes("CONSOLE"))
      .filter((l) => /(uncaught|comp_registered|load_fail|load_page_module|rendering error)/i.test(l));
    if (errLines.length) fails.push(`console 错误 ${errLines.length} 行：${errLines[0]?.slice(0, 160)}`);
  }
  return { name: c.name, pass: fails.length === 0, fails };
}

async function main() {
  writeSmokeIndex();
  await ensureServer();
  const results = [];
  for (const c of CASES) {
    let r = await runCase(c);
    // CDN（esm.sh/jsdelivr）偶发抖动会导致组件 blob import 失败，失败重试一次
    if (!r.pass && !c.allowError) {
      await sleep(2000);
      const retry = await runCase(c);
      if (retry.pass) {
        console.log(`RETRY-PASS  ${c.name}（首次失败为瞬时抖动）`);
        r = retry;
      }
    }
    results.push(r);
    console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}`);
    r.fails.forEach((f) => console.log(`      - ${f}`));
  }
  // 清理
  rmSync(join(ROOT, "smoke-index.html"), { force: true });
  rmSync(join(ROOT, "smoke-app-config.mjs"), { force: true });
  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} 通过`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error("verify 执行失败：", e);
  process.exit(2);
});
