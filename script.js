const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
const result = document.querySelector('.calculator__result');

keys.addEventListener('click', event => {
  if (event.target.matches('button')) {
    const key = event.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.value;

    const calculate = (num1, op, num2) => {
      let res = ''
      switch (op) {
        case 'add':
          res = parseFloat(num1) + parseFloat(num2);
          break;

        case 'subtract':
          res = parseFloat(num1) - parseFloat(num2);
          break;

        case 'multiply':
          res = parseFloat(num1) * parseFloat(num2);
          break;

        case 'divide':
          res = parseFloat(num1) / parseFloat(num2);
          break;

        default: 
          res = result.value;
      }
      return res;
    }

    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      displayedNum === "Input" || previousKeyType === "operator" ? 
      display.value = keyContent : display.value = displayedNum + keyContent;
      
      console.log('CONTENT', display.value)
      calculator.dataset.previousKeyType = null;
    }

    if (action === 'clear' || action === 'delete') {
      window.location.reload()
    }

    if (action === "decimal" && !displayedNum.includes('.')) {
      display.value = `${displayedNum}.`
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue;
      const secondValue = displayedNum;
      const operator = calculator.dataset.operator;
      result.value = calculate(firstValue, operator, secondValue)
    }
  }
})