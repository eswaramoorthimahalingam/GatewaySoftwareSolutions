(function (win, doc) {
  const teamList = doc.getElementById("teamList");
  const sourceBadge = doc.getElementById("teamSourceBadge");
  const socialModal = doc.getElementById("socialModal");
  const closeModalButton = doc.getElementById("closeModal");
  const modalImage = doc.getElementById("modalImage");
  const modalName = doc.getElementById("modalName");
  const modalRole = doc.getElementById("modalRole");
  const modalSocialLinks = doc.getElementById("modalSocialLinks");
  const fallbackMembers = Array.isArray(win.gatewayTeamFallbackMembers) ? win.gatewayTeamFallbackMembers : [];
  const defaultImage = "/assets/gsslogo.png";
  const apiCandidates = [];

  let allTeamMembers = [];

  if (!teamList) {
    return;
  }

  if (typeof win.gatewayApi === "function") {
    apiCandidates.push(win.gatewayApi("/api/team"));
  } else {
    apiCandidates.push("/api/team");
  }

  if (Array.isArray(win.gatewayTeamApiFallbacks)) {
    win.gatewayTeamApiFallbacks.forEach(function (endpoint) {
      if (typeof endpoint === "string" && endpoint && !apiCandidates.includes(endpoint)) {
        apiCandidates.push(endpoint);
      }
    });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeText(value, fallback) {
    const normalized = String(value ?? "").trim();
    return normalized || fallback;
  }

  function normalizeSocialUrl(value) {
    const normalized = String(value ?? "").trim();
    return /^https?:\/\//i.test(normalized) ? normalized : "";
  }

  function normalizeMember(member, index) {
    return {
      id: normalizeText(member._id || member.id || member.slug, "member-" + index),
      name: normalizeText(member.name, "Team Member"),
      role: normalizeText(member.role, "Gateway Software Solutions"),
      image: normalizeText(member.image, defaultImage),
      linkedin: normalizeSocialUrl(member.linkedin),
      facebook: normalizeSocialUrl(member.facebook),
      instagram: normalizeSocialUrl(member.instagram)
    };
  }

  function setSourceBadge(message) {
    if (!sourceBadge) {
      return;
    }

    sourceBadge.hidden = !message;
    sourceBadge.textContent = message || "";
  }

  function renderTeamStatus(message, tone) {
    const toneClass = tone ? " is-" + tone : "";
    teamList.innerHTML = '<div class="team-status' + toneClass + '">' + escapeHtml(message) + "</div>";
  }

  function getImageUrl(imagePath) {
    if (!imagePath) {
      return defaultImage;
    }

    if (/^https?:\/\//i.test(imagePath) || imagePath.startsWith("/assets/")) {
      return imagePath;
    }

    if (typeof win.gatewayAsset === "function") {
      return win.gatewayAsset(imagePath);
    }

    return imagePath;
  }

  function buildSocialLinks(member) {
    const links = [];

    if (member.linkedin) {
      links.push('<a href="' + escapeHtml(member.linkedin) + '" class="social-link linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>');
    }
    if (member.facebook) {
      links.push('<a href="' + escapeHtml(member.facebook) + '" class="social-link facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>');
    }
    if (member.instagram) {
      links.push('<a href="' + escapeHtml(member.instagram) + '" class="social-link instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a>');
    }

    return links;
  }

  function renderTeamMembers(members) {
    allTeamMembers = members;
    teamList.innerHTML = members
      .map(function (member, index) {
        return [
          '<div class="col-md-6 col-lg-3">',
          '  <div class="team-member" data-index="' + index + '">',
          '    <div class="member-img">',
          '      <img src="' + escapeHtml(getImageUrl(member.image)) + '" alt="' + escapeHtml(member.name) + '" loading="lazy">',
          "    </div>",
          '    <div class="member-info">',
          '      <h4>' + escapeHtml(member.name) + "</h4>",
          '      <div class="member-role">' + escapeHtml(member.role) + "</div>",
          '      <button type="button" class="member-cta">View Profile <i class="fas fa-arrow-right"></i></button>',
          "    </div>",
          "  </div>",
          "</div>"
        ].join("");
      })
      .join("");
  }

  async function fetchTeamMembers() {
    for (const endpoint of apiCandidates) {
      try {
        const response = await fetch(endpoint, { cache: "no-store" });

        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }

        const payload = await response.json();
        const members = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.members)
            ? payload.members
            : null;

        if (!members) {
          throw new Error("Invalid team payload");
        }

        return members.map(normalizeMember);
      } catch (error) {
        console.warn("Failed to load team members from", endpoint, error);
      }
    }

    return null;
  }

  async function loadTeamMembers() {
    renderTeamStatus("Loading team members...", "loading");

    const liveMembers = await fetchTeamMembers();

    if (Array.isArray(liveMembers) && liveMembers.length) {
      setSourceBadge("");
      renderTeamMembers(liveMembers);
      return;
    }

    if (fallbackMembers.length) {
      setSourceBadge("Showing the published team snapshot.");
      renderTeamMembers(fallbackMembers.map(normalizeMember));
      return;
    }

    setSourceBadge("Team data is temporarily unavailable.");
    renderTeamStatus("Unable to load team members right now.", "error");
  }

  function openMemberModal(member) {
    modalImage.src = getImageUrl(member.image);
    modalImage.alt = member.name;
    modalName.textContent = member.name;
    modalRole.textContent = member.role;

    const links = buildSocialLinks(member);
    modalSocialLinks.innerHTML = links.length
      ? links.join("")
      : '<p class="social-empty">Public social profiles will be added soon.</p>';

    socialModal.classList.add("active");
  }

  function closeMemberModal() {
    socialModal.classList.remove("active");
  }

  doc.addEventListener("click", function (event) {
    const memberCard = event.target.closest(".team-member");
    if (!memberCard) {
      return;
    }

    const member = allTeamMembers[Number(memberCard.dataset.index)];
    if (!member) {
      return;
    }

    openMemberModal(member);
  });

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeMemberModal);
  }

  if (socialModal) {
    socialModal.addEventListener("click", function (event) {
      if (event.target === socialModal) {
        closeMemberModal();
      }
    });
  }

  doc.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && socialModal && socialModal.classList.contains("active")) {
      closeMemberModal();
    }
  });

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", loadTeamMembers);
  } else {
    loadTeamMembers();
  }
})(window, document);
