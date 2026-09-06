import Cache from "../../src/js/cache.js";
import { getUrl } from "../../src/js/util.js";
import leetcodeMenu from "./leetcodeMenu.js";

const CODE = "PAGE_CODE"; // key 与旧 page-store 一致，用户已存代码不丢
const TITLE = "PAGE_TITLE";

/** 力扣应用 store：菜单/当前题/编辑代码 */
export const store = $.stanz({
  menus: leetcodeMenu,
  title: Cache.getItem(TITLE) ?? leetcodeMenu[0] ?? "",
  leetcodeCode: Cache.getItem(CODE),
});

export const setTitle = (title) => {
  store.title = title;
  Cache.setItem(TITLE, title);
};

export const setCode = (code) => {
  store.leetcodeCode = code;
  Cache.setItem(CODE, code);
};

/** 去掉文件名后缀（菜单/标题展示用） */
export const stripSuffix = (textName) =>
  typeof textName === "string" ? textName.replace(/\.\w+$/, "") : "";

/** 取当前题目原始内容 */
export async function getContent() {
  if (!store.title) return "";
  try {
    return await fetch(getUrl(`leetcode/${store.title}`)).then((res) =>
      res.text()
    );
  } catch (e) {
    console.error(e);
    return "";
  }
}
