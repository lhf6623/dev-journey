// 发布订阅模式
// 收集组合键事件
/**
 * 如果是 window 监听 ctrl
 * 如果是 Mac 监听 command
 * 统一为 Ctrl
 */
class Keyboard {
  constructor() {
    this.bindings = new Map();
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }
  _handleKeyDown(e) {
    const key = getCombinationKey(e);
    if (this.bindings.has(key)) {
      for (const { fn, ctx } of this.bindings.get(key)) {
        fn.call(ctx, e);
        e.preventDefault();
      }
    }
  }
  on(key, fn, ctx = null) {
    if (!this.bindings.has(key)) {
      this.bindings.set(key, new Set());
    }
    this.bindings.get(key).add({ fn, ctx });
  }
  off(key, fn, ctx = null) {
    if (this.bindings.has(key)) {
      for (const binding of this.bindings.get(key)) {
        if (binding.fn === fn && binding.ctx === ctx) {
          this.bindings.get(key).delete(binding);
          break;
        }
      }
    }
  }
  // 主动触发
  trigger(key) {
    const set = this.bindings.get(key);
    if (!set) return;
    for (const item of set) {
      const { fn, ctx } = item
      fn && fn.call(ctx);
    }
  }
}

// 获取组合键
export function getCombinationKey(e) {
  const is_mac = getPlatform() === 'macOS';

  const ctrl_key = (is_mac ? e.metaKey : e.ctrlKey) ? "Ctrl" : '';
  const shift_key = e.shiftKey ? "Shift" : '';
  const alt_key = e.altKey ? "Alt" : '';
  const letter_key = capitalizeFirst(e.key);
  return [ctrl_key, shift_key, alt_key, letter_key].filter(Boolean).join('-');
}

function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 检测 Windows 或 macOS 平台
export function getPlatform() {
  // 检查浏览器是否支持 userAgentData
  if (navigator.userAgentData) {
    const platform = navigator.userAgentData.platform;
    if (platform.includes('Win')) {
      return 'Windows';
    } else if (platform.includes('Mac')) {
      return 'macOS';
    }
  }

  // 降级方案：若不支持 userAgentData，使用 userAgent 兜底
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Windows')) {
    return 'Windows';
  } else if (userAgent.includes('Mac OS X')) {
    return 'macOS';
  }

  return '未知平台';
}

export const keyboard = new Keyboard();