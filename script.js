const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  calculate() {
    let result;

    const _previousOperandFloat = parseFloat(this.previousOperand);
    const _currentOperandFloat = parseFloat(this.currentOperand);

    if (isNaN(_previousOperandFloat) || isNaN(_currentOperandFloat)) return;

    switch (this.operation) {
      case '+':
        result = _previousOperandFloat + _currentOperandFloat;
        break;
      case '-':
        result = _previousOperandFloat - _currentOperandFloat;
        break;
      case '*':
        result = _previousOperandFloat * _currentOperandFloat;
        break;
      case '÷':
        result = _previousOperandFloat / _currentOperandFloat;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.calculate();
    }
    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
  appendNumber(number) {
    if (this.currentOperand.includes('.') && number == '.') return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.previousOperand} ${
      this.operation || ''
    }`;
    this.currentOperandTextElement.innerText = this.currentOperand;
  }
}
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//Botões numeros
for (const numberButton of numberButtons) {
  numberButton.addEventListener('click', () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}
//Botões de operação
for (const operationButton of operationButtons) {
  operationButton.addEventListener('click', () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}
//Botão click AC para limpar
allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

//Botão de igual

equalsButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
  calculator.operation = undefined;
});

//botão del
deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
