var calculatorSymbols = [{"symbol":"MC", "type":"clearMemory"},
{"symbol":"M+", "type":"addToMemory"},
{"symbol":"M-", "type":"deductFromMemory"},
{"symbol":"MR", "type":"readMemory"},
{"symbol":"C", "type":"clearAll"},
{"symbol":"+/-", "type":"negativePositive"},
{"symbol":"/", "type":"operator"},
{"symbol":"*", "type":"operator"},
{"symbol":"7", "type":"number"},
{"symbol":"8", "type":"number"},
{"symbol":"9", "type":"number"},
{"symbol":"-", "type":"operator"},
{"symbol":"4", "type":"number"},
{"symbol":"5", "type":"number"},
{"symbol":"6", "type":"number"},
{"symbol":"+", "type":"operator"},
{"symbol":"1", "type":"number"},
{"symbol":"2", "type":"number"},
{"symbol":"3", "type":"number"},
{"symbol":"=", "type":"equalto"},
{"symbol":"0", "type":"number"},
{"symbol":".", "type":"number"}
];

window.addEventListener("load", initialize());

function  initialize() {
  var calculator = new Calculator("calculatorContainer");
  calculator.displayCalculator();
}

function Calculator(id) {
  this.calculatorElement = document.getElementById(id);
  this.operatorFlag = false;                 // keeps check on existence of operand1 and operator before operand2
  this.operandOneFlag = false;              //keeps track on existence of operand1 before operator
  this.storedOperand = 0;                    // stores operand in memory
  this.addMem = false, this.subMem = false; // toggle values if M+ and M- is pressed respectively
  this.decimalTracker = 0;                   // tracks the no. of c\decimal points in an operand

  this.displayCalculator = function() {
  	this.displayScreen = this.createDisplayScreen();
  	for (var i = 0, len = calculatorSymbols.length; i < len; i++) {
  		var calculatorButton = this.createCalculatorButton(i);
      if (calculatorSymbols[i].symbol == "=") {
        calculatorButton.id = "equalTo";
      }
      if (calculatorSymbols[i].symbol == "0") {
        calculatorButton.id = "zero";
      }
      if (calculatorSymbols[i].symbol == ".") {
        calculatorButton.id = "decimal";
      }
  	  this.calculatorElement.appendChild(calculatorButton);
  	  calculatorButton.addEventListener("click", this.keyClickHandler.bind(this));
  	}
  }

  this.createCalculatorButton = function(i) {
    var calculatorButton = document.createElement("input");
    calculatorButton.type = "button";
    calculatorButton.className = "calculatorKeys";
    calculatorButton.value = calculatorSymbols[i].symbol;
    calculatorButton.name = calculatorSymbols[i].type;
    return calculatorButton;
  }

  this.createDisplayScreen = function() {
    var displayScreen = document.createElement("input");
    displayScreen.type = "textbox";
    displayScreen.disabled = true;
    displayScreen.id = "displayScreen";
    var screen = document.createElement("div");
    screen.appendChild(displayScreen);
    this.calculatorElement.appendChild(screen);
    return displayScreen;
  }
  
  this.keyClickHandler = function(event) {
    var keyValue = event.target.value;
    switch(event.target.name) {
      case "number": this.displayOperand(keyValue);
      break;
      case "operator":  if (!(this.operand1 == undefined)) {
                          this.insertOperatorInExpression(keyValue); 
                        }
      break;
      case "equalto": if (!(this.operand1 == undefined) && !(this.operator == undefined) && !(this.operand2 == undefined)) {
                        this.equalToOperation();
                      }
      break;
      case "clearAll": this.clearAllExpression();
      break;
      case "negativePositive": this.displayChangedSignOperator();
      break;
      case "clearMemory": this.clearFromMemory();
      break;
      case "readMemory": this.readFromMemory();  
      break;
      case "deductFromMemory": this.memoryStatus("-");
      break;
      case "addToMemory": this.memoryStatus("+");
      break;
    }
  }

  this.setScreenValue = function(value) {
    this.displayScreen.value = value;
  }

  this.clearAllExpression = function() {
    this.setScreenValue("");
    this.operand1 = 0;
    this.operandOneFlag = false;
    this.decimalTracker = 0;
  }

  this.insertOperatorInExpression = function(keyValue) {
    this.operandOneFlag = true;
    this.decimalTracker = 0;
    if(!(this.operand2 == undefined)) {
      this.calculateExpression();
    }
    if(this.operand1 == ".") {
      this.operand1 = 0;
    }
    this.operator = keyValue;
    this.operatorFlag = false;
    this.resetValues();
  }

  this.clearFromMemory = function() {
    this.decimalTracker = 0; 
    this.storedOperand = 0;
    this.resetValues();
  }

  this.displayOperand = function(keyValue) {
    if (!this.operandOneFlag && !this.operatorFlag) {    // displays operand1 on screen
      this.getFirstOperand(keyValue);
    }
    else if (this.operandOneFlag) {       
      if (this.operatorFlag == false) {  //replaces screen value by operand1 if number is pressed after saving to memory and operator is undefined
        if (this.addMem || this.subMem) {
          this.getNewFirstOperand(keyValue);
          return;
        }
      }
      this.getSecondOperand(keyValue);          // displays operand2 on screen
    }
    else if (this.operatorFlag) {               // changes value of result to operand1 when = is pressed
      this.changeResultToFirstOperand(keyValue);
    }
  }

  this.getNewFirstOperand = function(keyValue) {
    this.setScreenValue(keyValue);
    this.operand1 = keyValue;
    this.operandOneFlag = false;
    this.resetValues();
  }

  this.changeResultToFirstOperand = function(keyValue) {
    if (keyValue == ".") {
      this.trackDecimal();
    }
    this.setScreenValue(keyValue);
    this.operand1 = keyValue;
    this.operatorFlag = false;  
  }

  this.getFirstOperand = function(keyValue) {
    if (keyValue == ".") {
      if(!this.trackDecimal()) {
        return false;
      }
    }
    this.appendToScreenValue(keyValue);
    this.removeZerosFromHead();
  }

  this.getSecondOperand = function(keyValue) {
    if (this.operand2 == undefined) {
      this.setScreenValue("");
    }
    if (this.operator) {
      if (keyValue == ".") {
        if(!this.trackDecimal()) {
          return false;
        }
      }
      this.appendToScreenValue(keyValue);
      this.operand2 =  this.displayScreen.value;
    }
  }

  this.trackDecimal = function() {
    this.decimalTracker++;
    if (this.decimalTracker > 1) {
      return false;
    }
    else {
      return true;
    }
  }

  this.appendToScreenValue = function(value) {
    this.displayScreen.value += value;
  }

  this.equalToOperation = function() {
      this.decimalTracker = 0;
      if(this.operand2 == ".") {
        this.operand2 = 0;
      }
      this.calculateExpression();
      this.operator = undefined;
      this.operandOneFlag = false;
      this.operatorFlag = true;
  }

  this.removeZerosFromHead = function() {
    var zeroRegex = /^[0]+$/;
    var zeroAndDigitRegex = /^[0]+([\d]{1})$/;
    if(zeroRegex.test(this.displayScreen.value)) {
      this.setScreenValue("0");
    }  
    else if (zeroAndDigitRegex.test(this.displayScreen.value)) {
      this.setScreenValue(RegExp.$1);
    }  
    this.operand1 = this.displayScreen.value;
  }
  
  this.readFromMemory = function() {
    this.setScreenValue(this.storedOperand);
    this.operand1 = this.storedOperand;
    this.operandOneFlag = true;
    this.operand2 = undefined;
    this.operator = undefined; 
    this.operatorFlag = false;
  }

  this.changeOperandSign = function() {
    if (this.operand2 == undefined && this.operand1) {
      this.operand1 = -(this.operand1);
    }
    if (this.operand2) {
      this.operand2 = -(this.operand2);
    }
  }

  this.displayChangedSignOperator =  function() {
    this.setScreenValue(-(this.displayScreen.value));
    this.changeOperandSign();
  }

  this.resetValues = function() {
    this.addMem = false;
    this.subMem = false;
  }

  this.memoryStatus = function(operatorSymbol) {
    this.addMem = true;
    this.storedOperand = this.storeMemory(operatorSymbol);
    this.operatorFlag = false;
    this.operandOneFlag = true;
  }

  this.storeMemory = function(memOperator) {
    this.storedOperand = eval(this.storedOperand + memOperator + "(" + this.displayScreen.value + ")" );
    return this.storedOperand;
  }

  this.calculateExpression = function() {
    var solution = eval(this.operand1 + this.operator + this.operand2);
    this.setScreenValue(solution);
    this.operand1 = solution;
    this.operand2 = undefined;
  } 
}