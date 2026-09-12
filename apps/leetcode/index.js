import { mountComponent } from "../../src/micro/component-entry.js";

const src = new URL("./components/leetcode-app.html", import.meta.url).href;

/** @param {HTMLElement} container @param {object} ctx */
export async function mount(container, ctx) {
  return mountComponent(container, { ctx, tag: "leetcode-app", src });
}
