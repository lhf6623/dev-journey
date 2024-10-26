import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
  presetAttributify,
  presetUno,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      cdn: "https://esm.sh/",
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  cli: {
    entry: {
      patterns: ["src/**/*.html", "index.html"],
      outFile: "src/css/uno.css",
    },
  },
  theme: {
    colors: {
      themeBgColor: "var(--theme-bg-color)",
      themeBaseText: "var(--text-base-color)",
      themeText: "var(--text-color)",
      menuBorder: "var(--border-color)",
      menuHoverColor: "var(--bg-hover-color)",
    },
  },
  shortcuts: {
    // 文本溢出显示省略号
    truncate: "overflow-hidden text-ellipsis whitespace-nowrap",
    "flex-center": "flex justify-center items-center",
    "flex-between": "flex justify-between items-center",
    // 按钮样式 hover active 两种状态
    "l-btn":
      "hover:bg-menu-hover-color !active:op-70 transition-all b-none bg-transparent cursor-pointer text-theme-base-text",
    "l-btn-disabled":
      "disabled:op-70 disabled:cursor-not-allowed disabled:bg-menu-hover-color",
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
