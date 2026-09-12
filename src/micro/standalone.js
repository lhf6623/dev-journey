/**
 * 独立打开形态：单页直接打开 apps/<name>/index.html 或 projects/<name>/index.html 时使用
 * - 跟随系统深浅色（壳内嵌时由外壳统一管理，不走这里）
 * - 提供独立 ctx（back → 浏览器后退）
 */
import { getApp } from "./registry.js";
import { createCtx } from "./context.js";

/** 跟随系统深浅色，返回取消函数 */
function followSystemTheme() {
  const apply = () => {
    document.documentElement.classList.toggle(
      "dark",
      matchMedia("(prefers-color-scheme: dark)").matches
    );
  };
  apply();
  const mq = matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", apply);
  return () => mq.removeEventListener("change", apply);
}

/**
 * 挂载顶层应用（独立页）
 * @param {string} name 应用名（apps.json）
 * @param {HTMLElement} container
 */
export async function mountStandalone(name, container) {
  followSystemTheme();
  const app = getApp(name);
  if (!app) throw new Error(`未知应用：${name}`);
  const mod = await app.load();
  const ctx = createCtx({ name, sub: "", embedded: false });
  const unmount = await mod.mount(container, ctx);
  document.body.setAttribute("data-app-ready", name);
  return unmount;
}

/**
 * 挂载二级项目（独立页）
 * @param {string} name 项目目录名
 * @param {HTMLElement} container
 */
export async function mountProject(name, container) {
  followSystemTheme();
  const mod = await import(`../../projects/${name}/index.js`);
  const ctx = createCtx({ name: "projects", sub: name, embedded: false });
  const unmount = await mod.mount(container, ctx);
  document.body.setAttribute("data-app-ready", `projects/${name}`);
  return unmount;
}
