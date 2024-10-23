import Cache from "./cache.js";
const EDITOR_CODE = "editor_code";
/**
 * @template T
 * @typedef Temp
 * @property {T} val
 */

/**
 * 编辑器中在编辑的代码
 * @type {Temp<string>}
 */
export const editor_code = $.stanz({
  val: Cache.getItem(EDITOR_CODE) || "",
});

export function setEditorCode(val) {
  editor_code.val = val;
  Cache.setItem(EDITOR_CODE, val);
}
/**
 * 立即运行
 * @type {Temp<boolean>}
 */
export const is_run = $.stanz({
  val: false,
});
/**
 * 周期性 运行
 * @type {Temp<boolean>}
 */
export const is_run_interval = $.stanz({
  val: false,
});
/**
 * 还原代码
 * @type {Temp<boolean>}
 */
export const is_reset = $.stanz({
  val: false,
});
