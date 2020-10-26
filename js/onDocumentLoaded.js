function blur(e) {
  e.target.blur();
}

function onDocumentLoaded() {
  const [themeToggle] = document.getElementsByClassName("theme-toggle");
  themeToggle.addEventListener("touchend", blur, false);
  themeToggle.addEventListener("click", blur, false);
}

document.addEventListener("DOMContentLoaded", onDocumentLoaded);
