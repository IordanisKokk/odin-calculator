const display = document.querySelector('.displayNumber');
const previousDisplay = document.querySelector('.previousDisplay');

let inputingSameNumber = true;
let toOperate = false;

let result = 0;

let firstNumber = null;
let operator = '';
let secondNumber = null;

let expression = '';


function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(numerator, denominator) {
    if (Number(denominator) === 0) return 'ERROR';
    return Number(numerator) / Number(denominator);
}

function operate(operator, number1, number2) {
    switch (operator) {
        case "+":
            return add(number1, number2);
            break;
        case "-":
            return subtract(number1, number2);
            break;
        case "*":
            console.log(number1)
            if (number1 === 0 || number1 === null || number1 === '') {
                return number2;
            }
            console.log("TO OPERATE VAR: " + toOperate)
            console.log(`multiplying ${number1} with ${number2}`);
            return multiply(number1, number2);
            break;
        case "/":
            if (number1 === 0 || number1 === null || number1 === '') {
                return number2;
            }
            return divide(number1, number2);
            break;
    }
}

function evaluateExpression() {
    console.log("EVALUATING EXPRESSION: " + expression)
}

function setOperator(button) {
    operator = button.textContent;
    console.log("OPERATOR: " + operator);
}

function numberInput(button) {
    console.log("Button: " + button.textContent);
    display.textContent = button.textContent;
}

function roundResult(result){
    return result = Math.round(result * 10000 ) / 10000 ;
}

function changeDisplay(result) {
    result = roundResult(result);
    previousDisplay.textContent = '';
    display.textContent = result;
    toOperate = false;
}

function getButtons() {
    console.log("getButtons")
    const buttons = document.querySelectorAll('.button');
    console.table(buttons, ['textContent', 'className']);
    buttons.forEach(button => {
        if (button.classList.contains('operation')) {
            button.addEventListener('click', () => {
                console.log("TO OPERATE VAR: " + toOperate)
                if (operator === '') {
                    operator = button.textContent;
                }
                if (display.textContent !== '' && previousDisplay.textContent !== ' ') {
                    toOperate = true;
                }
                if (toOperate) {
                    result = operate(operator, previousDisplay.textContent, display.textContent)
                    changeDisplay(result);

                }
                inputingSameNumber = false;
                operator = button.textContent;
                console.log("inputingSameNumber" + inputingSameNumber)

            })
        }
        if (button.classList.contains('number')) {
            button.addEventListener('click', () => {
                console.log("toOperate var: " + toOperate)
                if (!inputingSameNumber) {
                    previousDisplay.textContent = display.textContent;
                    display.textContent = button.textContent;
                    inputingSameNumber = true;
                    if (display.textContent !== '' && previousDisplay.textContent !== ' ') {
                        toOperate = true;
                    }

                } else {
                    if (display.textContent === '0') {
                        display.textContent = button.textContent;
                    } else {
                        display.textContent += button.textContent;
                    }
                }
            })
        }
        if (button.classList.contains('equalSign')) {
            button.addEventListener('click', () => {
                if (display.textContent !== '' && previousDisplay.textContent !== '') {
                    toOperate = true;
                }
                if (toOperate === true) {
                    result = operate(operator, previousDisplay.textContent, display.textContent)
                    changeDisplay(result);
                }
            });
        }
        if (button.classList.contains('clearButton')) {
            button.addEventListener('click', () => {
                expression = '';
                result = '';
                display.textContent = '0';
                previousDisplay.textContent = '';
                toOperate = false;
            })
        }
        if (button.classList.contains('deleteButton')) {
            button.addEventListener('click', () => {
                if (display.textContent === '0') return;
                if (display.textContent.length === 1) {
                    display.textContent = '0';
                    return;
                }
                disp = display.textContent
                display.textContent = disp.slice(0, disp.length - 1)
            })
        }

        if (button.classList.contains('buttonDot')) {
            button.addEventListener('click', () => {
                display.textContent += '.';
            })
        }
    })

}

getButtons();

expression = '';
result = '';
display.textContent = '0';
previousDisplay.textContent = '';

toOperate = false;