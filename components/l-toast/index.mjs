/**
 * l-toast 轻量提示组件（由 apps/leetcode 的 Toast.js 通用化而来）
 * 容器由宿主显式注入（如组件 shadow root），不再挂到 document.body，
 * 从而在 shadow DOM / 独立打开两种形态下样式与作用域都正确
 *
 * 用法：
 *   const toast = new Toast(shadowRootElement, 3);
 *   toast.show("已保存");
 *   toast.destroy();
 */
export default class Toast {
  /**
   * @param {Element} container 挂载容器（必填）
   * @param {number} maxCount 同时显示的最大数量
   */
  constructor(container, maxCount = 5) {
    if (!container) throw new Error("[l-toast] 需要传入挂载容器");

    this.container = container;
    this.maxCount = maxCount;
    this.el = document.createElement("div");
    this.el.className =
      "pointer-events-none fixed top-20px left-50% translate-x-[-50%] z-999 flex flex-col items-center gap-10px w300px";
    this.container.appendChild(this.el);
  }

  show(message, duration = 3000) {
    const count = this.el.children.length;
    if (count >= this.maxCount) {
      this.hideToast(this.el.lastElementChild, true);
    }
    this.createToast(message, duration);
  }

  createToast(message, duration) {
    const toast = document.createElement("div");
    toast.className =
      "bg-theme-bg text-sm text-nowrap text-theme-text b b-theme-hover px10px py3px rounded-6px text-center transform-translate-y-[-100%] op0 transition-all wfit shadow-md";
    toast.innerHTML = message;
    this.el.insertBefore(toast, this.el.firstChild);

    setTimeout(() => {
      toast.classList.remove("transform-translate-y-[-100%]");
      toast.classList.remove("op0");
    }, 10);

    setTimeout(() => {
      this.hideToast(toast);
    }, duration);
  }

  hideToast(toast, isImmediate = false) {
    if (isImmediate) {
      toast.remove();
    } else {
      toast.classList.add("transform-translate-y-[-100%]");
      toast.classList.add("op0");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }
  }

  destroy() {
    this.el?.remove();
    this.el = null;
    this.container = null;
  }
}
