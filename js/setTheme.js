(function () {
  function setTheme(theme) {
    window.__theme = theme;
    document.body.className = theme;
  }

  window.__setPreferredTheme = function (theme) {
    setTheme(theme);
    localStorage.setItem("color-theme", theme);
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  prefersDark.addListener(function (event) {
    window.__setPreferredTheme(event.matches ? "dark" : "light");
  });

  const storedTheme = localStorage.getItem("color-theme");
  const preferredTheme = prefersDark.matches ? "dark" : "light";

  setTheme(storedTheme || preferredTheme);
})();
