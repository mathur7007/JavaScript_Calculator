class Calculator {
	constructor(container) {
		this.container = container;
		this.previousOperandElement = "";
		this.currentOperandElement = "";
		this.previousOperandValue = "";
		this.currentOperandValue = "";
		this.operation = undefined;
		this.render();
	}
	render() {
		const calculatorGrid = this.createElement("div", "calculator-grid");
		const outputDiv = this.createElement("div", "output");
		this.previousOperandElement = this.createElement("div", "previous-operand");
		this.currentOperandElement = this.createElement("div", "current-operand");
		outputDiv.append(this.previousOperandElement, this.currentOperandElement);
		calculatorGrid.appendChild(outputDiv);

		// Create buttons
		this.createButton(calculatorGrid, "AC", "clearDisplay", "span-two");
		this.createButton(calculatorGrid, "DEL", "delete");
		this.createButton(calculatorGrid, "/", "chooseOperation");
		this.createButton(calculatorGrid, "1", "appendNumber");
		this.createButton(calculatorGrid, "2", "appendNumber");
		this.createButton(calculatorGrid, "3", "appendNumber");
		this.createButton(calculatorGrid, "*", "chooseOperation");
		this.createButton(calculatorGrid, "4", "appendNumber");
		this.createButton(calculatorGrid, "5", "appendNumber");
		this.createButton(calculatorGrid, "6", "appendNumber");
		this.createButton(calculatorGrid, "+", "chooseOperation");
		this.createButton(calculatorGrid, "7", "appendNumber");
		this.createButton(calculatorGrid, "8", "appendNumber");
		this.createButton(calculatorGrid, "9", "appendNumber");
		this.createButton(calculatorGrid, "-", "chooseOperation");
		this.createButton(calculatorGrid, ".", "appendNumber");
		this.createButton(calculatorGrid, "0", "appendNumber");
		this.createButton(calculatorGrid, "=", "equals", "span-two");

		this.container.appendChild(calculatorGrid);
		this.updateDisplay();
	}
	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerPart = parseFloat(stringNumber.split(".")[0]);
		const decimalPart = stringNumber.split(".")[1];
		let integerDisplay;

		if (isNaN(integerPart)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerPart.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}

		if (decimalPart != null) {
			return `${integerDisplay}.${decimalPart}`;
		} else {
			return integerDisplay;
		}
	}
	updateDisplay() {
		if (this.operation != null) {
			this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperandValue)} ${this.operation}`;
		} else {
			this.previousOperandElement.innerText = "";
		}
		this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperandValue);
	}
	createElement(tag, className = "", text = "") {
		const element = document.createElement(tag);
		if (className) element.classList.add(className);
		if (text) element.textContent = text;
		return element;
	}
	createButton(parent, title, method, className = "") {
		const buttonElem = this.createElement("button", className, title);
		buttonElem.addEventListener("click", (e) => this[method](e.target.innerText));
		parent.appendChild(buttonElem);
	}
	clearDisplay() {
		this.currentOperandElement.innerText = "";
		this.previousOperandElement.innerText = "";
		this.previousOperandValue = "";
		this.currentOperandValue = "";
		this.operation = undefined;
	}
	delete() {
		if (this.currentOperandValue === "") return;
		this.currentOperandValue = this.currentOperandValue.toString().slice(0, -1);
		this.currentOperandElement.innerText = this.currentOperandValue;
	}
	appendNumber(number) {
		if (number === "." && this.currentOperandValue.includes(".")) return;
		this.currentOperandValue = this.currentOperandValue.toString() + number;
		this.updateDisplay();
	}
	chooseOperation(operation) {
		if (this.operation != operation) {
			this.operation = operation;
			this.updateDisplay();
		}
		if (this.currentOperandValue === "") return;
		if (this.previousOperandValue !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previousOperandValue = this.currentOperandValue;
		this.currentOperandValue = "";
		this.updateDisplay();
	}
	equals() {
		this.compute();
		this.updateDisplay();
	}
	compute() {
		let computation;
		let prev = parseFloat(this.previousOperandValue);
		let current = parseFloat(this.currentOperandValue);
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "/":
				computation = prev / current;
				break;
			case "*":
				computation = prev * current;
				break;
			default:
				return;
		}
		this.currentOperandValue = computation;
		this.operation = undefined;
		this.previousOperandValue = "";
		this.updateDisplay();
	}
}
