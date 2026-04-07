(function (win, doc) {
  function attachMobileNavInteractions(root) {
    const menuToggle = root.querySelector(".mobile-menu-toggle");
    const navMenu = root.querySelector(".mobile-nav-menu");
    const dropdownButtons = root.querySelectorAll(".dropdown-btn");

    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!expanded));
      });
    }

    dropdownButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const parent = button.closest(".mobile-dropdown");
        if (parent) {
          parent.classList.toggle("active");
        }
      });
    });
  }

  function setMenuMarkup(container, menus) {
    if (!container) return;

    container.innerHTML = menus
      .map(
        (menu) => `
          <li>
            <a class="dropdown-item" href="/Internshiptraining/${menu.path}">
              ${menu.name}
            </a>
          </li>
        `
      )
      .join("");
  }

  async function loadInternshipMenus(root) {
    const mobileContainer = root.querySelector("#internshipDropdown");
    const desktopContainer = root.querySelector("#dynamicInternMenus");

    if (mobileContainer) {
      mobileContainer.innerHTML =
        '<li><span class="dropdown-item text-muted">Loading...</span></li>';
    }

    if (desktopContainer) {
      desktopContainer.innerHTML =
        '<li><span class="dropdown-item text-muted">Loading...</span></li>';
    }

    try {
      const response = await fetch(gatewayApi("/api/menus"));
      const menus = await response.json();
      const safeMenus = Array.isArray(menus) ? menus : [];

      if (!safeMenus.length) {
        const emptyMarkup =
          '<li><span class="dropdown-item text-muted">No menus found</span></li>';
        if (mobileContainer) mobileContainer.innerHTML = emptyMarkup;
        if (desktopContainer) desktopContainer.innerHTML = emptyMarkup;
        return;
      }

      setMenuMarkup(mobileContainer, safeMenus);
      setMenuMarkup(desktopContainer, safeMenus);
    } catch (error) {
      console.error("Failed to load internship menus:", error);
      const failureMarkup =
        '<li><span class="dropdown-item text-danger">Failed to load menus</span></li>';
      if (mobileContainer) mobileContainer.innerHTML = failureMarkup;
      if (desktopContainer) desktopContainer.innerHTML = failureMarkup;
    }
  }

  win.loadGatewayNavbar = async function loadGatewayNavbar(navPath) {
    const header = doc.getElementById("header");
    if (!header) return;

    try {
      const response = await fetch(navPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${navPath}: ${response.status}`);
      }

      header.innerHTML = await response.text();
      attachMobileNavInteractions(header);
      await loadInternshipMenus(header);
    } catch (error) {
      console.error("Header load error:", error);
    }
  };
})(window, document);
