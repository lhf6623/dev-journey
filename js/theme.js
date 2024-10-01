
const theme = $.stanz({
  value: 'light'
})

export default theme;

function refreshTheme(_theme = 'light') {
  const THEME_KEY = 'theme'
  const theme = _theme ?? localStorage.getItem(THEME_KEY)
  const html = document.getElementsByTagName('html')[0]
  html.style.colorScheme = theme
  html.classList.toggle('dark', theme === 'dark')
  localStorage.setItem(THEME_KEY, theme)
}
refreshTheme()

// 监听浏览器颜色主题变化
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    refreshTheme(e.matches ? 'dark' : 'light')
  })

theme.watch((data) => {
  refreshTheme(data.value)
});
