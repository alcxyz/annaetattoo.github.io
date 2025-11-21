// --- Partial Injection Logic (Header, Footer) ---
async function loadPartial(id, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load partial: ${url} (${response.status})`);
    }
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

// --- Language Switcher Logic ---
function setupLanguageSwitcher() {
  const currentPath = window.location.pathname;
  const isNorwegian = currentPath.startsWith("/no");

  const switchToEnLinks = document.querySelectorAll(".lang-switch-en");
  const switchToNoLinks = document.querySelectorAll(".lang-switch-no");

  if (isNorwegian) {
    // Current page is Norwegian, so set links to English version
    let enPath = currentPath.substring(3); // Remove leading '/no'
    if (enPath === "" || !enPath.startsWith("/")) {
      enPath = "/"; // Link to the root homepage
    }
    switchToEnLinks.forEach((link) => (link.href = enPath));
  } else {
    // Current page is English, so set links to Norwegian version
    // Explicitly handle the root to avoid '//' issues and ensure correctness
    const noPath = currentPath === "/" ? "/no/" : `/no${currentPath}`;
    switchToNoLinks.forEach((link) => (link.href = noPath));
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Determine language and set partials path
  const lang = document.documentElement.lang || "en";
  const partialsSubDir = lang === "nb" ? "nb/" : ""; // Note: trailing slash

  // Load header and footer using a robust absolute path
  await loadPartial(
    "header-placeholder",
    `/partials/${partialsSubDir}header.html`,
  );
  await loadPartial(
    "footer-placeholder",
    `/partials/${partialsSubDir}footer.html`,
  );

  // --- IMPORTANT: Run other DOM-dependent scripts AFTER partials are loaded ---

  // --- Setup Language Switcher ---
  // This must run *after* the header is loaded into the DOM
  setupLanguageSwitcher();

  // --- Copyright Year Logic ---
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // --- Mobile Menu Logic ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const closeMenuButton = document.getElementById("close-menu-button");
  const offCanvasMenu = document.getElementById("off-canvas-menu");
  const offCanvasOverlay = document.getElementById("off-canvas-overlay");

  if (mobileMenuButton && offCanvasMenu && offCanvasOverlay && closeMenuButton) {
    function toggleMenu() {
      offCanvasMenu.classList.toggle("open");
      offCanvasOverlay.classList.toggle("open");
      document.body.classList.toggle("overflow-hidden");
    }
    mobileMenuButton.addEventListener("click", toggleMenu);
    closeMenuButton.addEventListener("click", toggleMenu);
    offCanvasOverlay.addEventListener("click", toggleMenu); // Close when clicking outside
  }

  // --- Image Carousel Logic ---
  let slideIndex = 0;
  const slides = document.querySelectorAll(".carousel-image");
  const indicatorsContainer = document.querySelector(".carousel-indicators");
  let autoSlideInterval;

  if (slides.length > 0) {
    function showSlide(n) {
      slides.forEach((slide) => {
        slide.classList.remove("active", "opacity-100");
        slide.classList.add("opacity-0");
      });

      if (n >= slides.length) {
        slideIndex = 0;
      }
      if (n < 0) {
        slideIndex = slides.length - 1;
      }

      requestAnimationFrame(() => {
        slides[slideIndex].classList.add("active", "opacity-100");
      });
      updateIndicators();
    }

    function plusSlides(n) {
      clearInterval(autoSlideInterval);
      showSlide((slideIndex += n));
      startAutoSlide();
    }

    function currentSlide(n) {
      clearInterval(autoSlideInterval);
      slideIndex = n;
      showSlide(slideIndex);
      startAutoSlide();
    }

    function updateIndicators() {
      if (!indicatorsContainer) return;
      indicatorsContainer.innerHTML = "";
      for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement("div");
        indicator.classList.add("carousel-indicator");
        if (i === slideIndex) {
          indicator.classList.add("active");
        }
        indicator.addEventListener("click", () => currentSlide(i));
        indicatorsContainer.appendChild(indicator);
      }
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        showSlide((slideIndex += 1));
      }, 5000);
    }

    showSlide(slideIndex); // Initial display
    document
      .querySelector(".carousel-button.prev")
      ?.addEventListener("click", () => plusSlides(-1));
    document
      .querySelector(".carousel-button.next")
      ?.addEventListener("click", () => plusSlides(1));
    startAutoSlide();
  } else {
    document.getElementById("image-carousel")?.classList.add("hidden");
  }

  // --- Accordion Logic ---
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const accordionContent = button.nextElementSibling;
      const accordionIcon = button.querySelector(".accordion-icon");

      button.classList.toggle("active");
      accordionIcon.classList.toggle("rotate-180");

      if (button.classList.contains("active")) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      } else {
        accordionContent.style.maxHeight = "0px";
      }
    });
  });
});

// --- Booking Modal (Elfsight widget only) ---
(function bookingModal() {
  const modal = document.getElementById("booking-modal");
  if (!modal) return;

  const slot = document.getElementById("booking-widget-slot");
  const loading = document.getElementById("booking-loading");
  const openPage = document.getElementById("booking-open-page");
  const titleEl = document.getElementById("booking-modal-title");
  const openers = document.querySelectorAll("[data-booking]");
  const html = document.documentElement;

  let lastFocus = null;
  let scrollY = 0;

  function isNorwegian() {
    return (
      location.pathname.startsWith("/no") ||
      document.documentElement.lang === "nb"
    );
  }

  function widgetId() {
    // NO vs EN widget IDs
    return isNorwegian()
      ? "elfsight-app-24afd236-ed9b-4def-a05a-f752f533d99d"
      : "elfsight-app-7175524f-45be-48d7-8006-82ec694c134d";
  }

  const ELFSIGHT_SCRIPT_SRC = "https://elfsightcdn.com/platform.js";

  const dialog = modal.querySelector('[role="dialog"]');
  if (dialog) {
    dialog.addEventListener("click", (e) => e.stopPropagation());
  }

  function focusableElements(root) {
    return root.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
  }
  function trapFocus(e) {
    if (e.key !== "Tab" || modal.classList.contains("hidden")) return;
    const nodes = Array.from(focusableElements(modal));
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  window.addEventListener("keydown", trapFocus);

  function bookingPageUrl() {
    return isNorwegian() ? "/no/booking/" : "/booking/";
  }

  function setLocaleLabels() {
    if (titleEl)
      titleEl.textContent = isNorwegian() ? "Bestill time" : "Book appointment";
    if (openPage)
      openPage.textContent = isNorwegian()
        ? "Åpne full bookingside"
        : "Open full booking page";
  }

  function ensureElfsightScript() {
    return new Promise((resolve) => {
      if (window.elfsightApp && typeof window.elfsightApp.load === "function") {
        resolve();
        return;
      }
      const existing = document.querySelector(
        `script[src="${ELFSIGHT_SCRIPT_SRC}"]`
      );
      if (existing) {
        const check = () => {
          if (
            window.elfsightApp &&
            typeof window.elfsightApp.load === "function"
          ) {
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
        return;
      }
      const s = document.createElement("script");
      s.src = ELFSIGHT_SCRIPT_SRC;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => resolve(); // fallback will handle
      document.head.appendChild(s);
    });
  }

  function renderWidget() {
    slot.innerHTML = "";
    const host = document.createElement("div");
    host.className = widgetId();
    host.setAttribute("data-elfsight-app-lazy", "");
    slot.appendChild(host);

    requestAnimationFrame(() => {
      if (window.elfsightApp && typeof window.elfsightApp.load === "function") {
        try {
          window.elfsightApp.load();
        } catch {}
      }
    });
  }

  function openModal() {
    lastFocus = document.activeElement;
    scrollY = window.scrollY;

    setLocaleLabels();

    html.style.top = `-${scrollY}px`;
    html.classList.add("overflow-hidden");
    modal.classList.remove("hidden");
    loading.style.display = "grid";

    if (openPage) openPage.href = bookingPageUrl();

    let hydrated = false;
    const hydrationGuard = setTimeout(() => {
      if (!hydrated) {
        loading.innerHTML =
          '<div class="text-zinc-300 text-sm text-center px-4">' +
          (isNorwegian()
            ? "Kunne ikke laste booking-widgeten. "
            : "Could not load the booking widget. ") +
          `<a class="text-fuchsia-200 underline" href="${bookingPageUrl()}" target="_blank" rel="noopener">` +
          (isNorwegian() ? "Åpne full bookingside" : "Open full booking page") +
          "</a>.</div>";
        loading.style.display = "grid";
      }
    }, 5000);

    ensureElfsightScript().then(() => {
      renderWidget();
      setTimeout(() => {
        hydrated = true;
        clearTimeout(hydrationGuard);
        loading.style.display = "none";
      }, 300);
    });

    setTimeout(() => {
      modal.querySelector("[data-close]")?.focus();
    }, 0);

    const u = new URL(location.href);
    if (u.hash !== "#book") {
      u.hash = "book";
      history.pushState({ book: true }, "", u);
    }
  }

  function closeModal({ fromPopState = false } = {}) {
    modal.classList.add("hidden");
    html.classList.remove("overflow-hidden");
    html.style.top = "";
    window.scrollTo(0, scrollY);

    slot.innerHTML = "";
    loading.style.display = "none";

    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    if (!fromPopState && location.hash === "#book") history.back();
  }

  openers.forEach((btn) => btn.addEventListener("click", openModal));

  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden") && e.key === "Escape") {
      closeModal();
    }
  });

  function shouldOpenFromUrl() {
    return (
      location.hash === "#book" ||
      new URLSearchParams(location.search).has("book")
    );
  }
  if (shouldOpenFromUrl()) openModal();

  window.addEventListener("popstate", () => {
    if (!modal.classList.contains("hidden")) {
      closeModal({ fromPopState: true });
    }
  });
})();
