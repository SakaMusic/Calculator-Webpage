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



const buttonContainer = document.querySelector('#buttonContainer');

buttonContainer.addEventListener('click', (event) => {
    const button = event.target;
    if (button.classList.contains('num-button')) {
        getNum(button);
        console.log(numString);
    } else if (button.id == 'equal') {
        if (previousNum != null && numString.length != 0) {
            let result = operate(operations[currentOp], previousNum, Number(numString))
            console.log(result);
        }
        
    } else if (button.classList.contains('op-button')) {
        getOp(button)
        console.log(currentOp)
    } else if (button.id == 'negate') {
        negate();
    } else if (button.id == 'clear') {
        clearAll();
    }
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
    return a / b;
}

function exponentiate(a, b) {
    return a ** b;
}

function negate() {
    if (numString.length === 0) {
        return;
    }
    numString = String(Number(numString * -1));
}

function getNum(button) {
    numString += button.textContent;
}

function getOp(button) {
    if (currentOp != null && previousNum != null) {
        previousNum = operate(operations[currentOp], previousNum, Number(numString));
    } else {
        previousNum = Number(numString);
    }
    currentOp = button.textContent;
    numString = "";
}

function clearAll(){
     numString = "";
     previousNum = null;
     currentOp = null;
}