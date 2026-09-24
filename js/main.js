// Burger-menu til mobil
const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const navOverlay = document.getElementById("navOverlay");

if (burgerBtn && navLinks) {
  const openMenu = () => {
    navLinks.classList.add("open");
    navOverlay?.classList.add("open");
    burgerBtn.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    navLinks.classList.remove("open");
    navOverlay?.classList.remove("open");
    burgerBtn.setAttribute("aria-expanded", "false");
  };

  burgerBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  closeMenuBtn?.addEventListener("click", closeMenu);
  navOverlay?.addEventListener("click", closeMenu);

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      closeMenu();
      burgerBtn.focus();
    }
  });
}
