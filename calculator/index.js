const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const input = document.querySelector("#input-field");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");

class Calculator {
  constructor(operations) {
    this.operations = operations;
    this.clear();
  }

  clear() {
    this.operations.value = "";
  }

  delete() {
    let operand = this.operations.value;
    this.operations.value = operand.slice(0, -1);
  }

  appendNumber(number) {
    this.operations.value = this.operations.value + number.toString();
  }

  compute() {
    let compute = this.operations.value;
    this.operations.value = eval(
      compute
        .replace("%", "/100")
        .replace("×", "*")
        .replace("+;", "+")
        .replace("−", "-")
        .replace("÷", "/")
    );
  }
}

const calculator = new Calculator(input);
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
  });
});

operationButtons.forEach((operationButton) => {
  operationButton.addEventListener("click", () => {
    let operation = operationButton.innerText;
    if (input.value === "") return;
    calculator.appendNumber(operation);
  });
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

equalsButton.addEventListener("click", () => {
  if (input.value === "") return;
  calculator.compute();
});
