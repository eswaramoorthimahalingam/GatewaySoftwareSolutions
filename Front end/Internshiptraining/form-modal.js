// Load the modal HTML into the page
fetch("form-modal.html")
  .then(response => response.text())
  .then(html => {
    // Add the modal HTML at the end of <body>
    document.body.insertAdjacentHTML("beforeend", html);

    // Once loaded, attach event listeners
    const modal = document.getElementById("gatewayFormModal");
    const openBtn = document.getElementById("openFormBtn");
    const closeBtn = document.getElementById("closeFormBtn");

    if (openBtn) {
      openBtn.onclick = function (e) {
        e.preventDefault();
        modal.style.display = "block";
      };
    }

    if (closeBtn) {
      closeBtn.onclick = function () {
        modal.style.display = "none";
      };
    }

    window.onclick = function (e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    };

    const form = document.getElementById("gatewayForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Form submitted successfully!");
        modal.style.display = "none";
      });
    }
  })
  .catch(err => console.error("Error loading form modal:", err));
