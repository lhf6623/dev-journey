// 微前端工具：应用清单与入口解析
import { getUrl } from "../js/util.js";
import apps from "./apps.json" with { type: "json" };

/** 全部应用清单（只读语义；apps.json 首项与壳路由 home 保持一致） */
export const getApps = () => apps;

/** 按 name 取应用；不存在返回 null */
export const getApp = (name) => apps.find((a) => a.name === name) ?? null;

/** 应用内文件（index.html/cover 等）的绝对地址；file 缺省 index.html */
export const getAppUrl = (name, file = "index.html") =>
  getUrl(`apps/${name}/${file}`);

/**
 * 清洗页面 query：ofa 尾斜杠目录索引会在 URL 尾部追加 " .html" 标志，
 * 页面模块解析出的 query 值会被污染（如 sub → "demo .html"），这里去掉该后缀
 */
export const cleanQuery = (query) =>
  Object.fromEntries(
    Object.entries(query ?? {}).map(([k, v]) => [
      k,
      String(v).replace(/ \.html$/, ""),
    ])
  );
