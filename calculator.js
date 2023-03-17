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
            if(number1 === 0){
                return number2;
            }
            console.log(`multiplying ${number1} with ${number2}`);
            return multiply(number1, number2);
            break;
        case "/":
            return divide(number1, number2);
            break;
    }
}

function evaluateExpression(){
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

function getButtons() {
    console.log("getButtons")
    const buttons = document.querySelectorAll('.button');
    console.table(buttons, ['textContent', 'className']);
    buttons.forEach(button => {
        if (button.classList.contains('operation')) {
            button.addEventListener('click', () => {
                
                if(operator === ''){
                    operator = button.textContent;
                }
                if(display.textContent !== '' && previousDisplay.textContent !== ''){
                    toOperate = true;
                }
                if(toOperate){
                    result = operate(operator, previousDisplay.textContent, display.textContent)
                    previousDisplay.textContent = '';
                    display.textContent = result;
                    toOperate = false;
                    
                }
                inputingSameNumber = false;
                operator = button.textContent;
                console.log(inputingSameNumber)

            })
        }
        if (button.classList.contains('number')) {
            button.addEventListener('click', () => {
                console.log(toOperate)
                if(!inputingSameNumber){
                    previousDisplay.textContent = display.textContent;
                    display.textContent = button.textContent;
                    inputingSameNumber = true;
                    toOperate = true;

                }else{
                    if(display.textContent === '0'){
                        display.textContent = button.textContent;
                    }else{
                        display.textContent += button.textContent;
                    }
                }
            })
        }
        if(button.classList.contains('equalSign')){
            button.addEventListener('click', () => {
                if(display.textContent !== '' && previousDisplay.textContent !== ''){
                    toOperate = true;
                }
                if(toOperate){
                    result = operate(operator, previousDisplay.textContent, display.textContent)
                    previousDisplay.textContent = '';
                    display.textContent = result;
                    toOperate = false;
                }
            });
        }
        if(button.classList.contains('clearButton')){
            button.addEventListener('click', () =>{
                expression = '';
                result = '';
                display.textContent = '0';
                previousDisplay.textContent = '';
            })
        }
        if(button.classList.contains('deleteButton')){
            button.addEventListener('click', () => {
                if(display.textContent === '0') return;
                if(display.textContent.length === 1){
                    display.textContent = '0';
                    return;
                }
                disp = display.textContent
                display.textContent = disp.slice(0, disp.length-1) 
            })
        }
    })

}

getButtons();