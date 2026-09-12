// 组件库 UnoCSS 配置：只扫描 components/**，输出 components/ui.css
import { defineConfig, presetMini } from "unocss";
import { rules, theme, shortcuts } from "./uno.shared.js";

export default defineConfig({
  presets: [presetMini()],
  cli: {
    entry: [
      {
        patterns: ["components/**/*.{html,js,mjs}"],
        outFile: "components/ui.css",
      },
    ],
  },
  rules,
  theme,
  shortcuts,
});
