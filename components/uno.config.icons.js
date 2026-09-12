// 组件库图标 UnoCSS 配置：只扫描 components/**，输出 components/ui-icon.css
import { defineConfig, presetIcons } from "unocss";
import { collections } from "./uno.shared.js";

export default defineConfig({
  presets: [
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
        patterns: ["components/**/*.{html,js,mjs}"],
        outFile: "components/ui-icon.css",
      },
    ],
  },
});
