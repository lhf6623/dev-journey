// 微前端应用共享双模式脚本：
// 独立打开：跟随系统深浅色主题；被壳加载器（l-micro）内嵌：主题由外壳统一管理，本脚本只提供上下文入口
(() => {
  // 加载器注入内容前设置：{ name, embedded: true, query, back }；
  // 捕获引用进闭包——嵌套加载器覆盖全局标志时，外层应用的 back 回调仍有效
  const ctx = window.__devJourneyApp;
  window.appCtx = {
    embedded: !!ctx,
    name: ctx?.name ?? null,
    query: ctx?.query ?? Object.fromEntries(new URLSearchParams(location.search).entries()),
    /** 返回：内嵌时调用加载器注册的回调，独立打开时走浏览器后退 */
    back() {
      if (ctx?.back) ctx.back();
      else history.back();
    },
  };

  if (window.appCtx.embedded) return;

  // 独立打开：跟随系统深浅色
  const setDark = () => {
    document.documentElement.classList.toggle(
      "dark",
      matchMedia("(prefers-color-scheme: dark)").matches
    );
  };
  setDark();
  matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change",
    setDark
  );
})();
