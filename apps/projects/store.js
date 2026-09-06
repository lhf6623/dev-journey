import projectsMenu from "./projectsMenu.js";

/** projects 应用 store：卡片列表 + 列表/详情视图切换（无持久化需求，不接 Cache） */
export const store = $.stanz({
  menus: projectsMenu, // createMenus 生成的对象数组（卡片数据源）
  view: "list", // list | detail
  sub: "", // 当前打开的项目目录名
});
