import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const upgrades: HTMLDivElement = document.querySelector("#upgrades")!;

const gameName = "Fishy Fish Fish";
let fish: number = 0;
let fishPerClick: number = 1;
let fishPerSecond: number = 0;
let upgrade1Cost: number = 10;
let upgrade2Cost: number = 50;
let lastTimestamp: number = 0; // Keeps track of the last frame's timestamp

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// main button
const button = document.createElement("button");
button.textContent = "🐟";
app.appendChild(button);

// Event Listener when button is pressed
button.addEventListener("click", () => {
  fish += fishPerClick;
  counterDisplay.textContent = `Fish: ${fish.toFixed(0)}`; // Update counter display with 0 decimal places
});

// upgrade1 button
const upgrade1Button = document.createElement("button");
upgrade1Button.innerHTML = `Fish Per Click<br>${upgrade1Cost}x 🐟`;
upgrade1Button.disabled = true;
upgrade1Button.classList.add("upgradeButton-NotUpgradable");  // Assign a CSS class
upgrades.appendChild(upgrade1Button);

// Function to check if the upgrade is available
function checkUpgrade1Availability() {
  if (fish >= upgrade1Cost) {
    upgrade1Button.disabled = false;  // Enable the button
    upgrade1Button.classList.remove("upgradeButton-NotUpgradable");
    upgrade1Button.classList.add("upgradeButton-Upgradable");
  }
  else {
    upgrade1Button.disabled = true;  // Enable the button
    upgrade1Button.classList.add("upgradeButton-NotUpgradable");
    upgrade1Button.classList.remove("upgradeButton-Upgradable");
  }
}

// Event Listener when button is pressed
upgrade1Button.addEventListener("click", () => {
  if (!upgrade1Button.disabled) {
    fishPerClick++;
    fish -= upgrade1Cost;
    upgrade1Cost *= 2;
    upgrade1Button.innerHTML = `Fish Per Click<br>${upgrade1Cost}x 🐟`;
  }
});

// upgrade2 button
const upgrade2Button = document.createElement("button");
upgrade2Button.innerHTML = `Fish Per Sec<br>${upgrade2Cost}x 🐟`;
upgrade2Button.disabled = true;
upgrade2Button.classList.add("upgradeButton-NotUpgradable");  // Assign a CSS class
upgrades.appendChild(upgrade2Button);

// Function to check if the upgrade is available
function checkUpgrade2Availability() {
  if (fish >= upgrade2Cost) {
    upgrade2Button.disabled = false;  // Enable the button
    upgrade2Button.classList.remove("upgradeButton-NotUpgradable");
    upgrade2Button.classList.add("upgradeButton-Upgradable");
  }
  else {
    upgrade2Button.disabled = true;  // Enable the button
    upgrade2Button.classList.add("upgradeButton-NotUpgradable");
    upgrade2Button.classList.remove("upgradeButton-Upgradable");
  }
}

// Event Listener when button is pressed
upgrade2Button.addEventListener("click", () => {
  if (!upgrade2Button.disabled) {
    if (fishPerSecond == 0) {
      fishPerSecond = 1;
    }
    else {
      fishPerSecond *= 2;
    }
    fish -= upgrade2Cost;
    upgrade2Cost *= 2;
    upgrade2Button.innerHTML = `Fish Per Sec<br>${upgrade2Cost}x 🐟`;
  }
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

  fish += increment * fishPerSecond;
  counterDisplay.textContent = `Fish: ${fish.toFixed(0)}`; // Update counter display with 0 decimal places

  lastTimestamp = timestamp; // Update the last timestamp
  requestAnimationFrame(updateCounter); // Call the next animation frame
  checkUpgrade1Availability();
  checkUpgrade2Availability();
};

// Start the animation loop
requestAnimationFrame(updateCounter);
