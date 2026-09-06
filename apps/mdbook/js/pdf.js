// mdbook 应用私有工具：PDF 导出相关（自 src/js/util.js 拷贝，P3 壳瘦身时删原函数）
/**
 * 根据分页剪裁图片
 * @param {HTMLCanvasElement} canvas 图片canvas
 * @param {number} w 图片宽度
 * @param {number} h 图片高度
 * @returns {object} 剪裁后的图片信息
 */
export async function imgClipByPage(canvas, y, imgHeight, quality = 0.8) {

  const _canvas = document.createElement("canvas");
  const _ctx = _canvas.getContext("2d", { willReadFrequently: true });
  _canvas.width = canvas.width;
  _canvas.height = imgHeight;
  // html2canvas 图片底部有 1px 的白边
  if (canvas.height === y + imgHeight) {
    _canvas.height -= 1
  }

  _ctx.drawImage(canvas, 0, y, canvas.width, imgHeight, 0, 0, canvas.width, imgHeight);

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
 * @param {number} y 图片需要检查的绝对 canvas y 坐标
 * @returns {boolean} 是否为空
 */
export function checkImgEmptyLine(canvas, ctx, y) {
  const lineHeight = 3; // 检查行的高度

  const imageData = ctx.getImageData(0, y - lineHeight, canvas.width, lineHeight);
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
