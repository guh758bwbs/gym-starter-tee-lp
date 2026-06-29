"use strict";

const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".global-nav a");

if(navToggle) {
  navToggle.addEventListener("click", ()=> {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".faq-item").forEach((item) => {
  const button = item.querySelector("button");
  const panel = item.querySelector(".faq-panel");
  const symbol = button.querySelector("span");

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      const otherButton = otherItem.querySelector("button");
      const otherPanel = otherItem.querySelector(".faq-panel");
      const otherSymbol = otherButton.querySelector("span");
      otherButton.setAttribute("aria-expanded", "false");
      otherPanel.style.maxHeight = null;
      otherSymbol.textContent = "＋";
    });

    if(!isOpen) {
      button.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      symbol.textContent = "−";
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 } 
  );

  revealItems.forEach((item) => observer.observe(item)); 
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");
    const originalText = button.textContent;

    button.textContent = "送信しました";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      contactForm.reset();
    }, 1800);
   });
}
