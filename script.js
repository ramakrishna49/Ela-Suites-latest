fetch("nav.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("nav-container").innerHTML = data;

      // Select elements AFTER navbar loads
      const toggle = document.querySelector(".mobile-toggle");
      const mobileMenu = document.querySelector(".mobile-menu");
      const items = document.querySelectorAll(".menu-item");

      // MOBILE TOGGLE
      if (toggle && mobileMenu) {
          toggle.addEventListener("click", () => {
              mobileMenu.style.display =
                  mobileMenu.style.display === "flex" ? "none" : "flex";
          });
      }

      // CLICK ACTIVATION
      items.forEach(item => {
          item.addEventListener("click", () => {
              setActive(item.dataset.target);
          });
      });

      // ---- AUTO ACTIVE ON PAGE LOAD ----
      function setActive(id) {
          items.forEach(i => i.classList.remove("active"));
          const activeItem = document.querySelector(`.menu-item[data-target="${id}"]`);
          if (activeItem) activeItem.classList.add("active");
      }

      // Detect current section from URL hash
      let current = window.location.hash.replace("#", "");
      if (!current) current = "home";  // default page

      setActive(current);
  });

// Load FOOTER
fetch("footer.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("footer-container").innerHTML = data;
  });

 
// Desktop bubbles redirect to pages
document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {
        const url = item.dataset.link;
        if (url) window.location.href = url;
    });
});

// Mobile toggle
document.querySelector(".mobile-toggle").addEventListener("click", () => {
    const menu = document.querySelector(".mobile-menu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
});

/* NAV REDIRECT */
document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {
        let page = item.dataset.link;
        if (page) window.location.href = page;
    });
});


// Mobile Menu with Flip X Animation
document.getElementById("mobileToggle").addEventListener("click", function () {
    const menu = document.getElementById("mobileMenu");
    const toggle = document.getElementById("mobileToggle");

    menu.classList.toggle("active");
    toggle.classList.toggle("active");

    // Auto-close when clicking a link
    document.querySelectorAll("#mobileMenu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            toggle.classList.remove("active");
        });
    });
});


