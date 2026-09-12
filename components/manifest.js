/**
 * 组件清单：组件库对外入口来源（tag 全局唯一）
 * 未来抽仓时可直接转成 package.json 的 exports / 发布清单
 */
export default [
  { tag: "l-button", src: "./l-button/index.html" },
  { tag: "l-select", src: "./l-select/index.html" },
  { tag: "l-doc-menu", src: "./l-doc-menu/index.html" },
  { tag: "l-doc-search", src: "./l-doc-search/index.html" },
  { tag: "l-console-list", src: "./l-console-list/index.html" },
  { tag: "l-editor", src: "./l-editor/index.html" },
  // 非自定义元素：JS 类，需显式 import
  { tag: null, name: "l-toast", src: "./l-toast/index.mjs" },
];
