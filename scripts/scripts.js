// DOM Elements
const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTipInput = document.querySelector(".custom-tip");
const peopleInput = document.getElementById("people");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");
const resetButton = document.getElementById("reset");

// State variables
let billAmount = 0;
let tipPercentage = 0;
let numberOfPeople = 1;

// Event Listeners
billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);
customTipInput.addEventListener("input", handleCustomTip);
resetButton.addEventListener("click", resetCalculator);

// Add click event listeners to tip buttons
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");
    // Set tip percentage
    tipPercentage = parseInt(button.dataset.tip);
    // Clear custom tip input
    customTipInput.value = "";
    // Calculate
    calculate();
  });
});

// Functions
function calculate() {
  // Get values from inputs
  billAmount = parseFloat(billInput.value) || 0;
  numberOfPeople = parseInt(peopleInput.value) || 1;

  // Calculate tip amount per person
  const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
  // Calculate total amount per person
  const totalAmount = billAmount / numberOfPeople + tipAmount;

  // Update displays
  updateDisplay(tipAmountDisplay, tipAmount);
  updateDisplay(totalAmountDisplay, totalAmount);

  // Enable/disable reset button
  resetButton.disabled = !(billAmount || tipPercentage || numberOfPeople > 1);
}

function handleCustomTip() {
  // Remove active class from all tip buttons
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  // Set tip percentage from custom input
  tipPercentage = parseFloat(customTipInput.value) || 0;
  // Calculate
  calculate();
}

function updateDisplay(element, value) {
  element.textContent = `$${value.toFixed(2)}`;
}

function resetCalculator() {
  // Reset inputs
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";

  // Reset state
  billAmount = 0;
  tipPercentage = 0;
  numberOfPeople = 1;

  // Reset displays
  tipAmountDisplay.textContent = "$0.00";
  totalAmountDisplay.textContent = "$0.00";

  // Remove active class from tip buttons
  tipButtons.forEach((btn) => btn.classList.remove("active"));

  // Disable reset button
  resetButton.disabled = true;
}

// Initial state
resetButton.disabled = true;
