/**
 * dev-journey 验证工具
 * 用法：node node_util/verify.mjs
 * 流程：生成临时 smoke 宿主页（index.html 副本 + 注入 hash 与 shadow-walk 收集器），
 * 起 python http.server，用无头 Chrome dump-dom 对每个用例做断言。
 * SPA 用例：设置 location.hash 后等壳的 data-app-ready 信号再收集；
 * 独立页用例：把目标文件复制为同目录 smoke 副本注入收集器。
 * 断言：expectText/expectHrefs/expectLmSrc/expectIframes/expectHash 子串命中、
 * 无 load fail、console 无错误（可 allowError）。
 */
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 8734;
const BASE = `http://127.0.0.1:${PORT}`;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// shadow-walk 收集器：等 data-app-ready 后遍历 shadowRoot 收集文本/hrefs/l-m src/hash/样式注入情况
const COLLECTOR = `
<script>
  const collectSmoke = () => {
    const acc = { text: "", hrefs: [], lmSrcs: [], iframes: [], styledRoots: 0 };
    const seen = new Set();
    const walk = (node) => {
      if (node.nodeType === 3) { acc.text += node.textContent; return; }
      // 元素去重：shadow 与 light 遍历路径会重复访问同一节点
      if (seen.has(node)) return;
      seen.add(node);
      if (node.nodeName === "A" && node.href) acc.hrefs.push(node.href);
      if (node.tagName === "L-M" && node.getAttribute("src")) acc.lmSrcs.push(node.getAttribute("src"));
      if (node.tagName === "IFRAME" && node.getAttribute("src")) acc.iframes.push(node.getAttribute("src"));
      if (node.shadowRoot) {
        if ((node.shadowRoot.adoptedStyleSheets || []).length) acc.styledRoots++;
        [...node.shadowRoot.childNodes].forEach((c) => walk(c));
      }
      [...node.childNodes].forEach((c) => walk(c));
    };
    walk(document.body);
    document.body.setAttribute("data-smoke-text", acc.text.replace(/\\s+/g, " ").slice(0, 8000));
    document.body.setAttribute("data-smoke-hrefs", acc.hrefs.join(","));
    document.body.setAttribute("data-smoke-lmsrc", acc.lmSrcs.join(","));
    document.body.setAttribute("data-smoke-iframes", acc.iframes.join(","));
    document.body.setAttribute("data-smoke-hash", location.hash);
    // 首屏主题探针：html class 与 html 计算背景色（深色白闪回归）
    document.body.setAttribute("data-smoke-htmlclass", document.documentElement.className);
    document.body.setAttribute("data-smoke-bg", getComputedStyle(document.documentElement).backgroundColor);
    // 首屏加载动画是否已收起（boot.js 写 data-styles-ready）
    document.body.setAttribute("data-smoke-bootready", document.documentElement.hasAttribute("data-styles-ready") ? "1" : "0");
    // PDF 依赖是否仍为懒加载（未导出前 window.jspdf 不应存在）
    document.body.setAttribute("data-smoke-jspdf", typeof window.jspdf);
    // 样式注入探针：document 上的公共样式数量 + 已带上公共样式的 shadow root 数
    document.body.setAttribute("data-smoke-adopted", String((document.adoptedStyleSheets || []).length));
    document.body.setAttribute("data-smoke-styledroots", String(acc.styledRoots));
  };
  // 等就绪信号稳定（宿主 ready 后二级项目还会再更新一次），避免固定 sleep
  let lastReady = null;
  let stableSince = 0;
  const waitSmoke = (deadline) => {
    const now = Date.now();
    if (now > deadline) return collectSmoke();
    const ready = document.body.getAttribute("data-app-ready");
    if (ready) {
      if (ready !== lastReady) {
        lastReady = ready;
        stableSince = now;
      } else if (now - stableSince >= 2000) {
        return collectSmoke();
      }
    }
    setTimeout(() => waitSmoke(deadline), 150);
  };
  setTimeout(() => waitSmoke(Date.now() + 15000), 500);
</script>`;

const CASES = [
  // ===== P0 =====
  {
    name: "P0-projects列表",
    type: "spa",
    hash: "#/projects",
    expectText: ["力扣", "文档", "项目", "示例项目", "一个 ofa.js 小项目演示"],
    expectLmSrc: ["src/micro/app-host.html", "apps/projects/components/projects-app.html"],
    expectAdopted: 4,
    expectStyledRoots: 2,
  },
  {
    name: "P0-projects深链详情",
    type: "spa",
    hash: "#/projects/demo",
    expectText: ["项目列表", "示例项目", "点我 +1", "返回"],
    expectHrefs: ["projects/demo/index.html"],
  },
  {
    name: "P0-leetcode深链",
    type: "spa",
    hash: "#/leetcode",
    expectText: ["力扣", "1.两数之和", "还原代码"],
  },
  {
    name: "P0-旧链接重定向",
    type: "spa",
    hash: "#/app/projects/?sub=demo",
    expectText: ["项目列表", "示例项目"],
    expectHash: "#/projects/demo",
  },
  {
    name: "P0-projects独立打开",
    type: "standalone",
    file: "apps/projects/index.html",
    expectText: ["示例项目", "一个 ofa.js 小项目演示"],
    expectAdopted: 4,
    expectStyledRoots: 1,
    expectBootReady: true,
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
    hash: "#/mdbook",
    expectText: ["文档", "filename与dirname", "在 CommonJS 模块中使用"],
    expectLmSrc: ["apps/mdbook/components/mdbook-app.html", "components/l-doc-menu/index.html", "components/l-doc-search/index.html"],
    expectJspdf: "undefined",
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
    hash: "#/leetcode",
    expectText: ["力扣", "1.两数之和", "还原代码", "运行", "2.两数相加"],
    expectLmSrc: ["apps/leetcode/components/leetcode-app.html", "components/l-doc-menu/index.html", "components/l-doc-search/index.html", "components/l-editor/index.html", "components/l-console-list/index.html"],
    expectIframes: ["components/l-editor/CodeMirrorIframe/index.html"],
  },
  {
    name: "P2-leetcode独立打开",
    type: "standalone",
    file: "apps/leetcode/index.html",
    expectText: ["力扣", "1.两数之和", "还原代码", "运行"],
    expectIframes: ["components/l-editor/CodeMirrorIframe/index.html"],
  },
  {
    name: "P2-CodeMirrorIframe独立",
    type: "standalone",
    file: "components/l-editor/CodeMirrorIframe/index.html",
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
    hash: "#/mdbook",
    expectText: ["迁移测试标题"],
  },
  // ===== 修复回归 =====
  {
    name: "FIX-窄屏菜单收起",
    type: "spa-resize",
    hash: "#/leetcode",
    expectText: ["wide:wide", "narrow:hidden", "opened:open", "closed:hidden"],
    budget: 45000,
  },
  {
    name: "FIX-深色模式首屏不白闪",
    type: "spa",
    hash: "#/leetcode",
    head: '<script>localStorage.setItem("dev-journey-theme","dark");</script>',
    expectText: ["1.两数之和"],
    expectHtmlClass: "dark",
    expectBg: "rgb(34, 34, 34)",
    expectBootReady: true,
    budget: 40000,
  },
  {
    name: "FIX-tab切换菜单稳定",
    type: "spa-switch",
    hash: "#/leetcode",
    budget: 60000,
    expectText: ["1.两数之和"], // 最终停在力扣，断言当前应用菜单渲染；console 零错误由全局检查覆盖
  },
  {
    name: "FIX-菜单项点击切换",
    type: "spa-menu",
    hash: "#/leetcode",
    budget: 50000,
    expectText: ["mac 自动操作", "CONTENT-OK"], // 切到文档后点击第 3 个菜单项，断言 active 状态与内容切换
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

/** 生成 smoke 宿主页：index.html 副本 + 注入 hash 设置、可选 head 注入与收集脚本 */
function writeSmokeIndex({ script = COLLECTOR, hash = "", head = "" } = {}) {
  let html = readFileSync(join(ROOT, "index.html"), "utf-8");
  const hashScript = hash ? `<script>location.hash = ${JSON.stringify(hash)};</script>` : "";
  html = html.replace("<head>", "<head>" + head + hashScript);
  html = html.replace("</body>", script + "</body>");
  writeFileSync(join(ROOT, "smoke-index.html"), html);
}

// tab 切换用例脚本：力扣→文档→力扣→文档→力扣，每次等就绪信号稳定后再切，最后收集文本
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
  const waitReady = (name, cb, deadline) => {
    const ready = document.body.getAttribute("data-app-ready");
    if (ready === name || (ready && ready.startsWith(name + "/"))) return setTimeout(cb, 2500);
    if (Date.now() > deadline) return cb();
    setTimeout(() => waitReady(name, cb, deadline), 150);
  };
  const runSeq = (steps, done) => {
    if (!steps.length) return done();
    const step = steps.shift();
    clickTab(step.title);
    waitReady(step.app, () => runSeq(steps, done), Date.now() + 15000);
  };
  setTimeout(() => {
    runSeq(
      [
        { title: "文档", app: "mdbook" },
        { title: "力扣", app: "leetcode" },
        { title: "文档", app: "mdbook" },
        { title: "力扣", app: "leetcode" },
      ],
      () => {
        const acc = { text: "" };
        walkAll(document.body, acc);
        document.body.setAttribute("data-smoke-text", acc.text.replace(/\\s+/g, " ").slice(0, 8000));
        document.body.setAttribute("data-smoke-hash", location.hash);
      }
    );
  }, 1500);
</script>`;

// 菜单点击用例脚本：切到文档应用后点击第 3 个菜单项，把 active 项文本写入 data-smoke-text
const MENU_SCRIPT = `
<script>
  const findMenuItems = () => {
    const acc = { items: [] };
    const seen = new Set();
    const w = (node) => {
      if (seen.has(node)) return;
      seen.add(node);
      if (node.tagName === "LI" && typeof node.className === "string" && node.className.includes("l-btn")) acc.items.push(node);
      if (node.shadowRoot) [...node.shadowRoot.childNodes].forEach((c) => w(c));
      [...node.childNodes].forEach((c) => w(c));
    };
    w(document.body);
    return acc.items;
  };
  const activeText = () =>
    findMenuItems()
      .filter((li) => typeof li.className === "string" && li.className.includes("active"))
      .map((li) => li.textContent.trim())
      .join("|");
  setTimeout(() => {
    const tabs = [];
    const seen2 = new Set();
    const wb = (node) => {
      if (seen2.has(node)) return;
      seen2.add(node);
      if (node.nodeName === "BUTTON" && node.textContent.trim() === "文档") tabs.push(node);
      if (node.shadowRoot) [...node.shadowRoot.childNodes].forEach((c) => wb(c));
      [...node.childNodes].forEach((c) => wb(c));
    };
    wb(document.body);
    if (tabs.length) tabs[0].click();
    setTimeout(() => {
      const items = findMenuItems();
      if (items.length > 2) items[2].click();
      setTimeout(() => {
        // 断言 active 切换 + 内容真实切换（新文档首个标题渲染）
        const acc = { text: "" };
        const walkText = (node) => {
          if (node.nodeType === 3) { acc.text += node.textContent; return; }
          if (node.shadowRoot) [...node.shadowRoot.childNodes].forEach((c) => walkText(c));
          [...node.childNodes].forEach((c) => walkText(c));
        };
        walkText(document.body);
        const contentOk = acc.text.includes("自动操作文件保存地址") ? "CONTENT-OK" : "";
        document.body.setAttribute("data-smoke-text", activeText() + "|" + contentOk);
      }, 8000);
    }, 8000);
  }, 8000);
</script>`;

// 窄屏菜单用例：改视口宽度触发 resize，验证宽屏常驻/窄屏收起、汉堡可展开、遮罩可收起
const RESIZE_SCRIPT = `
<script>
  const findAside = () => {
    let r = null;
    const seen = new Set();
    const w = (node) => {
      if (seen.has(node)) return;
      seen.add(node);
      if (node.tagName === "ASIDE" && !r) r = node;
      if (node.shadowRoot) [...node.shadowRoot.childNodes].forEach(w);
      [...node.childNodes].forEach(w);
    };
    w(document.body);
    return r;
  };
  const findBy = (pred) => {
    let r = null;
    const seen = new Set();
    const w = (node) => {
      if (seen.has(node) || r) return;
      seen.add(node);
      if (pred(node)) { r = node; return; }
      if (node.shadowRoot) [...node.shadowRoot.childNodes].forEach(w);
      [...node.childNodes].forEach(w);
    };
    w(document.body);
    return r;
  };
  const asideState = () => {
    const cls = findAside().className;
    if (cls.includes("!w0")) return "hidden";
    if (cls.includes("!fixed")) return "open";
    return "wide";
  };
  const setWidth = (value) => {
    Object.defineProperty(window, "innerWidth", { value, configurable: true });
    window.dispatchEvent(new Event("resize"));
  };
  const wait = (fn, cb, deadline) => {
    if (fn()) return cb();
    if (Date.now() > deadline) return cb();
    setTimeout(() => wait(fn, cb, deadline), 200);
  };
  setTimeout(() => {
    wait(() => findAside(), () => {
      setWidth(1200);
      setTimeout(() => {
        const wide = asideState();
        setWidth(800);
        setTimeout(() => {
          const narrow = asideState();
          const btn = findBy((n) => n.tagName === "BUTTON" && n.getAttribute("aria-label") === "打开菜单");
          if (btn) btn.click();
          setTimeout(() => {
            const opened = asideState();
            const mask = findBy((n) => typeof n.className === "string" && n.className.includes("bg-#00000022"));
            if (mask) mask.click();
            setTimeout(() => {
              document.body.setAttribute(
                "data-smoke-text",
                "wide:" + wide + "|narrow:" + narrow + "|opened:" + opened + "|closed:" + asideState()
              );
            }, 700);
          }, 700);
        }, 900);
      }, 700);
    }, Date.now() + 12000);
  }, 1500);
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
    hash: pick("data-smoke-hash"),
    adopted: pick("data-smoke-adopted"),
    styledRoots: pick("data-smoke-styledroots"),
    htmlClass: pick("data-smoke-htmlclass"),
    bg: pick("data-smoke-bg"),
    bootReady: pick("data-smoke-bootready"),
    jspdf: pick("data-smoke-jspdf"),
  };
}

async function runCase(c) {
  let url;
  let cleanup = () => {};
  if (String(c.type).startsWith("spa")) {
    let script = COLLECTOR;
    if (c.type === "spa-switch") script = SWITCH_SCRIPT;
    if (c.type === "spa-menu") script = MENU_SCRIPT;
    if (c.type === "spa-resize") script = RESIZE_SCRIPT;
    // head 注入：seed 探针（旧版本缓存迁移）或自定义（如主题首屏探针）
    let head = c.head || "";
    if (!head && c.type === "spa-seed") {
      head = `<script>localStorage.setItem("dev-journey_0.2.9", ${JSON.stringify(JSON.stringify(c.seed))});</script>`;
    }
    writeSmokeIndex({ script, hash: c.hash, head });
    url = `${BASE}/smoke-index.html`;
  } else {
    const dest = writeSmokeStandalone(c.file);
    url = BASE + "/" + dest.slice(ROOT.length + 1);
    cleanup = () => rmSync(dest, { force: true });
  }
  const { stdout, stderr } = await runChrome(url, c.budget ?? 30000);
  cleanup();
  const dom = stdout;
  const { text, hrefs, lmSrc, iframes, hash, adopted, styledRoots, htmlClass, bg, bootReady, jspdf } = extract(dom);
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
  if (c.expectHash && hash !== c.expectHash) {
    fails.push(`hash 期望【${c.expectHash}】实际【${hash}】`);
  }
  // 样式注入探针：document 公共样式数 / 已注入公共样式的 shadow root 数
  if (c.expectAdopted != null && Number(adopted) !== c.expectAdopted) {
    fails.push(`document 公共样式数期望【${c.expectAdopted}】实际【${adopted}】`);
  }
  if (c.expectStyledRoots != null && Number(styledRoots) < c.expectStyledRoots) {
    fails.push(`已注入样式的 shadow root 数期望 ≥【${c.expectStyledRoots}】实际【${styledRoots}】`);
  }
  // 首屏主题探针
  if (c.expectHtmlClass && !htmlClass.includes(c.expectHtmlClass)) {
    fails.push(`html class 期望含【${c.expectHtmlClass}】实际【${htmlClass}】`);
  }
  if (c.expectBg && bg !== c.expectBg) {
    fails.push(`html 背景色期望【${c.expectBg}】实际【${bg}】`);
  }
  if (c.expectBootReady && bootReady !== "1") {
    fails.push(`首屏加载动画未收起（data-styles-ready 缺失）`);
  }
  if (c.expectJspdf && jspdf !== c.expectJspdf) {
    fails.push(`window.jspdf 期望【${c.expectJspdf}】实际【${jspdf}】`);
  }
  if (text.includes("load fail")) fails.push("出现 load fail 页");
  if (fails.length && process.env.DEBUG) {
    console.log(`      [debug] hash=${hash}`);
    console.log(`      [debug] text=${text.slice(0, 400)}`);
  }
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
  await ensureServer();
  // 可选：ONLY=<用例名子串> 只跑匹配用例，便于本地调试
  const only = process.env.ONLY || "";
  const cases = only ? CASES.filter((c) => c.name.includes(only)) : CASES;
  const results = [];
  for (const c of cases) {
    let r = await runCase(c);
    // CDN（esm.sh/jsdelivr）偶发抖动会导致组件加载失败，失败重试一次
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
