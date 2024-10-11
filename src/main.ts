import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const upgrades: HTMLDivElement = document.querySelector("#upgrades")!;

const gameName = "Fishy Fish Fish";
let fish: number = 0;
let fishPerClick: number = 1;
let fishPerSecond1: number = 0;
let fishPerSecond2: number = 0;
let fishPerSecond3: number = 0;
let upgrade0Cost: number = 10;
let upgrade1Cost: number = 10;
let upgrade2Cost: number = 100;
let upgrade3Cost: number = 1000;
let fishPerClickUpgrades: number = 0;
let fishPerSec1Upgrades: number = 0;
let fishPerSec2Upgrades: number = 0;
let fishPerSec3Upgrades: number = 0;
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

// upgrade0 button
const upgrade0Button = document.createElement("button");
const rightDivUpgrade0 = document.createElement("div");
rightDivUpgrade0.innerHTML = `Fish Per Click<br>${upgrade0Cost}x 🐟`;
const leftDivUpgrade0 = document.createElement("div");
leftDivUpgrade0.textContent = `${fishPerClickUpgrades}`;
upgrade0Button.appendChild(rightDivUpgrade0);
upgrade0Button.appendChild(leftDivUpgrade0);
upgrade0Button.disabled = true;
upgrade0Button.classList.add("upgradeButton-NotUpgradable"); // Assign a CSS class
upgrades.appendChild(upgrade0Button);

// Function to check if the upgrade0 is available
function checkUpgrade0Availability() {
  if (fish >= upgrade0Cost) {
    upgrade0Button.disabled = false; // Enable the button
    upgrade0Button.classList.remove("upgradeButton-NotUpgradable");
    upgrade0Button.classList.add("upgradeButton-Upgradable");
  } else {
    upgrade0Button.disabled = true; // Enable the button
    upgrade0Button.classList.add("upgradeButton-NotUpgradable");
    upgrade0Button.classList.remove("upgradeButton-Upgradable");
  }
}

// Event Listener when button is pressed
upgrade0Button.addEventListener("click", () => {
  if (!upgrade0Button.disabled) {
    fishPerClick++;
    fishPerClickUpgrades++;
    fish -= upgrade0Cost;
    upgrade0Cost *= 2;
    rightDivUpgrade0.innerHTML = `Fish Per Click<br>${upgrade0Cost}x 🐟`;
    leftDivUpgrade0.textContent = `${fishPerClickUpgrades}`;
  }
});

// upgrade1 button
const upgrade1Button = document.createElement("button");
const rightDivUpgrade1 = document.createElement("div");
rightDivUpgrade1.innerHTML = `Fish Per Sec<br>${upgrade1Cost}x 🐟`;
const leftDivUpgrade1 = document.createElement("div");
leftDivUpgrade1.textContent = `${fishPerSecond1}`;
upgrade1Button.appendChild(rightDivUpgrade1);
upgrade1Button.appendChild(leftDivUpgrade1);
upgrade1Button.disabled = true;
upgrade1Button.classList.add("upgradeButton-NotUpgradable"); // Assign a CSS class
upgrades.appendChild(upgrade1Button);

// Function to check if the upgrade is available
function checkUpgrade1Availability() {
  if (fish >= upgrade1Cost) {
    upgrade1Button.disabled = false; // Enable the button
    upgrade1Button.classList.remove("upgradeButton-NotUpgradable");
    upgrade1Button.classList.add("upgradeButton-Upgradable");
  } else {
    upgrade1Button.disabled = true; // Enable the button
    upgrade1Button.classList.add("upgradeButton-NotUpgradable");
    upgrade1Button.classList.remove("upgradeButton-Upgradable");
  }
}

// Event Listener when button is pressed
upgrade1Button.addEventListener("click", () => {
  if (!upgrade1Button.disabled) {
    if (fishPerSecond1 == 0) {
      fishPerSecond1 = 1;
    } else {
      fishPerSecond1 *= 2;
    }
    fish -= upgrade1Cost;
    upgrade1Cost *= 2;
    fishPerSec1Upgrades++;
    rightDivUpgrade1.innerHTML = `Fish Per Sec<br>${upgrade1Cost}x 🐟`;
    leftDivUpgrade1.textContent = `${fishPerSec1Upgrades}`;
  }
});

// upgrade2 button
const upgrade2Button = document.createElement("button");
const rightDivUpgrade2 = document.createElement("div");
rightDivUpgrade2.innerHTML = `Fish Per Sec<br>${upgrade2Cost}x 🐟`;
const leftDivUpgrade2 = document.createElement("div");
leftDivUpgrade2.textContent = `${fishPerSecond2}`;
upgrade2Button.appendChild(rightDivUpgrade2);
upgrade2Button.appendChild(leftDivUpgrade2);
upgrade2Button.disabled = true;
upgrade2Button.classList.add("upgradeButton-NotUpgradable"); // Assign a CSS class
upgrades.appendChild(upgrade2Button);

// Function to check if the upgrade is available
function checkUpgrade2Availability() {
  if (fish >= upgrade2Cost) {
    upgrade2Button.disabled = false; // Enable the button
    upgrade2Button.classList.remove("upgradeButton-NotUpgradable");
    upgrade2Button.classList.add("upgradeButton-Upgradable");
  } else {
    upgrade2Button.disabled = true; // Enable the button
    upgrade2Button.classList.add("upgradeButton-NotUpgradable");
    upgrade2Button.classList.remove("upgradeButton-Upgradable");
  }
}

// Event Listener when button is pressed
upgrade2Button.addEventListener("click", () => {
  if (!upgrade2Button.disabled) {
    if (fishPerSecond2 == 0) {
      fishPerSecond2 = 5;
    } else {
      fishPerSecond2 *= 2;
    }
    fish -= upgrade2Cost;
    upgrade2Cost *= 2;
    fishPerSec2Upgrades++;
    rightDivUpgrade2.innerHTML = `Fish Per Sec<br>${upgrade2Cost}x 🐟`;
    leftDivUpgrade2.textContent = `${fishPerSec2Upgrades}`;
  }
});

// upgrade3 button
const upgrade3Button = document.createElement("button");
const rightDivUpgrade3 = document.createElement("div");
rightDivUpgrade3.innerHTML = `Fish Per Sec<br>${upgrade3Cost}x 🐟`;
const leftDivUpgrade3 = document.createElement("div");
leftDivUpgrade3.textContent = `${fishPerSecond3}`;
upgrade3Button.appendChild(rightDivUpgrade3);
upgrade3Button.appendChild(leftDivUpgrade3);
upgrade3Button.disabled = true;
upgrade3Button.classList.add("upgradeButton-NotUpgradable"); // Assign a CSS class
upgrades.appendChild(upgrade3Button);

// Function to check if the upgrade is available
function checkUpgrade3Availability() {
  if (fish >= upgrade3Cost) {
    upgrade3Button.disabled = false; // Enable the button
    upgrade3Button.classList.remove("upgradeButton-NotUpgradable");
    upgrade3Button.classList.add("upgradeButton-Upgradable");
  } else {
    upgrade3Button.disabled = true; // Enable the button
    upgrade3Button.classList.add("upgradeButton-NotUpgradable");
    upgrade3Button.classList.remove("upgradeButton-Upgradable");
  }
}

// Event Listener when button is pressed
upgrade3Button.addEventListener("click", () => {
  if (!upgrade3Button.disabled) {
    if (fishPerSecond3 == 0) {
      fishPerSecond3 = 50;
    } else {
      fishPerSecond3 *= 2;
    }
    fish -= upgrade3Cost;
    upgrade3Cost *= 2;
    fishPerSec3Upgrades++;
    rightDivUpgrade3.innerHTML = `Fish Per Sec<br>${upgrade3Cost}x 🐟`;
    leftDivUpgrade3.textContent = `${fishPerSec3Upgrades}`;
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

  fish += increment * (fishPerSecond1 + fishPerSecond2 + fishPerSecond3);
  counterDisplay.innerHTML = `${fish.toFixed(0)} 🐟<br>
      ${fishPerSecond1 + fishPerSecond2 + fishPerSecond3} Fish/sec`; // Update counter display with 0 decimal places

  lastTimestamp = timestamp; // Update the last timestamp
  requestAnimationFrame(updateCounter); // Call the next animation frame
  checkUpgrade0Availability();
  checkUpgrade1Availability();
  checkUpgrade2Availability();
  checkUpgrade3Availability();
};

// Start the animation loop
requestAnimationFrame(updateCounter);
