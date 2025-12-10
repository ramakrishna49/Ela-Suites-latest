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

/* Auto open in 2 seconds */
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("chatWindow").classList.add("open");
    }, 2000);
});

/* Enter key */
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

    setTimeout(() => botReply(msg), 1400);
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

/* ==========================
     🔥 MAIN AI REPLY SYSTEM
   ========================== */
function botReply(userText) {
    removeTyping();
    userText = userText.toLowerCase();
    let reply = "";

    // Rooms & Pricing
    if (userText.includes("price") || userText.includes("room") || userText.includes("rates"))
        reply = "Our rooms start from ₹2499. Deluxe, Premium & Suite rooms available.";

    else if (userText.includes("deluxe"))
        reply = "Deluxe Room includes AC, WiFi, work desk, hot water & 32-inch TV.";

    else if (userText.includes("suite"))
        reply = "Suite rooms include living area, premium bed, minibar & large TV.";

    // Amenities
    else if (userText.includes("amenities") || userText.includes("facilities"))
        reply = "We offer: WiFi, AC, TV, workspace, breakfast, laundry, parking & 24/7 helpdesk.";

    else if (userText.includes("wifi"))
        reply = "Yes, Free high-speed WiFi (100 Mbps).";

    else if (userText.includes("parking"))
        reply = "Yes! Free on-site secure parking available for all guests.";

    else if (userText.includes("laundry"))
        reply = "Laundry service is available from 8 AM – 8 PM.";

    // Booking
    else if (userText.includes("book") || userText.includes("booking"))
        reply = `
            You can book your stay through:<br><br>
            👉 <a href='https://booking.com' target='_blank'>Booking.com</a><br>
            👉 <a href='https://makemytrip.com' target='_blank'>MakeMyTrip</a><br>
            👉 <a href='https://agoda.com' target='_blank'>Agoda</a>
        `;

    // Food
    else if (userText.includes("breakfast"))
        reply = "Complimentary breakfast is served 7 AM – 10 AM.";

    else if (userText.includes("food") || userText.includes("dinner"))
        reply = "In-room dining available from 7 AM – 10 PM.";

    // Policies
    else if (userText.includes("check in") || userText.includes("checkin"))
        reply = "Check-in: 12 PM | Check-out: 11 AM.";

    else if (userText.includes("early"))
        reply = "Early check-in depends on availability. Extra charge before 9 AM.";

    else if (userText.includes("late"))
        reply = "Late checkout allowed till 2 PM (extra charge). After that full-day charge.";

    else if (userText.includes("cancel"))
        reply = "Free cancellation up to 24 hours before check-in.";

    else if (userText.includes("refund"))
        reply = "Refunds depend on booking platform policy (Booking.com/MMT).";

    else if (userText.includes("id"))
        reply = "Valid ID required: Aadhaar, Passport, Driving License.";

    else if (userText.includes("local"))
        reply = "Yes, local guests are allowed with valid Government ID proof.";

    else if (userText.includes("couple"))
        reply = "Yes, we are couple-friendly. Both guests must show valid ID.";

    else if (userText.includes("pet"))
        reply = "Sorry, pets are not allowed.";

    // Transport
    else if (userText.includes("airport") || userText.includes("pickup"))
        reply = "Airport pickup can be arranged (extra charge).";

    // Contact
    else if (userText.includes("phone") || userText.includes("contact"))
        reply = "You can reach us at: 📞 +91 98765 43210";

    // Default
    else
        reply = "I can help with rooms, pricing, booking, food, WiFi, check-in, location, or policies. Ask me anything! 😊";

    addBotMsg(reply);
}

function addBotMsg(text) {
    let chat = document.getElementById("chatBody");
    chat.innerHTML += `<div class="bot-msg">${text}</div>`;
    chat.scrollTop = chat.scrollHeight;
}
