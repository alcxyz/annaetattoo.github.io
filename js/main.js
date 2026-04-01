// --- Google Analytics Logic ---
const GA_MEASUREMENT_ID = "G-P673MVE8MX";
const TRACKED_HOSTS = new Set(["annae.tattoo", "www.annae.tattoo"]);

function trackEvent(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

(function initGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || !TRACKED_HOSTS.has(window.location.hostname)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src =
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_path: window.location.pathname + window.location.search,
    page_location: window.location.href,
  });
})();

// --- Google Analytics Event Tracking Logic ---
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;

  const href = link.getAttribute("href") || "";
  const normalizedHref = href.toLowerCase();
  const linkText =
    link.textContent.trim() || link.getAttribute("aria-label") || href;

  let eventName = null;

  if (normalizedHref.startsWith("tel:")) {
    eventName = "phone_click";
  } else if (normalizedHref.startsWith("sms:")) {
    eventName = "sms_click";
  } else if (normalizedHref.startsWith("mailto:")) {
    eventName = "email_click";
  } else if (
    normalizedHref === "/msg" ||
    normalizedHref.includes("wa.me/") ||
    normalizedHref.includes("whatsapp")
  ) {
    eventName = "whatsapp_click";
  } else if (
    normalizedHref === "/ig" ||
    normalizedHref.includes("instagram.com/")
  ) {
    eventName = "instagram_click";
  } else if (
    normalizedHref.includes("m.me/") ||
    normalizedHref.includes("messenger.com/")
  ) {
    eventName = "messenger_click";
  } else if (
    normalizedHref === "/fb" ||
    normalizedHref.includes("facebook.com/")
  ) {
    eventName = "facebook_click";
  } else if (normalizedHref === "/review") {
    eventName = "review_click";
  } else if (
    normalizedHref === "/map" ||
    normalizedHref.includes("google.com/maps") ||
    normalizedHref.includes("maps.google.")
  ) {
    eventName = "map_click";
  } else if (normalizedHref.startsWith("/gdrive/contract/")) {
    eventName = "contract_click";
  }

  if (!eventName) return;

  trackEvent(eventName, {
    link_text: linkText,
    link_url: link.href,
    page_path: window.location.pathname + window.location.search,
  });
});

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

// --- Calculator Modal ---
(function calculatorModal() {
  const modal = document.getElementById("calculator-modal");
  if (!modal) return;

  const html = document.documentElement;
  const openers = document.querySelectorAll("[data-calculator]");
  const closers = modal.querySelectorAll("[data-close]");

  let lastFocus = null;
  let scrollY = 0;

  function openModal() {
    lastFocus = document.activeElement;
    scrollY = window.scrollY;
    html.style.top = `-${scrollY}px`;
    html.classList.add("overflow-hidden");
    modal.classList.remove("hidden");
    trackEvent("calculator_open", {
      page_path: window.location.pathname + window.location.search,
    });
    setTimeout(() => {
      modal.querySelector("[data-close]")?.focus();
    }, 0);
  }

  function closeModal() {
    modal.classList.add("hidden");
    html.classList.remove("overflow-hidden");
    html.style.top = "";
    window.scrollTo(0, scrollY);
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  openers.forEach((btn) => btn.addEventListener("click", openModal));
  closers.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
})();

// --- Booking Modal (simple, no widget logic) ---
(function bookingModal() {
  const modal = document.getElementById("booking-modal");
  if (!modal) return;

  const html = document.documentElement;
  const openers = document.querySelectorAll("[data-booking]");
  const closers = modal.querySelectorAll("[data-close]");

  let lastFocus = null;
  let scrollY = 0;

  function openModal() {
    lastFocus = document.activeElement;
    scrollY = window.scrollY;

    // Lock background scroll
    html.style.top = `-${scrollY}px`;
    html.classList.add("overflow-hidden");

    modal.classList.remove("hidden");

    trackEvent("booking_open", {
      page_path: window.location.pathname + window.location.search,
    });

    // Move focus into modal
    setTimeout(() => {
      modal.querySelector("[data-close]")?.focus();
    }, 0);
  }

  function closeModal() {
    modal.classList.add("hidden");

    // Restore scroll
    html.classList.remove("overflow-hidden");
    html.style.top = "";
    window.scrollTo(0, scrollY);

    // Restore focus
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  // Openers
  openers.forEach((btn) => btn.addEventListener("click", openModal));

  // Close on any [data-close] (overlay + X button)
  closers.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // Close on ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
})();
