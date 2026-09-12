/**
 * 壳路由：hash 即状态
 *   #/<app>           顶层应用
 *   #/<app>/<sub>     二级（如 projects 的项目详情）
 * 兼容旧链接：#/app/<app>[/][?sub=<x>]
 */

export const DEFAULT_APP = "leetcode";

/**
 * 解析 hash → { name, sub, query, legacy }
 * @param {string} hash
 */
export function parseHash(hash) {
  const raw = String(hash || "").replace(/^#/, "");

  // 旧格式：#/app/<name>[/][?sub=<x>]
  const legacy = raw.match(/^\/?app\/([^/?#]+)\/?(?:\?(.*))?$/);
  if (legacy) {
    const query = Object.fromEntries(new URLSearchParams(legacy[2] || ""));
    return { name: legacy[1], sub: query.sub || "", query, legacy: true };
  }

  const [path, search] = raw.split("?");
  const parts = path.split("/").filter(Boolean);
  const query = Object.fromEntries(new URLSearchParams(search || ""));

  return {
    name: parts[0] || DEFAULT_APP,
    sub: parts[1] || query.sub || "",
    query,
    legacy: false,
  };
}

/** 路由对象 → hash（不含 origin） */
export function toHash({ name, sub }) {
  return `#/${name}${sub ? `/${sub}` : ""}`;
}

/** 当前地址栏路由（未归一化） */
export function currentRoute() {
  return parseHash(location.hash);
}
