import {
  defineConfig,
  presetIcons,
} from "unocss";

// v66 起 presetIcons 不再自动加载已安装的 @iconify-json 集合，需显式声明
const collections = [
  "akar-icons",
  "eos-icons",
  "fluent-mdl2",
  "line-md",
  "lsicon",
  "mage",
  "mdi",
  "mingcute",
  "pepicons-pop",
  "ph",
  "solar",
  "tabler",
  "typcn",
].reduce((pre, name) => {
  pre[name] = () =>
    import(`@iconify-json/${name}/icons.json`, { with: { type: "json" } }).then(
      (i) => i.default
    );
  return pre;
}, {});

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
        patterns: [
          "src/**/*.{html,js,mjs}",
          "projects/**/*.html",
          "apps/**/*.{html,js,mjs,json}",
          "app/**/*.html",
          "index.html",
        ],
        outFile: "src/css/uno-icon.css",
      },
    ],
  },
});
