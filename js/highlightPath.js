window.addEventListener("load", function () {
  const [pathname] = window.location.pathname.split("/").filter((p) => p);

  const id = pathname ? pathname : "home";
  const navLinks = document.querySelectorAll(".nav-link");
  for (const link of navLinks) {
    link.classList.remove("highlight");
  }

  const activeLink = document.querySelector(`#${id}`);
  activeLink.classList.add("highlight");
});
