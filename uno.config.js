import {
  defineConfig,
  presetMini,
} from "unocss";

export default defineConfig({
  presets: [
    presetMini(),
  ],
  cli: {
    entry: [
      {
        patterns: [
          "src/**/*.{html,js,mjs}",
          "projects/**/*.html",
          "apps/**/*.{html,js,mjs,json}",
          "app/**/*.html",
          "index.html",
        ],
        outFile: "src/css/uno.css",
      },
    ],
  },
  rules: [
    // 文本两行截断，presetMini 没有 line-clamp
    [
      "line-clamp-2",
      {
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "2",
        overflow: "hidden",
      },
    ],
  ],
  theme: {
    colors: {
      themeBg: "var(--theme-bg-color)",
      themeBaseText: "var(--text-base-color)",
      themeText: "var(--text-color)",
      themeBorder: "var(--border-color)",
      themeHover: "var(--bg-hover-color)",
      popoverBg: "var(--popover-bg-color)",
      popoverBorder: "var(--popover-b-color)",
    },
  },
  shortcuts: {
    // 弹出框面板样式
    "popover-box": "text-nowrap z200 absolute top-100% left-50% transform-translate-x-[-50%] shadow b b-popover-border rounded bg-popover-bg",
    // 文本溢出显示省略号
    truncate: "overflow-hidden text-ellipsis whitespace-nowrap",
    "flex-center": "flex justify-center items-center",
    "flex-between": "flex justify-between items-center",
    // 按钮样式 hover active 两种状态
    "l-btn":
      "hover:bg-theme-hover !active:op-70 transition-all b-none bg-transparent cursor-pointer text-theme-base-text",
    "l-btn-disabled":
      "disabled:op-70 disabled:cursor-not-allowed disabled:bg-theme-hover",
  },
});
