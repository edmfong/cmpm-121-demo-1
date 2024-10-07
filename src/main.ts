import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fishy Fish Fish";
let fish: number = 0;

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
  console.log("pressed");
  fish++;
  counterDisplay.textContent = `Fish: ${fish}`;
});

// Update counter on display
const counterDisplay = document.getElementById(
  "counterDisplay",
) as HTMLDivElement;
