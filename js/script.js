// ---- Burger-menu (mobil) ----
// Henter alle de elementer menuen skal bruge
const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const navOverlay = document.getElementById("navOverlay");

// Kører kun hvis knap og menu rent faktisk findes på siden
if (burgerBtn && navLinks) {
  // open/close som to separate funktioner, så jeg kan kalde dem fra flere steder
  // (burger-knap, luk-knap, klik udenfor, escape - alle skal kunne lukke menuen)
  const openMenu = () => {
    navLinks.classList.add("open"); // css'en flytter menuen ind på skærmen
    navOverlay?.classList.add("open"); // det mørke lag bag menuen
    burgerBtn.setAttribute("aria-expanded", "true"); // skærmlæser skal vide at den er åben
  };

  const closeMenu = () => {
    navLinks.classList.remove("open");
    navOverlay?.classList.remove("open");
    burgerBtn.setAttribute("aria-expanded", "false");
  };

  // klik på burger = åben hvis lukket, luk hvis åben
  burgerBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  // luk-knappen inde i selve menuen
  closeMenuBtn?.addEventListener("click", closeMenu);
  // klik på det mørke lag udenfor menuen lukker den også
  navOverlay?.addEventListener("click", closeMenu);

  // luk menuen automatisk når man trykker på et af linkene (fx "PRODUKT")
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // escape-tasten skal også kunne lukke den, ellers er den ikke rigtig tastatur-venlig
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      closeMenu();
      burgerBtn.focus(); // sender fokus tilbage til knappen så man ikke "mister" sig selv på siden
    }
  });
}

// ---- Læs mere / læs mindre (produktbeskrivelse) ----
const readMoreBtn = document.getElementById("readMoreBtn");
const productDescription = document.getElementById("productDescription");

if (readMoreBtn && productDescription) {
  const readMoreText = readMoreBtn.querySelector(".read-more-text"); // selve teksten inde i knappen

  readMoreBtn.addEventListener("click", () => {
    // toggle returnerer true/false alt efter om klassen blev tilføjet eller fjernet
    const isExpanded = productDescription.classList.toggle("expanded");
    readMoreBtn.setAttribute("aria-expanded", String(isExpanded));
    // skifter selve knap-teksten alt efter tilstand
    readMoreText.textContent = isExpanded ? "Læs mindre" : "Læs mere";
  });
}

// ---- "KØB NU" knap i hero ----
// scroller bare ned til produktet i stedet for at linke til en anden side
const buyNowBtn = document.getElementById("buyNowBtn");

buyNowBtn?.addEventListener("click", () => {
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
});

// ---- Specifikationer - fold ud/ind ----
// alle 5 knapper (Lyd, Strøm, Design osv.) får samme klik-logik
const specsToggles = document.querySelectorAll(".specs-toggle");

specsToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    // aria-controls på knappen peger på id'et på det panel den styrer
    const panel = document.getElementById(toggle.getAttribute("aria-controls"));
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    // vend det hele om - var den åben, lukkes den, og omvendt
    toggle.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen; // det er faktisk denne linje der viser/skjuler teksten
  });
});
