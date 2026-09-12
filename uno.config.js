import { defineConfig, presetMini } from "unocss";
import { rules, theme, shortcuts } from "./components/uno.shared.js";

export default defineConfig({
  presets: [presetMini()],
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
  rules,
  theme,
  shortcuts,
});
