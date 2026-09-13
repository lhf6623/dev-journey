import { defineConfig, presetMini, presetIcons } from "unocss";
import { rules, theme, shortcuts, collections } from "./src/styles/uno.shared.js";

// 工具类 + 图标合并为一份配置、一个产物（src/styles/uno.css）
// 早期拆成两份配置是为了让图标 CSS 独立缓存；现在加载器按版本号统一 ?v=，
// 独立缓存拿不到收益，合并后少一次请求、少一份配置。
export default defineConfig({
  presets: [
    presetMini(),
    presetIcons({
      collections,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  cli: {
    entry: [
      {
        patterns: [
          "src/**/*.{html,js,mjs}",
          "apps/**/*.{html,js,mjs,json}",
          "projects/**/*.{html,js}",
          "components/**/*.{html,js,mjs}",
          "index.html",
        ],
        outFile: "src/styles/uno.css",
      },
    ],
  },
  rules,
  theme,
  shortcuts,
});
