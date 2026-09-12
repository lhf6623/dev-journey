import { mountComponent } from "../../src/micro/component-entry.js";

const src = new URL("./components/projects-app.html", import.meta.url).href;

/** @param {HTMLElement} container @param {object} ctx */
export async function mount(container, ctx) {
  return mountComponent(container, { ctx, tag: "projects-app", src });
}
