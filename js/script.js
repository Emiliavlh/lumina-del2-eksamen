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
    navLinks.classList.add("open"); // css'en flytter menuen ind på skærmen (og gør den synlig/tastatur-venlig igen)
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

// ---- Kurv ----
const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const addToCartBtn = document.getElementById("addToCartBtn");

if (cartBtn && cartPanel) {
  const cartCount = document.getElementById("cartCount");
  const cartItem = document.getElementById("cartItem");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartQty = document.getElementById("cartQty");
  const cartTotal = document.getElementById("cartTotal");
  const cartTotalRow = document.getElementById("cartTotalRow");
  const cartMinusBtn = document.getElementById("cartMinusBtn");
  const cartPlusBtn = document.getElementById("cartPlusBtn");
  const cartRemoveBtn = document.getElementById("cartRemoveBtn");

  const PRICE = 1995;
  let qty = 0; // kun ét produkt på hele siden, så antal i kurv = tal på badge

  // opdaterer badge, kurv-varen og totalen ud fra qty
  const renderCart = () => {
    const hasItem = qty > 0;

    cartCount.hidden = !hasItem;
    cartCount.textContent = String(qty);

    cartItem.hidden = !hasItem;
    cartEmpty.hidden = hasItem;
    cartTotalRow.hidden = !hasItem;

    if (hasItem) {
      cartQty.textContent = String(qty);
      cartTotal.textContent = `DKK ${(PRICE * qty).toLocaleString("da-DK", { minimumFractionDigits: 2 })}`;
    }
  };

  const openCart = () => {
    cartPanel.classList.add("open"); // css'en gør den synlig og tastatur-venlig
    cartOverlay.classList.add("open");
  };
  const closeCart = () => {
    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("open");
  };

  cartBtn.addEventListener("click", openCart);
  cartCloseBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && cartPanel.classList.contains("open")) {
      closeCart();
      cartBtn.focus();
    }
  });

  // "LÆG I KURV" lægger 1 i kurven (eller lægger endnu 1 oveni, hvis der allerede er noget)
  addToCartBtn?.addEventListener("click", () => {
    qty += 1;
    renderCart();
  });

  cartPlusBtn.addEventListener("click", () => {
    qty += 1;
    renderCart();
  });
  cartMinusBtn.addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    renderCart();
  });
  cartRemoveBtn.addEventListener("click", () => {
    qty = 0;
    renderCart();
  });

  renderCart();
}

// ---- Fold ud/ind (Specifikationer + Footer) ----
// begge sektioner bruger samme aria-expanded/aria-controls/hidden-mønster,
// så de kan dele den samme klik-logik i stedet for at gentage koden to gange
document.querySelectorAll(".specs-toggle, .footer-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    // aria-controls på knappen peger på id'et på det panel den styrer
    const panel = document.getElementById(toggle.getAttribute("aria-controls"));
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    // vend det hele om - var den åben, lukkes den, og omvendt
    toggle.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen; // det er faktisk denne linje der viser/skjuler teksten
  });
});
