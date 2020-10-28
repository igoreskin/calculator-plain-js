const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__input');
const result = document.querySelector('.calculator__result');

let string = '';

keys.addEventListener('click', event => {
  if (event.target.matches('button')) {
    const key = event.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.value;

    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      displayedNum === "Input" || previousKeyType === "operator" ? 
      display.value = keyContent : display.value = displayedNum + keyContent;
      calculator.dataset.previousKeyType = null;
      string += key.textContent;
    }

    if (action === 'clear') {
      display.value = "Input";
      result.value = "Result";
      string = '';
    }

    if (action === 'delete') {
      string = string.slice(0, -1)
      display.value = string.length === 0 ? "Input" : string;
    }

    if (action === "decimal" && !displayedNum.includes('.')) {
      display.value = `${displayedNum}.`
      string += key.textContent;
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'divide'
    ) {
      string += key.textContent;
      display.value = string;
    }

    if (action === 'multiply') {
      string += '*';
      display.value = string;
    }

    if (action === 'intermediate') {
      if (string.length > 0) {
        string = eval(string).toString();
        display.value = string;
        result.value = string;
      }
    }

    if (action === 'calculate') {
      display.value !== "Input" && display.value.length > 0 ? result.value = eval(string) : result.value = "Result";
    }
  }
})