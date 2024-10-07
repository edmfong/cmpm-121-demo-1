import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fishy Fish Fish";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a new button element
const button = document.createElement('button');

// Set button text and other properties
button.textContent = '🐟';

// Append the button to the #app div instead of the body
app.appendChild(button);
