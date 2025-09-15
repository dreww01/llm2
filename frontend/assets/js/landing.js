// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") {
  html.classList.add("dark");
  sunIcon.classList.add("hidden");
  moonIcon.classList.remove("hidden");
}

darkModeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  } else {
    localStorage.setItem("theme", "light");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  }
});

// try now button
document.getElementById("tryNowBtn").addEventListener("click", () => {
  window.location.href = "./chat.html";
});

// start researching button
document.getElementById("startResearchingBtn").addEventListener("click", () => {
  window.location.href = "./chat.html";
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
