import Cache from "../js/cache.js";
const CODE = "PAGE_CODE";
const TITLE = "PAGE_TITLE";
const MD_CONTENT = "PAGE_MD_CONTENT";
const MD_TITLE = "PAGE_MD_TITLE";

export const pageStore = $.stanz({
  /** 正在编辑的代码 */
  leetcodeCode: Cache.getItem(CODE),
  /** 标题 */
  leetcodeTitle: Cache.getItem(TITLE) ?? "",
  /** md 内容 */
  mdContent: Cache.getItem(MD_CONTENT) ?? "",
  /** md 标题 */
  mdTitle: Cache.getItem(MD_TITLE) ?? "",
});
export const setLeetcodeCode = (code) => {
  pageStore.leetcodeCode = code;
  Cache.setItem(CODE, code);
};

export const setLeetcodeTitle = (title) => {
  pageStore.leetcodeTitle = title;
  Cache.setItem(TITLE, title);
};

export const setMdContent = (content) => {
  pageStore.mdContent = content;
  Cache.setItem(MD_CONTENT, content);
};

export const setMdTitle = (title) => {
  pageStore.mdTitle = title;
  Cache.setItem(MD_TITLE, title);
};
