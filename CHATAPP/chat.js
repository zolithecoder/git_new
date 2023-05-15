// Get DOM elements
const chatContainer = document.getElementById("chat-container");
const chatForm = document.getElementById("chat-form");
const chatMessage = document.getElementById("chat-message");

// Initialize empty messages array
let messages = [];

function renderMessages() {
  // Clear chat container
  chatContainer.innerHTML = "";

  // Loop through messages and append to chat container
  for (let message of messages) {
    const messageDiv = document.createElement("div");
    const timestamp = message.split(" - ")[0];
    const content = message.split(" - ")[1];
    messageDiv.innerHTML = `<span class="timestamp">${timestamp}</span> ${content}`;
    chatContainer.appendChild(messageDiv);
  }

  // Scroll to bottom of chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;
}


function handleSubmit(event) {
  event.preventDefault();
  const message = chatMessage.value.trim();
  if (message !== "") {
    const timestamp = new Date().toLocaleTimeString();
    const messageWithTime = `${timestamp} - ${message}`; // Add timestamp to message
    messages.push(messageWithTime);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    renderMessages();
    chatMessage.value = "";
  }
}


// Add event listener to form submission
chatForm.addEventListener("submit", handleSubmit);

// Get messages from local storage on page load
const storedMessages = localStorage.getItem("chatMessages");
if (storedMessages !== null) {
  messages = JSON.parse(storedMessages);
}

// Initial render of messages
renderMessages();
