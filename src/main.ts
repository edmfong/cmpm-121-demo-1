import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fishy Fish Fish";
let fish: number = 0;
let lastTimestamp: number = 0; // Keeps track of the last frame's timestamp

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a new button element
const button = document.createElement("button");

// Set button text and other properties
button.textContent = "🐟";

// Append the button to the #app div instead of the body
app.appendChild(button);

// Event Listener when button is pressed
button.addEventListener("click", () => {
  fish++;
  counterDisplay.textContent = `Fish: ${fish.toFixed(0)}`; // Update counter display with 0 decimal places
});

// Update counter on display
const counterDisplay = document.getElementById(
  "counterDisplay",
) as HTMLDivElement;

// Automatically increment fish every 1 second
// setInterval(() => {
//   fish++;
//   counterDisplay.textContent = `Fish: ${fish}`;
// }, 1000);

// Function to increment the fish counter based on elapsed time
const updateCounter = (timestamp: number) => {
  if (!lastTimestamp) lastTimestamp = timestamp;

  const elapsed = timestamp - lastTimestamp; // Time elapsed since last frame
  const increment = elapsed / 1000; // Increment by a fraction based on time (1 unit per second)

  fish += increment;
  counterDisplay.textContent = `Fish: ${fish.toFixed(0)}`; // Update counter display with 0 decimal places

  lastTimestamp = timestamp; // Update the last timestamp
  requestAnimationFrame(updateCounter); // Call the next animation frame
};

// Start the animation loop
requestAnimationFrame(updateCounter);
