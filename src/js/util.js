import { inRange } from "https://esm.sh/lodash-es@4.17.21";
import pkg from "../../package.json" with { type: "json" };

export const { version, name } = pkg;

export const watchHtmlTheme = (fn) => {

  const targetNode = document.documentElement;
  const theme = targetNode.className.includes("dark") ? "dark" : "light"
  fn(theme);
  const config = {
    attributes: true, // 监听属性变化
    attributeFilter: ["class"], // 只监听class属性的变化
    childList: false, // 不监听子节点的增减
    subtree: false, // 不监听后代节点
  };
  const callback = (mutationsList) => {
    const { type, target } = mutationsList[0] || {};
    if (type === "attributes") {
      const theme = target.className.includes("dark") ? "dark" : "light"
      fn(theme);
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  return () => {
    observer.disconnect();
  };
}
/**
 * 获取开始到结束的值，如果大于或小于 start 或 end，则返回 start 或 end
 * @param {Number} start
 * @param {Number} end
 * @param {Number} value
 * @returns {Number}
 */
function getInRange(value, start, end) {
  if (end === undefined) {
    return getInRange(value, 0, start + 1);
  }
  if (inRange(value, start, end)) {
    return value;
  } else if (value < start) {
    return start;
  }
  return end;
}
/**
 * 获取浏览器显示的地址
 * @param {String} url 地址
 * @returns {String} 浏览器显示的地址
 */
export function getUrl(url) {
  const { origin, protocol } = location;
  if (protocol === "https:") {
    return `https://lhf6623.github.io/dev-journey/${url}`;
  }
  return `${origin}/${url}`;
}


function proxyConsole(id) {
  // 循环结构需要剔除
  const loopObject = new Map();
  function anyToString(arr, space = 0) {
    // 空格
    space += 2;

    return arr.map((item) => {
      if (item === null) return "null"
      if (item === undefined) return "undefined"
      if (item instanceof Map) {
        if (item.size === 0) return "{}"
        return anyToString([Object.fromEntries(item)], space - 2)
      }
      if (item instanceof Set) {
        if (item.size === 0) return "[]"
        return anyToString([Array.from(item)], space)
      }
      if (Array.isArray(item)) {
        if (item.length === 0) return "[]"
        return `[${item.map((arr) => anyToString([arr], space))}]`
      }
      if (typeof item === 'bigint') {
        return item.toString() + 'n';
      }
      if (typeof item === 'symbol') {
        return 'Symbol'
      }
      if (typeof item === "object") {
        // 判断空对象
        if (Object.keys(item).length === 0) return "{}"

        if (loopObject.has(item)) return "循环引用";
        loopObject.set(item, true);
        const space_string = Array.from({ length: space }).fill(' ').join('');
        const last_space_string = Array.from({ length: space - 2 }).fill(' ').join('');
        return `{\n${Object.keys(item).map(key => `${space_string}${key}: ${anyToString([item[key]], space)}`).join(', \n')}\n${last_space_string}}`
      }

      // function number
      return item;
    }).join(", ");
  }
  const timers = new Map();
  const counters = new Map();
  console = new Proxy(console, {
    get(target, prop) {
      if (typeof target[prop] === "function") {
        return function (...args) {
          let info = anyToString(args)

          if (prop === "time") {
            const label = args[0] || "default";
            timers.set(label, performance.now());
            return
          } else if (prop === "timeEnd") {
            const label = args[0] || "default";
            if (timers.has(label)) {
              const elapsed = performance.now() - timers.get(label);
              timers.delete(label);
              info = `${label}: ${elapsed.toFixed(2)} ms`;
            } else {
              info = `${label}: 计时器不存在`;
            }
          } else if (prop === "count") {
            const label = args[0] || "default";
            const count = (counters.get(label) || 0) + 1;
            counters.set(label, count);
            info = `${label}: ${count}`;
          } else if (prop === "countReset") {
            const label = args[0] || "default";
            counters.set(label, 0);
            return;
          }

          if (id) {
            window.parent.postMessage({
              type: prop,
              info: info,
              source: id,
              time: Date.now()
            }, '*');

          }
          // return target[prop].apply(target, args);
        };
      }
      return target[prop];
    },
  });
}

/**
 * 创建运行器
 * @returns
 */
export function createJsRunner(fn) {
  let iframe;
  const id = crypto.randomUUID();

  function createIframe() {

    if (iframe) {
      document.body.removeChild(iframe);
    }

    iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = `about:blank`; // 或同源 URL
    iframe.id = id;

    return new Promise(resolve => {
      setTimeout(() => {
        iframe.onload = () => {

          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          resolve(iframeDoc)
        };

        document.body.appendChild(iframe);
      }, 100);
    })
  }

  // 写入运行代码
  async function writeCode(code) {
    const iframeDoc = await createIframe()

    const runCode = `
      const id = '${id}';
      ${proxyConsole.toString()}
      proxyConsole(id);

      try {
        ${code}
      } catch (e) {
        console.error(e.message);
      }
    `;
    const script = document.createElement("script");
    script.textContent = runCode;
    iframeDoc.body.appendChild(script);
  }

  window.addEventListener("message", fn);
  // 移除监听
  function onDestroy() {
    window.removeEventListener("message", fn);
    // 移除iframe
    iframe && document.body.removeChild(iframe);
  }

  return {
    writeCode,
    onDestroy,
    id
  };
}
/**
 * @typedef SplitOptions 拖动元素
 * @property {Object} opt - 元素
 * @property {Array} opt.els - 元素
 * @property {number} opt.minWidth - 最小宽度
 * @property {number} opt.defaultWidth - 左边节点默认宽度
 */

/**
 *
 * @param {SplitOptions} opt
 */
export function Split(opt) {
  const { els, minWidth = 10, defaultWidth = 66 } = opt;
  const [el1, el2, el3] = els;

  const { parentElement } = el1;
  let { width: parentWidth, left: parentLeft } =
    parentElement.getBoundingClientRect();

  const { width: midWidth } = el2.getBoundingClientRect();

  function mouse(event) {
    event.preventDefault();
    const { clientX } = event;
    const left = getInRange(clientX - parentLeft, parentWidth);
    const x = (left / parentWidth) * 100;
    if (100 - minWidth >= x && x >= minWidth) {
      setStyle(x);
    }
  }

  const _defaultWidth = getInRange(defaultWidth ?? 50, 100 - minWidth);
  setStyle(_defaultWidth);

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.target === parentElement) {
        const { width, left } = entry.target.getBoundingClientRect();

        parentWidth = width;
        parentLeft = left;
      }
    }
  });

  resizeObserver.observe(parentElement);

  function setStyle(left_width) {
    // 百分百
    const el1_w_str = `calc(${left_width}% - ${midWidth / 2}px)`;
    const el3_w_str = `calc(${100 - left_width}% - ${midWidth / 2}px)`;

    el1.style.setProperty("width", el1_w_str);
    el3.style.setProperty("width", el3_w_str);
  }

  el2.addEventListener("mousedown", (e) => {
    e.preventDefault();
    parentElement.classList.add("cursor-col-resize");
    document.addEventListener("mousemove", mouse);
  });

  document.addEventListener("mouseup", () => {
    parentElement.classList.remove("cursor-col-resize");
    document.removeEventListener("mousemove", mouse);
  });
}
/**
 * 根据分页剪裁图片
 * @param {HTMLCanvasElement} canvas 图片canvas
 * @param {number} w 图片宽度
 * @param {number} h 图片高度
 * @returns {object} 剪裁后的图片信息
 */
export async function imgClipByPage(canvas, y, img_height, quality = 0.8) {

  const _canvas = document.createElement("canvas");
  const _ctx = _canvas.getContext("2d", { willReadFrequently: true });
  _canvas.width = canvas.width;
  _canvas.height = img_height;
  // html2canvas 图片底部有 1px 的白边
  if (canvas.height === y + img_height) {
    _canvas.height -= 1
  }

  _ctx.drawImage(canvas, 0, y, canvas.width, img_height, 0, 0, canvas.width, img_height);

  // PNG 不能压缩，所以这里用 JPEG
  const base64 = _canvas.toDataURL("image/jpeg", quality);

  return {
    base64,
    canvas: _canvas,
    ctx: _ctx,
  };
}

/**
 * 检查区域内图片内容是否为空
 * @param {HTMLCanvasElement} canvas 图片canvas
 * @param {number} y 图片要检查的高度
 * @param {number} page 图片要检查的页码
 * @returns {boolean} 是否为空
 */
export function checkImgEmptyLine(canvas, ctx, y, page) {
  const line_height = 3; // 检查行的高度

  const imageData = ctx.getImageData(0, y + (y * page) - line_height, canvas.width, line_height);
  const data = imageData.data;

  // 计算相同颜色像素的比例
  const colorCounts = new Map();
  let totalPixels = 0;
  for (let i = 0; i < data.length; i += 4) {
    const rgba = `${data[i]},${data[i + 1]},${data[i + 2]},${data[i + 3]
      }`;
    colorCounts.set(rgba, (colorCounts.get(rgba) || 0) + 1);
    totalPixels++;
  }

  const keys = [...colorCounts.keys()];
  const gl = keys.reduce((pre, cur, index) => {
    if (!pre[cur]) {
      pre[cur] = [cur];
    }
    for (let i = 0; i < keys.length; i++) {
      if (i !== index && colorDistance(cur, keys[i]) < 10) {
        pre[cur].push(keys[i]);
      }
    }
    return pre;
  }, {});

  let maxCount = 0;
  Object.values(gl).forEach((item) => {
    let _max = 0;
    item.forEach((key) => {
      _max += colorCounts.get(key);
    });
    if (_max > maxCount) {
      maxCount = _max;
    }
  });

  return maxCount / totalPixels > 0.85;
}
/**
 * 两个颜色的差值
 * @param {string} color1 255,255,255,255
 * @param {string} color2 255,255,255,255
 * @returns 
 */
export function colorDistance(color1, color2) {
  // 解析颜色字符串为RGBA数组
  const c1 = color1.split(",").map(Number);
  const c2 = color2.split(",").map(Number);

  // 计算RGB三个通道的差值平方和
  const rDiff = c1[0] - c2[0];
  const gDiff = c1[1] - c2[1];
  const bDiff = c1[2] - c2[2];

  // 返回欧几里得距离
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}