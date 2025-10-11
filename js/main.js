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
});
