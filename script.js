// 1. Select the input screen and all buttons
const screen = document.getElementById("result");
const buttons = document.querySelectorAll("button");

// 2. Setup variables to hold the calculator's memory state
let currentInput = "";
let previousInput = "";
let operator = null;

// 3. Add click event listeners to every button
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        // Route the button click based on its CSS class
        if (button.classList.contains("number")) {
            handleNumber(value);
        } else if (button.classList.contains("operator")) {
            handleOperator(value);
        } else if (button.classList.contains("decimal")) {
            handleDecimal();
        } else if (button.classList.contains("equals")) {
            calculate();
        } else if (button.classList.contains("clear")) {
            clearScreen();
        }

        // Always update the display screen after any button press
        updateScreen();
    });
});

// 4. Logic for handling number buttons
function handleNumber(num) {
    // If screen shows "0", overwrite it; otherwise, append the number
    if (currentInput === "0") {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

// 5. Logic for handling decimal points
function handleDecimal() {
    // Prevent multiple decimals in a single number (e.g., 5.5.5)
    if (!currentInput.includes(".")) {
        if (currentInput === "") {
            currentInput = "0."; // If screen is empty, turn it into "0."
        } else {
            currentInput += ".";
        }
    }
}

// 6. Logic for handling math operators (+, -, *, /)
function handleOperator(nextOperator) {
    if (currentInput === "") return; // Do nothing if no number is typed yet

    // If there is already a pending math problem, calculate it first
    if (previousInput !== "") {
        calculate();
    }

    operator = nextOperator;
    previousInput = currentInput;
    currentInput = ""; // Clear current input so user can type the next number
}

// 7. Logic to run the actual calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    // If one of the numbers is missing, abort the calculation
    if (isNaN(prev) || isNaN(current)) return;

    // Execute the math based on the stored operator
    switch (operator) {
        case "+": result = prev + current; break;
        case "-": result = prev - current; break;
        case "*": result = prev * current; break;
        case "/": result = current === 0 ? "Error" : prev / current; break; // Catch division by zero
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = "";
}

// 8. Logic to clear the calculator memory
function clearScreen() {
    currentInput = "";
    previousInput = "";
    operator = null;
}

// 9. Logic to keep the HTML display in sync with JavaScript variables
function updateScreen() {
    screen.value = currentInput || "0";
}

// 10. Initialize the calculator
updateScreen();