import Cache from "../js/cache.js";
const CODE = "leetcode_code";
const TITLE = "leetcode_title";
const MD_CONTENT = "md_content";
const MD_TITLE = "md_title";

export const page_store = $.stanz({
  /** 正在编辑的代码 */
  leetcode_code: Cache.getItem(CODE),
  /** 标题 */
  leetcode_title: Cache.getItem(TITLE) ?? "",
  /** md 内容 */
  md_content: Cache.getItem(MD_CONTENT) ?? "",
  /** md 标题 */
  md_title: Cache.getItem(MD_TITLE) ?? "",
});
export const setLeetcodeCode = (code) => {
  page_store.leetcode_code = code;
  Cache.setItem(CODE, code);
};

export const setLeetcodeTitle = (title) => {
  page_store.leetcode_title = title;
  Cache.setItem(TITLE, title);
};

export const setMdContent = (content) => {
  page_store.md_content = content;
  Cache.setItem(MD_CONTENT, content);
};

export const setMdTitle = (title) => {
  page_store.md_title = title;
  Cache.setItem(MD_TITLE, title);
};
