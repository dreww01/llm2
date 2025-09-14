// Theme Toggle
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  toggleBtn.textContent = document.documentElement.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

const chatContainer = document.getElementById("chatContainer");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const loadingDots = document.getElementById("loadingDots");

let typingInterval = null;
let isGenerating = false;

// Typewriter effect
function typeWriterEffect(container, text, speed = 30, callback) {
  let i = 0;
  typingInterval = setInterval(() => {
    container.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typingInterval);
      typingInterval = null;
      isGenerating = false;
      updateSendBtn("send");
      if (callback) callback();
    }
  }, speed);
}

// Update Send ↔ Stop button
function updateSendBtn(state) {
  if (state === "send") {
    sendBtn.textContent = "➤"; // modern send icon
  } else {
    sendBtn.textContent = "■"; // stop icon
  }
}

// Add bot message with regenerate link
function addBotMessage(text) {
  const botMsg = document.createElement("div");
  botMsg.className = "flex flex-col items-start space-y-1";

  const bubble = document.createElement("div");
  bubble.className =
    "p-3 rounded-2xl bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-w-lg";
  botMsg.appendChild(bubble);

  chatContainer.appendChild(botMsg);

  // Remove any existing regenerate links
  const oldRegens = chatContainer.querySelectorAll(".regen-link");
  oldRegens.forEach((el) => el.remove());

  // Typing effect
  typeWriterEffect(bubble, text, 15, () => {
    // Add regenerate link after finishing typing
    const regen = document.createElement("div");
    regen.className =
      "regen-link text-xs text-gray-500 dark:text-gray-400 hover:underline cursor-pointer ml-2";
    regen.textContent = "↻ Regenerate response";

    regen.addEventListener("click", () => {
      bubble.textContent = "";
      typeWriterEffect(bubble, text + " (regenerated)", 15);
    });

    botMsg.appendChild(regen);
  });

  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
}

// Handle send button click
sendBtn.addEventListener("click", () => {
  if (isGenerating) {
    // Stop typing
    clearInterval(typingInterval);
    typingInterval = null;
    isGenerating = false;
    updateSendBtn("send");
    return;
  }

  const text = userInput.value.trim();
  if (!text) return;

  // User bubble
  const userMsg = document.createElement("div");
  userMsg.className = "flex items-start justify-end space-x-3";
  userMsg.innerHTML = `<div class="p-3 rounded-2xl bg-brand-light text-white max-w-lg">${text}</div>`;
  chatContainer.appendChild(userMsg);

  userInput.value = "";
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Show loading dots
  const loadingClone = loadingDots.cloneNode(true);
  loadingClone.id = "";
  loadingClone.classList.remove("hidden");
  chatContainer.appendChild(loadingClone);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Fake bot reply after delay
  setTimeout(() => {
    loadingClone.remove(); // remove loading
    isGenerating = true;
    updateSendBtn("stop");
    addBotMessage(
      "This is a placeholder reply from the Gemini backend. In the final version, this area will display detailed responses to your queries, with citations, structured explanations, and context-aware insights designed to support your research."
    );
  }, 1500);
});
