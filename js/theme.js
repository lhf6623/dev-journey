const THEME_KEY = "theme";

const theme = $.stanz({
	value: "light",
});

export default theme;

function refreshTheme(theme = "light") {
	const html = document.getElementsByTagName("html")[0];
	html.style.colorScheme = theme;
	html.classList.toggle("dark", theme === "dark");
	localStorage.setItem(THEME_KEY, theme);
}

theme.value = localStorage.getItem(THEME_KEY);
refreshTheme(theme.value);

// 监听浏览器颜色主题变化
window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", (e) => {
		refreshTheme(e.matches ? "dark" : "light");
	});

theme.watch((data) => {
	refreshTheme(data.value);
});
