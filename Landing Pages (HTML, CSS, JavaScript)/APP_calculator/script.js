class Calculator{

	constructor(previousOperandTextElement, currentOperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	clear(){
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;

		this.currentOperandIsMinusNumber = false;
		this.prevOperandIsMinusNumber = false;
	}

	/*удаляет последнюю цифру операнда*/
	delete(){ 
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	/*добавляет цифру операнда*/
	appendNumber(number){

		if (number === '.' && this.currentOperand.includes('.')) return;
		/*if (this.readyToReset == true)
			this.currentOperand = number.toString();
		else*/
			if(this.currentOperandIsMinusNumber)
			{
				this.currentOperandIsMinusNumber = false;
				this.currentOperand = '-'
				this.operation = undefined;
			}

			if(this.prevOperandIsMinusNumber)
			{
				this.prevOperandIsMinusNumber = false;
				this.currentOperand = '-'
				this.operation = this.operation.toString().substring(0,1);
			}

			if(this.readyToReset)
			{
				this.currentOperand = number.toString();
				this.readyToReset = false;
				return;
			}
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}


	chooseOperation(operation){
		this.readyToReset = false;

		if ((operation == '-') && (this.currentOperand == '') && (this.previousOperand == ''))
		{
			this.currentOperandIsMinusNumber = true;
			this.operation = '-';
		}

		if ((operation == '-') && (this.operation != undefined) && (this.previousOperand != '') && (this.currentOperand == ''))
		{
			this.operation = this.operation.toString() + ' -( )';
			this.prevOperandIsMinusNumber = true;
		}


		if (this.currentOperand === '') return;
	    if (this.previousOperand !== '' && this.previousOperand !== '') {
	      this.compute();
	    }
	    
	    if (operation == 'xn'){ operation = '^';}

		this.operation = operation;
	    this.previousOperand = this.currentOperand;
	    this.currentOperand = '';

	    if (operation == '√')  { 
	    	this.compute();
	    	return;
	    }

	}

	compute(){
		let computation;
	    const prev = parseFloat(this.previousOperand);
	    const current = parseFloat(this.currentOperand);
	    if ((isNaN(prev) || isNaN(current)) && this.operation != '√') return;
	    switch (this.operation) {
	      case '+':
	        computation = (prev*10 + current*10)/10;
	        break
	      case '-':
	        computation = (prev*10 - current*10)/10;
	        break
	      case '*':
	        computation = ((prev*10) * (current*10))/100;
	        break
	      case '÷':
	        computation = prev / current;
	        break
	      case '^':
	        computation = Math.pow(prev,current);
	        break
	      case '√':
	      	if(Math.sign(this.previousOperand) == -1)
	      	{
	      		alert('Uncorrect action "' + (prev) + ' √": input number must be positive for this operation. Repeat, please!');
	      		this.clear();
	      		return;
	      	}
	        this.currentOperand = Math.sqrt(prev);
	        this.readyToReset = true;
	   		return;
	        break
	      default:
	        return;
	    }
	   /* computation = computation.toString().replace(/0*$/,"");
	    alert(computation);*/
	    this.readyToReset = true;
	    this.currentOperand = computation;
	    this.operation = undefined;
	    this.previousOperand = '';
	}

	getDisplayNumber(number) {
	    const stringNumber = number.toString();
	    const integerDigits = parseFloat(stringNumber.split('.')[0]);
	    const decimalDigits = stringNumber.split('.')[1];
	    let integerDisplay;
	    if (isNaN(integerDigits)) {
	      integerDisplay = '';
	    } else {
	      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
	    }
	    if (decimalDigits != null) {
	      return `${integerDisplay}.${decimalDigits}`;
	    } else {
	      return integerDisplay;
	    }
  }


	updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
  
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
	button.addEventListener("click", () => {

	  calculator.appendNumber(button.innerText)
      calculator.updateDisplay();
	})
})

operationButtons.forEach(button => {
	button.addEventListener("click", () => {

	  calculator.chooseOperation(button.innerText)
      calculator.updateDisplay();
	})
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
  /*calculator.clear();*/
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})

