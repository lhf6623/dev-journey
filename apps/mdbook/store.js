import Cache from "../../src/js/cache.js";
import { getUrl } from "../../src/js/util.js";
import mdbookMenu from "./mdbookMenu.js";

const MD_CONTENT = "PAGE_MD_CONTENT"; // key 与旧 page-store 一致，用户已存文档内容不丢
const MD_TITLE = "PAGE_MD_TITLE";

/** 文档应用 store：菜单/当前文档/缓存内容 */
export const store = $.stanz({
  menus: mdbookMenu,
  title: Cache.getItem(MD_TITLE) ?? mdbookMenu[0] ?? "",
  mdContent: Cache.getItem(MD_CONTENT) ?? "",
});

export const setTitle = (title) => {
  
  store.title = title;
  Cache.setItem(MD_TITLE, title);
};

export const setMdContent = (content) => {
  store.mdContent = content;
  Cache.setItem(MD_CONTENT, content);
};

/** 去掉文件名后缀（菜单/标题展示用） */
export const stripSuffix = (textName) =>
  typeof textName === "string" ? textName.replace(/\.\w+$/, "") : "";

/** 取当前文档内容 */
export async function getContent() {
  if (!store.title) return "";
  try {
    return await fetch(getUrl(`mdbook/${store.title}`)).then((res) =>
      res.text()
    );
  } catch (e) {
    console.error(e);
    return "";
  }
}
