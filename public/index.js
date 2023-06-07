// Connect to the server
const socket = io();

// Event listener for initial count
socket.on("initialCount", (count) => {
  console.log("Initial count:", count);
  document.querySelector("#clientCount").innerText = 0;
});

// Event listener for count updates
socket.on("countUpdated", (count) => {
  console.log("Updated count:", count);
  document.querySelector("#clientCount").innerText = count;
});

// Event listener for sending Messages
document.querySelector("#sendBtn").addEventListener("click", () => {
    if (document.querySelector("#userInput").value.length != 0) {
        socket.emit("sendMSG", document.querySelector("#userInput").value)
    }
    document.querySelector("#userInput").value = "";
})

// Event listener for updating messages
socket.on("msgUpdate", (msg) => {
    console.log("Message:", msg)
    document.querySelector(".chatbox").innerHTML += `<p>${msg}</p>`
})