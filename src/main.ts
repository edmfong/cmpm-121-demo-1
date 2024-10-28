import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const upgrades: HTMLDivElement = document.querySelector("#upgrades")!;

const gameName = "Fishy Fish Fish";
let fish: number = 0;
let lastTimestamp: number = 0; // Keeps track of the last frame's timestamp

interface Item {
  name: string;
  cost: number;
  rate: number;
  fishPerClick: number | null;
  fishPerSecond: number | null;
  upgradesCount: number;
  initialUpgrade: number;
  upgradeCostIncrease: number;
  imgSrc: string;
  button: HTMLButtonElement | null;
  displayRightDiv: HTMLDivElement | null;
  displayLeftDiv: HTMLDivElement | null;
  flavorText: string;
  flavorTextDiv: HTMLElement | null;
}

const availableItems: Item[] = [
  {
    name: "Little Helpers",
    cost: 10,
    rate: 0,
    imgSrc:
      "https://raw.githubusercontent.com/edmfong/cmpm-121-demo-1/main/img/paw.png",
    fishPerSecond: 0,
    fishPerClick: 1,
    upgradeCostIncrease: 1.15,
    initialUpgrade: 0,
    upgradesCount: 0,
    button: null,
    displayRightDiv: null,
    displayLeftDiv: null,
    flavorText:
      "With a swift swipe, the paw snags fish like a pro. Boost your fish-per-click game!",
    flavorTextDiv: null,
  },
  {
    name: "Grumpy Cat",
    cost: 10,
    rate: 0,
    imgSrc:
      "https://raw.githubusercontent.com/edmfong/cmpm-121-demo-1/main/img/cat1.png",
    fishPerSecond: 0,
    fishPerClick: null,
    upgradeCostIncrease: 1.15,
    initialUpgrade: 1,
    upgradesCount: 0,
    button: null,
    displayRightDiv: null,
    displayLeftDiv: null,
    flavorText:
      "This cat may be grumpy, but it’s still putting in the work. Slow and steady wins the fish!",
    flavorTextDiv: null,
  },
  {
    name: "Gray Cat",
    cost: 100,
    rate: 0,
    imgSrc:
      "https://raw.githubusercontent.com/edmfong/cmpm-121-demo-1/main/img/cat2.png",
    fishPerSecond: 0,
    fishPerClick: null,
    upgradeCostIncrease: 1.15,
    initialUpgrade: 5,
    upgradesCount: 0,
    button: null,
    displayRightDiv: null,
    displayLeftDiv: null,
    flavorText:
      "Sleek and mysterious, the gray cat brings a bit more fish to the table, when it is in the mood.",
    flavorTextDiv: null,
  },
  {
    name: "Tabby Cat",
    cost: 1000,
    rate: 0,
    imgSrc:
      "https://raw.githubusercontent.com/edmfong/cmpm-121-demo-1/main/img/cat3.png",
    fishPerSecond: 0,
    fishPerClick: null,
    upgradeCostIncrease: 1.15,
    initialUpgrade: 50,
    upgradesCount: 0,
    button: null,
    displayRightDiv: null,
    displayLeftDiv: null,
    flavorText:
      "Friendly and curious, this tabby is always on the hunt for fish—expect more from this little fisher!",
    flavorTextDiv: null,
  },
  {
    name: "Lucky Cat",
    cost: 5000,
    rate: 0,
    imgSrc:
      "https://raw.githubusercontent.com/edmfong/cmpm-121-demo-1/main/img/cat4.png",
    fishPerSecond: 0,
    fishPerClick: null,
    upgradeCostIncrease: 1.15,
    initialUpgrade: 100,
    upgradesCount: 0,
    button: null,
    displayRightDiv: null,
    displayLeftDiv: null,
    flavorText:
      "The fish just keep rolling in with this lucky feline! Every second feels like a jackpot.",
    flavorTextDiv: null,
  },
];

// Create the upgrade buttons and associated elements
function createUpgradeButton(index: number) {
  // create button
  const upgrade = availableItems[index];
  const upgradeButton = document.createElement("button");
  const rightDiv = document.createElement("div");
  rightDiv.innerHTML = `${upgrade.name}<br>${upgrade.cost}x 🐟`;
  const leftDiv = document.createElement("div");
  leftDiv.textContent = `${upgrade.fishPerSecond!.toFixed(0)}`;
  const img = document.createElement("img");
  img.src = upgrade.imgSrc;
  const flavorTextDiv = document.createElement("div");
  flavorTextDiv.textContent = `${upgrade.flavorText}`;

  // adds elements to the button
  const upgradeContainer = document.createElement("div");
  upgradeContainer.append(img);
  upgradeContainer.appendChild(rightDiv);
  upgradeContainer.appendChild(leftDiv);
  // upgradeButton.append(img);
  // upgradeButton.appendChild(rightDiv);
  // upgradeButton.appendChild(leftDiv);
  upgradeContainer.classList.add("upgradeContainer");
  upgradeContainer.classList.add("flavorText");
  upgradeButton.appendChild(upgradeContainer);
  upgradeButton.appendChild(flavorTextDiv);
  upgradeButton.disabled = true;
  upgradeButton.classList.add("upgradeButton-NotUpgradable");

  // appends button to the DOM
  upgrades.appendChild(upgradeButton);

  // Store references in the upgrade data
  upgrade.button = upgradeButton;
  upgrade.displayRightDiv = rightDiv;
  upgrade.displayLeftDiv = leftDiv;
  upgrade.flavorTextDiv = flavorTextDiv;
}

// Initialize upgrade buttons
availableItems.forEach((_, index) => {
  createUpgradeButton(index);
});

// Check if the upgrade is available
function checkUpgradeAvailability(index: number) {
  const upgrade = availableItems[index];
  if (fish >= upgrade.cost) {
    upgrade.button!.disabled = false;
    upgrade.button!.classList.remove("upgradeButton-NotUpgradable");
    upgrade.button!.classList.add("upgradeButton-Upgradable");
  } else {
    upgrade.button!.disabled = true;
    upgrade.button!.classList.add("upgradeButton-NotUpgradable");
    upgrade.button!.classList.remove("upgradeButton-Upgradable");
  }
}

// check upgrade buttons
availableItems.forEach((_, index) => {
  checkUpgradeAvailability(index);
});

// Handle upgrade logic when button is pressed
function handleUpgradeClick(index: number) {
  const upgrade = availableItems[index];

  // if disbled, check if there is enough fish to upgrade
  if (!upgrade.button!.disabled) {
    if (upgrade.fishPerSecond == 0) {
      upgrade.fishPerSecond = upgrade.initialUpgrade; // Initial fish per second
    } else {
      upgrade.fishPerSecond! *= 1.15; // Increase fish per second by 15%
    }

    fish -= upgrade.cost; // Deduct the cost from the fish total
    upgrade.cost *= upgrade.upgradeCostIncrease; // Increase the cost for the next upgrade
    upgrade.upgradesCount++; // Increment the number of upgrades

    // Update the UI
    upgrade.displayRightDiv!.innerHTML = `${upgrade.name}<br>${upgrade.cost.toFixed(0)}x 🐟`;
    upgrade.displayLeftDiv!.textContent = `${upgrade.upgradesCount.toFixed(0)}`;
  }
}

// Add event listeners to buttons
availableItems.forEach((_, index) => {
  availableItems[index].button!.addEventListener("click", () => {
    handleUpgradeClick(index);
  });
});

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// main button
const mainButton = document.createElement("button");
const fishImg = document.createElement("img");
fishImg.src =
  "https://raw.githubusercontent.com/edmfong/cmpm-121-demo-1/main/img/fish.png";
mainButton.append(fishImg);
mainButton.classList.add("mainButton");
app.appendChild(mainButton);

// Event Listener when button is pressed
mainButton.addEventListener("click", () => {
  fish += availableItems[0].fishPerClick!;
  counterDisplay.textContent = `Fish: ${fish.toFixed(0)}`; // Update counter display with 0 decimal places
});

// Update counter on display
const counterDisplay = document.getElementById(
  "counterDisplay",
) as HTMLDivElement;

// Function to increment the fish counter based on elapsed time
const updateCounter = (timestamp: number) => {
  if (!lastTimestamp) lastTimestamp = timestamp;

  const elapsed = timestamp - lastTimestamp; // Time elapsed since last frame
  const increment = elapsed / 1000; // Increment by a fraction based on time (1 unit per second)

  fish +=
    increment *
    (availableItems[1].fishPerSecond! +
      availableItems[2].fishPerSecond! +
      availableItems[3].fishPerSecond! +
      availableItems[4].fishPerSecond!);
  counterDisplay.innerHTML = `${fish.toFixed(0)} 🐟<br>
      ${(availableItems[1].fishPerSecond! + availableItems[2].fishPerSecond! + availableItems[3].fishPerSecond! + availableItems[4].fishPerSecond!).toFixed(2)} Fish/sec`; // Update counter display with 0 decimal places

  lastTimestamp = timestamp; // Update the last timestamp
  requestAnimationFrame(updateCounter); // Call the next animation frame

  // check upgrade buttons
  availableItems.forEach((_, index) => {
    checkUpgradeAvailability(index);
  });
};

// Start the animation loop
requestAnimationFrame(updateCounter);
