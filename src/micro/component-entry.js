/**
 * 应用契约的通用实现：把「ofa 组件文件 + 标签」挂载到容器，并显式注入 ctx
 * 返回 unmount；应用入口（apps/<name>/index.js）通常只要调它
 *
 * ctx 传递：ofa 升级组件时会丢掉外部挂上的普通对象属性，
 * 所以用 data-ctx-id 属性 + context.js 的注册表传递
 */
import { registerCtx, releaseCtx } from "./context.js";
import { useStyles } from "../styles/index.js";

export async function mountComponent(
  container,
  { ctx, tag, src, wrapClass, styles }
) {
  const wrap = document.createElement("div");
  wrap.className = wrapClass ?? "h100vh wfull bg-theme-bg";

  const lm = document.createElement("l-m");
  lm.setAttribute("src", src);

  const el = document.createElement(tag);
  const ctxId = registerCtx(ctx);
  el.setAttribute("data-ctx-id", ctxId);

  wrap.append(lm, el);
  container.appendChild(wrap);

  // 等组件定义 + 一次宏任务，让 ready 信号真正代表「已渲染」
  // 注意：不用 requestAnimationFrame —— 无头虚拟时间下 rAF 不可靠
  await Promise.race([
    customElements.whenDefined(tag),
    new Promise((r) => setTimeout(r, 5000)),
  ]);
  await new Promise((r) => setTimeout(r, 100));

  // 模块专用样式：只注入该组件的 shadow（公共样式由 installCommonStyles 统一负责）
  if (styles?.length) await useStyles(el, styles);

  return () => {
    releaseCtx(ctxId);
    el.remove();
    lm.remove();
    wrap.remove();
  };
}
