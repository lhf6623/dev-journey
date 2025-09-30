import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
  presetAttributify,
  presetMini,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [
    presetMini(),
    presetAttributify(),
    presetIcons({
      // cdn: "https://esm.sh/",  unocss 提示会被阻塞，使用本地图标
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  cli: {
    entry: {
      patterns: ["src/**/*.html", "src/**/*.js", "index.html"],
      outFile: "src/css/uno.css",
    },
  },
  theme: {
    colors: {
      themeBg: "var(--theme-bg-color)",
      themeBaseText: "var(--text-base-color)",
      themeText: "var(--text-color)",
      themeBorder: "var(--border-color)",
      themeHover: "var(--bg-hover-color)",
    },
  },
  shortcuts: {
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
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
