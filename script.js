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

const screen = document.querySelector('#screen');
const buttonContainer = document.querySelector('#buttonContainer');

buttonContainer.addEventListener('click', (event) => {
    const button = event.target;
    if (button.classList.contains('num-button')) {
        getNum(button);
        console.log(numString);
    } else if (button.id == 'equal') {
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
        
    } else if (button.classList.contains('op-button')) {
        getOp(button)
        console.log(currentOp)
    } else if (button.id == 'negate') {
        negate();
    } else if (button.id == 'clear') {
        clearAll();
    } else if (button.id == 'delete') {
        deleteNum();
    } else if (button.id == 'decimal') {
        addDecimal()
    }
        updateDisplay(button);
    
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
    justCalculated = false;
    if (numString.length === 0) {
        return;
    }
    numString = String(Number(numString * -1));
    console.log(numString);
}

function getNum(button) {
    if (justCalculated) {
        numString = button.textContent;
        justCalculated = false;
    } else {
        numString += button.textContent;
    }
    
}

function getOp(button) {
    if (currentOp != null && previousNum != null) {
        previousNum = operate(operations[currentOp], previousNum, Number(numString));
    } else if (!justCalculated) {
        previousNum = Number(numString);
    }
    currentOp = button.textContent;
    numString = "";
    justCalculated = false;
    
}

function clearAll() {
     numString = "";
     previousNum = null;
     currentOp = null;
}

function deleteNum() {
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

function updateDisplay(button) {
    if (previousNum != null && button.classList.contains('op-button')) {
        screen.textContent = previousNum;
    } else {
        screen.textContent = numString;
    }
    
}