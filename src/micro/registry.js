/**
 * 应用注册表：apps.json 是唯一清单
 * 条目 = { name, title, icon, load() }
 * load() 动态导入应用契约模块（apps/<name>/index.js）
 */
import apps from "./apps.json" with { type: "json" };

export const registry = apps.map((meta) => ({
  ...meta,
  load: () => import(`../../apps/${meta.name}/index.js`),
}));

export const getApps = () => registry;

/** 只含纯数据的元信息（可安全放进 ofa 组件 data；data 不允许函数） */
export const getAppMetas = () =>
  apps.map(({ name, title, icon }) => ({ name, title, icon }));

export const getApp = (name) =>
  registry.find((app) => app.name === name) ?? null;
