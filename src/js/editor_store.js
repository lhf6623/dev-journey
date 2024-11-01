import Cache from "./cache.js";
const EDITOR_CODE = "editor_code";

export const editor_store = $.stanz({
  /** 正在编辑的代码 */
  editor_code: Cache.getItem(EDITOR_CODE) || "",
  /** 立即运行 */
  is_run: false,
  /** 实时运行 */
  is_run_interval: false,
  /** 还原代码 */
  is_reset: false,
});

export function setEditorCode(val) {
  editor_store.editor_code = val;
  Cache.setItem(EDITOR_CODE, val);
}
