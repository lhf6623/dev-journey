/**
 * 首屏引导脚本（经典脚本，必须同步阻塞加载于 <head>）
 *
 * 为什么独立成文件而不并进 system.js：
 *   内联/经典脚本在解析期同步执行，赶得上首帧；ESM 一律 deferred，做不到。
 * 职责（一处维护，各页面只引一行）：
 *   1) 绘制前套用主题（读与版本无关的镜像键 dev-journey-theme）
 *   2) 绘制前注入兜底底色 + 加载动画（CSS 伪元素，避免在 head 阶段建 DOM）
 *   3) 公共样式加载器就绪（data-styles-loaded）后收起动画，带最短展示时间防一闪
 *
 * 与 src/styles/index.js 的契约：
 *   加载器只写 data-styles-loaded；本脚本负责写 data-styles-ready（动画开关）
 */
(function () {
  var root = document.documentElement;
  var THEME_KEY = "dev-journey-theme";
  var MIN_SHOW = 300;
  var TIMEOUT = 5000;
  var startedAt = Date.now();
  var finished = false;

  // 1) 主题：同步套用，避免深色模式刷新白闪
  var pref = "system";
  try {
    pref = localStorage.getItem(THEME_KEY) || "system";
  } catch (e) {}
  var dark =
    pref === "dark" ||
    (pref === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", dark);

  // 2) 兜底底色 + 加载动画：全部走 html 的伪元素，head 阶段无需 body
  var style = document.createElement("style");
  style.id = "dj-boot-style";
  style.textContent = [
    // 加载动画参数：base.css 的 .dj-spinner 复用这些变量，改这一处即可
    "html{--dj-spinner-size:32px;--dj-spinner-border:3px;--dj-spinner-accent:#3498db}",
    "html{background:var(--theme-bg-color,#fff)}",
    "html.dark{background:var(--theme-bg-color,#222);color-scheme:dark}",
    "html:not([data-styles-ready])::before{content:'';position:fixed;top:0;right:0;bottom:0;left:0;z-index:9999;background:var(--theme-bg-color,#fff)}",
    "html.dark:not([data-styles-ready])::before{background:var(--theme-bg-color,#222)}",
    "html:not([data-styles-ready])::after{content:'';position:fixed;z-index:10000;top:50%;left:50%;width:var(--dj-spinner-size);height:var(--dj-spinner-size);margin:calc(var(--dj-spinner-size) / -2) 0 0 calc(var(--dj-spinner-size) / -2);box-sizing:border-box;border-radius:50%;border:var(--dj-spinner-border) solid var(--border-color,#d0d0d0);border-top-color:var(--dj-spinner-accent);animation:dj-spin .8s linear infinite}",
    "@keyframes dj-spin{to{transform:rotate(360deg)}}",
    "@media (prefers-reduced-motion:reduce){html:not([data-styles-ready])::after{animation:none}}",
  ].join("");
  document.head.appendChild(style);

  // 3) 样式就绪后收起动画（最短展示时间避免一闪而过，超时兜底放行）
  function finish() {
    if (finished) return;
    finished = true;
    var wait = Math.max(0, MIN_SHOW - (Date.now() - startedAt));
    setTimeout(function () {
      root.setAttribute("data-styles-ready", "");
    }, wait);
  }

  if (root.hasAttribute("data-styles-loaded")) {
    finish();
  } else {
    var observer = new MutationObserver(function () {
      if (root.hasAttribute("data-styles-loaded")) {
        observer.disconnect();
        finish();
      }
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-styles-loaded"],
    });
  }
  setTimeout(finish, TIMEOUT);
})();
