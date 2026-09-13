/**
 * UnoCSS 共享配置：组件库与站点共用同一套主题/规则/快捷类/图标集合
 * 放在组件库内，保证抽仓后库可独立构建（站点反向依赖库，库不依赖站点）
 */

/** 规则：presetMini 没有 line-clamp */
export const rules = [
  // 文本两行截断
  [
    "line-clamp-2",
    {
      display: "-webkit-box",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": "2",
      overflow: "hidden",
    },
  ],
];

/** 主题变量映射（值来自 src/styles/tokens.css） */
export const theme = {
  colors: {
    themeBg: "var(--theme-bg-color)",
    themeBaseText: "var(--text-base-color)",
    themeText: "var(--text-color)",
    themeBorder: "var(--border-color)",
    themeHover: "var(--bg-hover-color)",
    popoverBg: "var(--popover-bg-color)",
    popoverBorder: "var(--popover-b-color)",
  },
};

/** 快捷类 */
export const shortcuts = {
  // 弹出框面板样式
  "popover-box":
    "text-nowrap z200 absolute top-100% left-50% transform-translate-x-[-50%] shadow b b-popover-border rounded bg-popover-bg",
  // 文本溢出显示省略号
  truncate: "overflow-hidden text-ellipsis whitespace-nowrap",
  "flex-center": "flex justify-center items-center",
  "flex-between": "flex justify-between items-center",
  // 按钮样式 hover active 两种状态
  "l-btn":
    "hover:bg-theme-hover !active:op-70 transition-all b-none bg-transparent cursor-pointer text-theme-base-text",
  "l-btn-disabled":
    "disabled:op-70 disabled:cursor-not-allowed disabled:bg-theme-hover",
};

// v66 起 presetIcons 不再自动加载已安装的 @iconify-json 集合，需显式声明
const iconCollectionNames = [
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
];

/** presetIcons 的 collections 映射 */
export const collections = iconCollectionNames.reduce((pre, name) => {
  pre[name] = () =>
    import(`@iconify-json/${name}/icons.json`, { with: { type: "json" } }).then(
      (i) => i.default
    );
  return pre;
}, {});
