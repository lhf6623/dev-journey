import { mountComponent } from "../../src/micro/component-entry.js";

const src = new URL("./components/mdbook-app.html", import.meta.url).href;
// 模块专用样式：只注入 mdbook-app 的 shadow（公共样式由 src/styles 统一加载）
const styles = [new URL("./highlightjs.css", import.meta.url).href];

/** @param {HTMLElement} container @param {object} ctx */
export async function mount(container, ctx) {
  return mountComponent(container, { ctx, tag: "mdbook-app", src, styles });
}
