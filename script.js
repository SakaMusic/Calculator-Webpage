const operations = {
    '+': add,
    '-': subtract,
    'x': multiply,
    '÷': divide,
    '^': exponentiate,
}

let numString = "";
let previousNum = null;
let currentOp = null;
let justCalculated = false;
let lastInputIsOp = false;

const screen = document.querySelector('#screen');
const buttonContainer = document.querySelector('#buttonContainer');

document.addEventListener('keydown', (event) => {
    const key = event.key;
    console.log('key pressed', key);

    if (key >= '0' && key <= '9') {
        handleNumberInput(key);
    } else if (key === '+' || key === '-') {
        handleOperator(key);
    } else if (key === '*') {
        handleOperator('x');
    } else if (key === '/') {
        handleOperator('÷')
    } else if (key === '.') {
        addDecimal();
    } else if (key === 'Backspace') {
        deleteNum();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Enter') {
        handleEquals();
    }
    updateDisplay();
})

buttonContainer.addEventListener('click', (event) => {
    const button = event.target;
    if (button.classList.contains('num-button')) {
        handleNumberInput(button.textContent);
    } else if (button.id == 'equal') {
        handleEquals()    
    } else if (button.classList.contains('op-button')) {
        handleOperator(button.textContent);
    } else if (button.id == 'negate') {
        negate();
    } else if (button.id == 'clear') {
        clearAll();
    } else if (button.id == 'delete') {
        deleteNum();
    } else if (button.id == 'decimal') {
        addDecimal()
    }
        updateDisplay();
    
})

function operate(func, a, b) {
    return func(a, b);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        console.log("Let's not break reality, please.")
        return 'Error';
    }
    return a / b;
}

function exponentiate(a, b) {
    return a ** b;
}

function negate() {
    lastInputIsOp = false;
    justCalculated = false;
    if (numString.length === 0) {
        return;
    }
    numString = String(Number(numString * -1));
    console.log(numString);
}

function getNum(value) {
    lastInputIsOp = false;
    if (justCalculated) {
        numString = value;
        justCalculated = false;
    } else {
        numString += value;
    }
    
}

function getOp(value) {
    if (currentOp != null && previousNum != null) {
        previousNum = operate(operations[currentOp], previousNum, Number(numString));
    } else if (!justCalculated) {
        previousNum = Number(numString);
    }
    currentOp = value
    numString = "";
    justCalculated = false;
    lastInputIsOp = true;
    
}

function clearAll() {
     numString = "";
     previousNum = null;
     currentOp = null;
}

function deleteNum() {
    lastInputIsOp = false;
    justCalculated = false;
    if (numString.length != 0) {
        numString = numString.slice(0, -1);
        if (numString.length === 1 && numString[0] == '-') {
            numString = numString.slice(0, -1);
        }
    }
    console.log(numString);
}

function addDecimal() {
    lastInputIsOp = false;
    justCalculated = false;
    if (numString.includes('.')) {
        return
    } else if (numString.length === 0) {
        numString += '0.';
    } else {
        numString += '.';
    }
    console.log(numString);
}

function updateDisplay() {
    if (previousNum != null && lastInputIsOp) {
        screen.textContent = previousNum;
    } else {
        screen.textContent = numString;
    } 
}

function handleNumberInput(value) {
    getNum(value);
}

function handleOperator(value) {
    getOp(value);
}

function handleEquals() {
    if (previousNum != null && numString.length != 0) {
            justCalculated = true;
            previousNum = operate(operations[currentOp], previousNum, Number(numString))
            if (previousNum == 'Error') {
                justCalculated = false;
                numString = ''
                previousNum = null;
                screen.textContent = "Woah buddy, let's not break the rules of reality!";
                return;
            }
            console.log(previousNum);
            currentOp = null;
            numString = String(previousNum);
        }
}