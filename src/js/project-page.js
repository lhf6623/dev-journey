// 项目页共享脚本（双形态）：
// 独立打开：跟随系统深浅色主题，返回走 history.back()
// 被 SPA 项目加载器（l-project）内嵌：由外壳统一管理主题，本脚本只提供内嵌感知的返回入口
(() => {
  // 加载器注入内容前设置：{ name, embedded: true }
  const ctx = window.__devJourneyProject;
  window.projectPage = {
    embedded: !!ctx,
    name: ctx?.name ?? null,
    /** 返回：内嵌时调用加载器注册的回调（返回项目列表），独立打开时走浏览器后退 */
    back() {
      if (window.projectPage.embedded) {
        // 标志对象由当前项目的加载器维护（页面栈中历史实例不会重复响应）
        window.__devJourneyProject?.back?.();
      } else {
        history.back();
      }
    },
  };

  if (window.projectPage.embedded) return;

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
