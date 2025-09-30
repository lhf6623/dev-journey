import {
  defineConfig,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  cli: {
    entry: [
      {
        patterns: ["src/**/*.{html,js}", "index.html"],
        outFile: "src/css/uno-icon.css",
      },
    ],
  },
});
