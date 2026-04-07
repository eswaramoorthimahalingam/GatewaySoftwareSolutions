(function (win, doc) {
  function revealAosElements() {
    doc.querySelectorAll("[data-aos]").forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
      element.style.visibility = "visible";
    });
  }

  function initAos() {
    if (win.AOS && typeof win.AOS.init === "function") {
      win.AOS.init({ duration: 1000, once: true });
      return;
    }

    revealAosElements();
  }

  function initScrollProgress() {
    const progress = doc.getElementById("progress");
    if (!progress) return;

    const updateProgress = () => {
      const scrollableHeight =
        doc.documentElement.scrollHeight - win.innerHeight;
      const ratio = scrollableHeight > 0 ? win.scrollY / scrollableHeight : 0;
      progress.style.transform = `scaleX(${Math.max(0, Math.min(ratio, 1))})`;
    };

    updateProgress();
    win.addEventListener("scroll", updateProgress, { passive: true });
  }

  function initNavbarState() {
    const updateNavbar = () => {
      const navbar = doc.querySelector(".navbar");
      if (!navbar) return;
      navbar.classList.toggle("scrolled", win.scrollY > 50);
    };

    updateNavbar();
    win.addEventListener("scroll", updateNavbar, { passive: true });
  }

  function initModal() {
    const modal = doc.getElementById("gatewayFormModal");
    const openButton = doc.getElementById("openFormBtn");
    const closeButton = doc.getElementById("closeFormBtn");

    if (!modal || !openButton) return;

    openButton.addEventListener("click", (event) => {
      event.preventDefault();
      modal.style.display = "block";
      doc.body.style.overflow = "hidden";
    });

    const closeModal = () => {
      modal.style.display = "none";
      doc.body.style.overflow = "";
    };

    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    doc.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.style.display === "block") {
        closeModal();
      }
    });
  }

  doc.addEventListener("DOMContentLoaded", () => {
    initAos();
    initScrollProgress();
    initNavbarState();
    initModal();
  });
})(window, document);
