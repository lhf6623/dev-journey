import { readFile } from "fs/promises";
import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
  presetAttributify,
  presetUno,
} from "unocss";
import { getDir } from "./node_util/index";

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  cli: {
    entry: {
      patterns: [
        "src/component/*/*.html",
        "src/component/*.html",
        "src/page/*.html",
        "index.html",
      ],
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
  preflights: [
    {
      getCSS: async () => {
        const dir = getDir();
        console.log(`🚀 ~ dir:`, dir);
        const resetCSS = await readFile(
          `${dir}node_modules/@unocss/reset/tailwind-compat.css`,
          "utf-8"
        );
        // 用正则筛选 /** */注释 空格 换行
        const reg = /\/\*[\s\S]*?\*\/|\s|\n/g;
        const publicCSS = await readFile(`${dir}src/css/public.css`, "utf-8");
        const _resetCSS = resetCSS.replace(reg, "");
        const _publicCSS = publicCSS.replace(reg, "");

        return `${_resetCSS}\n${_publicCSS}`;
      },
    },
  ],
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
