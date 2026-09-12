import { mountComponent } from "../../src/micro/component-entry.js";

const src = new URL("./demo-app.html", import.meta.url).href;

/** 二级项目契约：与顶层应用一致（mount + ctx） */
export async function mount(container, ctx) {
  return mountComponent(container, {
    ctx,
    tag: "demo-app",
    src,
    wrapClass: "flex-center hfull wfull",
  });
}
