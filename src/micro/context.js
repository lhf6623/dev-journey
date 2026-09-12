/**
 * 应用上下文：显式传给每一个应用/项目，取代 window.__devJourneyApp / window.appCtx
 * 内嵌（壳内）：back/navigate 走壳路由
 * 独立（单页打开）：back 走 history，跟随系统主题
 */
import { toHash } from "./router.js";

const isDark = () => document.documentElement.classList.contains("dark");

/**
 * ctx 注册表：ofa 升级组件时会丢弃外部挂在元素上的普通对象属性，
 * 因此用「元素属性 data-ctx-id + 模块级 Map」传递，属性不会丢
 */
const ctxStore = new Map();
let ctxSeq = 0;

/** 登记 ctx，返回 id（写进元素的 data-ctx-id 属性） */
export function registerCtx(ctx) {
  const id = `ctx-${++ctxSeq}-${Date.now().toString(36)}`;
  ctxStore.set(id, ctx);
  return id;
}

/** 组件内按 id 取 ctx */
export function getCtxById(id) {
  return id ? ctxStore.get(id) ?? null : null;
}

/** 卸载时释放 */
export function releaseCtx(id) {
  if (id) ctxStore.delete(id);
}

/**
 * @param {object} opt
 * @param {string} opt.name   应用名（projects 等）
 * @param {string} [opt.sub]  二级名（项目目录名）
 * @param {object} [opt.query]
 * @param {boolean} opt.embedded 是否被壳内嵌
 */
export function createCtx({ name, sub = "", query = {}, embedded }) {
  const ctx = {
    name,
    sub,
    query,
    embedded,
    theme: isDark() ? "dark" : "light",
    /** 监听宿主题变化，返回取消函数 */
    onTheme(cb) {
      const observer = new MutationObserver(() => {
        ctx.theme = isDark() ? "dark" : "light";
        cb(ctx.theme);
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    },
    /** 跳转：传路由对象或 "#/..." 字符串 */
    navigate(route) {
      location.hash =
        typeof route === "string" ? route : toHash(route);
    },
    /** 返回：内嵌回退到上级路由，独立走浏览器后退 */
    back(fallback) {
      if (embedded) {
        location.hash = fallback ?? toHash({ name, sub: "" });
      } else if (history.length > 1) {
        history.back();
      }
    },
  };
  return ctx;
}
