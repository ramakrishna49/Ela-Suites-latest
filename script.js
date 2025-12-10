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


function toggleChat() {
    document.getElementById("chatWindow").classList.toggle("open");
}

function sendOnEnter(e) {
    if (e.key === "Enter") sendMessage();
}

function sendMessage() {
    let input = document.getElementById("userInput");
    let msg = input.value.trim();
    if (msg === "") return;

    addUserMsg(msg);
    input.value = "";

    showTyping();

    setTimeout(() => {
        botReply(msg);
    }, 1400);
}

function addUserMsg(text) {
    let chat = document.getElementById("chatBody");
    chat.innerHTML += `<div class="user-msg">${text}</div>`;
    chat.scrollTop = chat.scrollHeight;
}

function showTyping() {
    let chat = document.getElementById("chatBody");
    chat.innerHTML += `<div class="typing" id="typing">Assistant is typing...</div>`;
    chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
    let typing = document.getElementById("typing");
    if (typing) typing.remove();
}

function botReply(userText) {
    removeTyping();
    userText = userText.toLowerCase();

    let reply = "";

    // === ROOMS & PRICING ===
    if (userText.includes("room") || userText.includes("price") || userText.includes("cost")) {
        reply = "Our rooms start from ₹2499 per night. Deluxe, Premium & Suite options are available.";
    }

    // === LOCATION ===
    else if (userText.includes("location") || userText.includes("where")) {
        reply = "We are located in HITEC City, Hyderabad — near major tech parks & shopping centers.";
    }

    // === CHECK-IN ===
    else if (userText.includes("check in") || userText.includes("check-in")) {
        reply = "Check-in time is 12 PM and check-out time is 11 AM.";
    }

    // === WIFI ===
    else if (userText.includes("wifi") || userText.includes("internet")) {
        reply = "Yes! We offer high-speed complimentary WiFi throughout the property.";
    }

    // === PARKING ===
    else if (userText.includes("parking") || userText.includes("car")) {
        reply = "We provide secure on-site parking for all guests at no additional cost.";
    }

    // === BREAKFAST / FOOD ===
    else if (userText.includes("breakfast") || userText.includes("food") || userText.includes("menu")) {
        reply = "Yes! Complimentary breakfast is included. We also offer room dining from 7 AM to 10 PM.";
    }

    // === CANCELATION POLICY ===
    else if (userText.includes("cancel") || userText.includes("cancellation")) {
        reply = "Free cancellation up to 24 hours before check-in. After that, charges may apply.";
    }

    // === PETS ===
    else if (userText.includes("pet") || userText.includes("pets")) {
        reply = "Unfortunately, pets are not allowed at our property.";
    }

    // === POOL ===
    else if (userText.includes("pool") || userText.includes("swim")) {
        reply = "We do not have a swimming pool, but we offer premium comfortable stays with great amenities.";
    }

    // === GYM ===
    else if (userText.includes("gym") || userText.includes("fitness")) {
        reply = "Yes! We have a modern gym equipped with treadmill, weights & cardio machines.";
    }

    // === OFFERS ===
    else if (userText.includes("offer") || userText.includes("discount")) {
        reply = "🎉 Ongoing Offer: Book for 3 nights & get 10% OFF. Terms apply!";
    }

    // === COUPLE FRIENDLY ===
    else if (userText.includes("couple") || userText.includes("unmarried")) {
        reply = "Yes, we are 100% couple-friendly. Valid ID proof is required for both guests.";
    }

    // === AIRPORT PICKUP ===
    else if (userText.includes("airport") || userText.includes("pickup") || userText.includes("cab")) {
        reply = "Yes, airport pickup can be arranged on request (extra charges apply).";
    }

    // === CONTACT NUMBER ===
    else if (userText.includes("phone") || userText.includes("contact") || userText.includes("number")) {
        reply = "You can reach us at: 📞 +91 98765 43210";
    }

    // === ROOM AVAILABILITY ===
    else if (userText.includes("available") || userText.includes("availability")) {
        reply = "Room availability changes quickly — you can check live availability via Booking.com or MakeMyTrip.";
    }

    // === BOOKING LINKS ===
    else if (userText.includes("book") || userText.includes("booking")) {
        reply = `
            You can book your stay through:<br><br>
            👉 <a href='https://booking.com' target='_blank'>Booking.com</a><br>
            👉 <a href='https://makemytrip.com' target='_blank'>MakeMyTrip</a><br>
            👉 <a href='https://agoda.com' target='_blank'>Agoda</a>
        `;
    }

    // === DEFAULT REPLY ===
    else {
        reply = "I'm here to help! You can ask about rooms, pricing, location, check-in, WiFi, parking, gym, food, or booking.";
    }

    addBotMsg(reply);
}

function addBotMsg(text) {
    let chat = document.getElementById("chatBody");
    chat.innerHTML += `<div class="bot-msg">${text}</div>`;
    chat.scrollTop = chat.scrollHeight;
}
// Auto open chatbot after 2 seconds
window.addEventListener("load", function () {
    setTimeout(() => {
        document.getElementById("chatWindow").classList.add("open");
    }, 2000); // 2000ms = 2 seconds
});
