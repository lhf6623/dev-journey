import { getUrl } from "./util.js";
import menusData from "./menusData.js";
import { throttle } from "https://esm.sh/lodash-es@4.17.21";

const THEME_KEY = "theme";

// 读取系统主题
const os_theme = window.matchMedia("(prefers-color-scheme: dark)").matches
	? "dark"
	: "light";
// 读取本地主题
const local_theme = localStorage.getItem(THEME_KEY);

const _menus = [...menusData].sort((a, b) => {
	const [a_index] = a.split(".");
	const [b_index] = b.split(".");
	return Number(a_index) - Number(b_index);
});
/** 当前标题 */
export const title = $.stanz({
	val: "",
});
/** 当前代码 */
export const code = $.stanz({
	val: "",
});
/** 加载 code 状态 */
export const loading = $.stanz({
	val: false,
});
/** 菜单列表 */
export const menus = $.stanz({
	val: _menus,
});
/** 显示菜单 */
export const isShowMenu = $.stanz({
	val: true,
});
/** 小屏 */
export const isSmall = $.stanz({
	val: false,
});
/** 主题 */
export const theme = $.stanz({
	val: local_theme ?? os_theme,
});
/** 编辑器中在编辑的代码 */
export const editorCode = $.stanz({
	val: "",
});
/** 立即运行 */
export const isRun = $.stanz({
	val: false,
});
/** 周期性 运行 */
export const isRunInterval = $.stanz({
	val: false,
});
/** 还原代码 */
export const isReset = $.stanz({
	val: false,
});

function refreshTheme(theme = "light") {
	const html = document.getElementsByTagName("html")[0];
	html.classList.toggle("dark", theme === "dark");

	localStorage.setItem(THEME_KEY, theme);
}

refreshTheme(theme.val);

// 监听浏览器颜色主题变化
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", ({ matches }) => {
		theme.val = matches ? "dark" : "light";
		refreshTheme(theme.val);
	});

theme.watch((data) => {
	refreshTheme(data.value);
});

// bug 赋值太快 watch 监听会丢失数据
const setShowMenu = throttle(() => {
	const width = window.innerWidth;
	isSmall.val = width < 960;
	isShowMenu.val = width > 960;
}, 300);
setShowMenu();

// 监听浏览器窗口宽度变化
window.addEventListener("resize", setShowMenu);

title.watchTick(async () => {
	if (title.val) {
		try {
			loading.val = true;
			code.val = await fetch(getUrl(`questionBank/${title.val}`)).then((res) =>
				res.text()
			);
		} catch (e) {
			console.error(e);
		}

		loading.val = false;
	}
});
