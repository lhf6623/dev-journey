export default class Toast {
  constructor(maxCount = 5) {
    if (document.getElementById('toast__save__code')) return
    this.container = document.createElement("div");
    this.id = crypto.randomUUID();
    this.container.id = 'toast__save__code';
    this.container.className =
      "pointer-events-none fixed top-20px left-50% translate-x-[-50%] z-999 flex flex-col items-center gap-10px w300px";
    document.body.appendChild(this.container);

    this.maxCount = maxCount; // 最大同时显示数量
  }
  show(message, duration = 3000) {
    const count = this.container.children.length;
    if (count >= this.maxCount) {
      this.hideToast(this.container.lastElementChild, true);
    }
    this.createToast(message, duration);
  }
  createToast(message, duration) {
    const toast = document.createElement("div");
    toast.className =
      "bg-theme-bg text-sm text-nowrap text-theme-text b b-theme-hover px-10px py-3px rounded-6px text-center transform-translate-y-[-100%] op-0 transition-all w-fit shadow-md";
    toast.innerHTML = message;
    this.container.insertBefore(toast, this.container.firstChild);

    setTimeout(() => {
      toast.classList.remove("transform-translate-y-[-100%]");
      toast.classList.remove("op-0");
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
      toast.classList.add("op-0");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }
  }
}