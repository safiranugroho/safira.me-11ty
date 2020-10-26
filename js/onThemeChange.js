function onThemeChange() {
  const preferredTheme = window.__theme === "light" ? "dark" : "light";
  window.__setPreferredTheme(preferredTheme);
}
