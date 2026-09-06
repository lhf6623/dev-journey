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
    const acc = { text: "", hrefs: [], lmSrcs: [] };
    const walk = (node) => {
      if (node.nodeType === 3) { acc.text += node.textContent; return; }
      if (node.nodeName === "A" && node.href) acc.hrefs.push(node.href);
      if (node.tagName === "L-M" && node.getAttribute("src")) acc.lmSrcs.push(node.getAttribute("src"));
      if (node.shadowRoot) [...node.shadowRoot.childNodes].forEach((c) => walk(c));
      [...node.childNodes].forEach((c) => walk(c));
    };
    walk(document.body);
    document.body.setAttribute("data-smoke-text", acc.text.replace(/\\s+/g, " ").slice(0, 8000));
    document.body.setAttribute("data-smoke-hrefs", acc.hrefs.join(","));
    document.body.setAttribute("data-smoke-lmsrc", acc.lmSrcs.join(","));
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
    name: "P0-leetcode未建应用错误卡片",
    type: "spa",
    home: "app/leetcode/",
    expectText: ["加载失败", "HTTP 404"],
    allowError: true, // 未建应用 fetch 404 属预期，验证 l-micro 优雅错误卡片
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

/** 生成 smoke 宿主页（index.html 副本 + o-app 指向 smoke config + 收集器） */
function writeSmokeIndex() {
  let html = readFileSync(join(ROOT, "index.html"), "utf-8");
  html = html.replace('src="./src/js/app-config.mjs"', 'src="./smoke-app-config.mjs"');
  html = html.replace("</body>", COLLECTOR + "</body>");
  writeFileSync(join(ROOT, "smoke-index.html"), html);
  writeFileSync(join(ROOT, "smoke-app-config.mjs"), "export const home = \"__HOME__\";\n");
}

/** 独立页用例：复制为同目录 smoke 副本并注入收集器 */
function writeSmokeStandalone(file) {
  const src = join(ROOT, file);
  const dest = join(ROOT, dirname(file), "smoke-" + file.split("/").pop());
  let html = readFileSync(src, "utf-8");
  html = html.replace("</body>", COLLECTOR + "</body>");
  writeFileSync(dest, html);
  return dest;
}

async function runChrome(url) {
  return new Promise((resolve) => {
    const p = spawn(CHROME, [
      "--headless=new", "--disable-gpu", "--no-first-run",
      "--virtual-time-budget=30000", "--enable-logging=stderr",
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
  };
}

async function runCase(c) {
  let url;
  let cleanup = () => {};
  if (c.type === "spa") {
    // 每次重写整个配置（占位符替换一次后就消失，不能复用 replace）
    writeFileSync(
      join(ROOT, "smoke-app-config.mjs"),
      `export const home = ${JSON.stringify(c.home)};\n`
    );
    url = `${BASE}/smoke-index.html`;
  } else {
    const dest = writeSmokeStandalone(c.file);
    url = BASE + "/" + dest.slice(ROOT.length + 1);
    cleanup = () => rmSync(dest, { force: true });
  }
  const { stdout, stderr } = await runChrome(url);
  cleanup();
  const dom = stdout;
  const { text, hrefs, lmSrc } = extract(dom);
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
    const r = await runCase(c);
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
