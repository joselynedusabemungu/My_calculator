const screen = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let previousInput = "";
let operator = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

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

        updateScreen();
    });
});

function handleNumber(num) {
    if (currentInput === "0") {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

function handleDecimal() {
    if (!currentInput.includes(".")) {
        if (currentInput === "") {
            currentInput = "0."; 
        } else {
            currentInput += ".";
        }
    }
}

function handleOperator(nextOperator) {
    if (currentInput === "") return; 

    if (previousInput !== "") {
        calculate();
    }

    operator = nextOperator;
    previousInput = currentInput;
    currentInput = ""; 
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case "+": result = prev + current; break;
        case "-": result = prev - current; break;
        case "*": result = prev * current; break;
        case "/": result = current === 0 ? "Error" : prev / current; break; 
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = "";
}

function clearScreen() {
    currentInput = "";
    previousInput = "";
    operator = null;
}

function updateScreen() {
    screen.value = currentInput || "0";
}

updateScreen();