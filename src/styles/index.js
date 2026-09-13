/**
 * 统一公共 CSS 加载模块
 *
 * 机制：把样式表构造成 CSSStyleSheet，用 adoptedStyleSheets 注入 document
 * 和**所有 shadow root**（同一个 sheet 对象共享，只 fetch/parse 一次）。
 * - 公共样式：installCommonStyles() 一次装好，钩住 attachShadow，后建的 shadow 自动带上
 * - 模块专用样式：useStyles(target, urls)，只进该模块的 shadow（放在公共样式之后，可覆盖）
 *
 * 仅支持 constructable stylesheet（Chrome 73+/Safari 16.4+/Firefox 101+），不做降级。
 */
import { version, getUrl } from "../js/util.js";
import { COMMON_STYLES } from "./manifest.js";

const sheetCache = new Map(); // fullUrl -> Promise<CSSStyleSheet>
const pendingRoots = new Set(); // 公共样式就绪前已创建的 shadow root
let commonSheets = null;
let installPromise = null;
let hooked = false;

function toUrl(path) {
  const base = /^https?:/.test(path) ? path : getUrl(path);
  return `${base}${base.includes("?") ? "&" : "?"}v=${version}`;
}

/** 取（并缓存）一个样式表的 CSSStyleSheet；失败重试且不缓存失败结果 */
function loadSheet(path) {
  const url = toUrl(path);
  if (!sheetCache.has(url)) {
    const entry = (async () => {
      let lastErr;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`样式加载失败 ${res.status}: ${url}`);
          const css = await res.text();
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(css);
          return sheet;
        } catch (e) {
          lastErr = e;
          if (attempt < 2) {
            await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
          }
        }
      }
      sheetCache.delete(url); // 失败不缓存，下次调用可重试
      throw lastErr;
    })();
    sheetCache.set(url, entry);
  }
  return sheetCache.get(url);
}

/** 追加到目标（已存在的不重复；后追加的优先级更高） */
function adopt(root, sheets) {
  const existing = root.adoptedStyleSheets ?? [];
  const merged = [...existing];
  for (const sheet of sheets) {
    if (!merged.includes(sheet)) merged.push(sheet);
  }
  root.adoptedStyleSheets = merged;
}

/** 解析注入目标：Document / ShadowRoot / ofa 组件实例或元素 */
function resolveRoot(target) {
  if (!target) return null;
  if (target === document || target === document.documentElement) return document;
  if ("adoptedStyleSheets" in target) return target;
  const el = target.ele ?? target;
  return el?.shadowRoot ?? null;
}

function hookAttachShadow() {
  const native = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function (init) {
    const root = native.call(this, init);
    if (commonSheets) adopt(root, commonSheets);
    else pendingRoots.add(root);
    return root;
  };
}

/** 深度扫描已存在的 shadow root（钩子安装前创建的那些） */
function scanShadowRoots() {
  const roots = [];
  const walk = (node) => {
    if (!node) return;
    if (node.shadowRoot) {
      roots.push(node.shadowRoot);
      walk(node.shadowRoot);
    }
    node.childNodes?.forEach(walk);
  };
  walk(document.body);
  return roots;
}

/**
 * 首屏防闪的内联样式与超时兜底由各页面 <head> 内联脚本负责
 * （必须在样式加载器之前同步生效），此处只负责加载并放行
 */

async function loadCommon() {
  try {
    const sheets = await Promise.all(COMMON_STYLES.map(loadSheet));
    commonSheets = sheets;
    adopt(document, sheets);
    pendingRoots.forEach((root) => adopt(root, sheets));
    pendingRoots.clear();
    scanShadowRoots().forEach((root) => adopt(root, sheets));
  } catch (e) {
    console.error("[styles] 公共样式加载失败：", e);
  } finally {
    // 只写 loaded：动画开关 data-styles-ready 由 src/styles/boot.js 负责
    document.documentElement.setAttribute("data-styles-loaded", "");
  }
  return commonSheets;
}

/** 安装公共样式（同步装钩子，返回就绪 Promise） */
export function installCommonStyles() {
  if (!hooked) {
    hooked = true;
    hookAttachShadow();
  }
  if (!installPromise) installPromise = loadCommon();
  return installPromise;
}

/** 等目标出现可注入的 root（组件 shadow 可能晚于 mount 一点点创建） */
async function waitRoot(target, timeout = 3000) {
  const deadline = Date.now() + timeout;
  for (;;) {
    const root = resolveRoot(target);
    if (root) return root;
    if (Date.now() > deadline) return null;
    await new Promise((r) => setTimeout(r, 50));
  }
}

/**
 * 给某个 document/shadow/ofa 元素追加模块专用样式
 * @param {Document|ShadowRoot|object} target
 * @param {string[]} urls 模块内样式地址（如 new URL("./x.css", import.meta.url).href）
 */
export async function useStyles(target, urls) {
  if (!urls?.length) return;
  await installCommonStyles();
  const sheets = await Promise.all(urls.map(loadSheet));
  // 注入不到就显式报错，不要静默跳过（否则表现为「模块样式有时没生效」）
  const root = await waitRoot(target);
  if (!root) throw new Error("目标没有 shadow root，无法注入模块样式");
  adopt(root, sheets);
}
