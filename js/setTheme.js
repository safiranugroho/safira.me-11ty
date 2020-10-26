function persistTheme(theme) {
  try {
    localStorage.setItem("color-theme", theme);
  } catch (e) {}
}

function getTheme() {
  try {
    return localStorage.getItem("color-theme");
  } catch (e) {
    return null;
  }
}

(function () {
  function setTheme(theme) {
    window.__theme = theme;
    document.body.className = theme;
  }

  window.__setPreferredTheme = function (theme) {
    setTheme(theme);
    persistTheme(theme);
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  prefersDark.addListener(function (event) {
    window.__setPreferredTheme(event.matches ? "dark" : "light");
  });

  const storedTheme = getTheme();
  const preferredTheme = prefersDark.matches ? "dark" : "light";

  setTheme(storedTheme || preferredTheme);
})();
