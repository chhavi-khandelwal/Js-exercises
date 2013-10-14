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
  var that = this;
  this.calculatorElement = document.getElementById(id);
  this.count = 0; // keeps check on existence of operand1 and operator before operand2
  this.flag = false; //keeps track on existence of operand1 before operator
  this.storedOperand = 0; // stores operand in memory
  this.addMem = false, this.subMem = false; // toggle values if M+ and M- is pressed respectively
  this.decimalTracker = 0; // tracks the no. of c\decimal points in an operand

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
  	  calculatorButton.addEventListener("click", this.displayScreenOnScreen);
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
  
  this.displayScreenOnScreen = function() {

    if (this.name == "number" && that.flag == true && that.count == 0) { //displays no. from memory
      if (that.addMem || that.subMem) {
        that.displayScreen.value = this.value;
        that.operand1 = this.value;
        that.flag = false;
        that.resetValues();
        return;
      }
    }

    if (this.name == "number" && that.flag == false && that.count == 0) { // displays operand1 on screen
      if (this.value == ".") {
        that.decimalTracker++;
        if (that.decimalTracker > 1) {
          return false;
        }
      }
      that.displayScreen.value += this.value;
      that.removeZerosFromHead();
    }

    if (this.name == "clearAll") { // clears the screen
      that.displayScreen.value = "";
      that.operand1 = 0;
      that.flag = false;
      that.decimalTracker = 0;
    }

    if (this.name == "operator" && !(that.operand1 == undefined)) { // displays operator on screen
      that.flag = true;
      that.decimalTracker = 0;
      if(!(that.operand2 == undefined)) {
        that.calculateExpression();
      }
      if(that.operand1 == ".") {
        that.operand1 = 0;
      }
      that.operator = this.value;
      that.count = 0;
      that.resetValues();
    }


    if (this.name == "number" && that.flag == true && that.operand2 == undefined) {
      that.displayScreen.value = "";
    }

    if (this.name == "number" && that.flag == true && that.operator) { // displays operand2 on screen
      if (this.value == ".") {
        that.trackDecimal();
      }
      that.displayScreen.value += this.value;
      that.operand2 =  that.displayScreen.value;
    }

    if (this.name == "equalto") { // calculates expression
      that.equalToOperation();
    }

    if (this.name == "number" && that.count == 1) { // changes value of result to operand1 when = is pressed
      if (this.value == ".") {
        that.trackDecimal();
        }
      that.displayScreen.value = "";
      that.displayScreen.value = this.value;
      that.operand1 = this.value;
      that.count = 0;
    }
    
    if (this.name == "negativePositive") {    // changes the sign of an operand
      that.displayScreen.value = -(that.displayScreen.value);
      that.changeOperandSign();
    }

    if (this.name == "clearMemory") { // clears memory
      that.decimalTracker = 0;
      that.storedOperand = 0;
      that.resetValues();
    }

    if (this.name == "deductFromMemory") {  // subtracts from memory value
      that.memoryStatus("-");
    }

    if (this.name == "addToMemory") { // adds to memory value
      that.memoryStatus("+");
    }

    if (this.name == "readMemory") {  //displays memory value on screen
      that.readFromMemory();
    }
  }

  this.equalToOperation = function() {
    if (!(this.operand1 == undefined) && !(this.operator == undefined) && !(this.operand2 == undefined)) {
      this.decimalTracker = 0;
      if(this.operand2 == ".") {
        this.operand2 = 0;
      }
      this.calculateExpression();
      this.operator = undefined;
      this.flag = false;
      this.count = 1;
    }
  }

  this.removeZerosFromHead = function() {
    var zeroRegex = /^[0]+$/;
    var zeroAndDigitRegex = /^[0]+([\d]{1})$/;
    if(zeroRegex.test(this.displayScreen.value))
      this.displayScreen.value = "0";
    else if (zeroAndDigitRegex.test(this.displayScreen.value))
      this.displayScreen.value = RegExp.$1;
    this.operand1 = this.displayScreen.value;
  }
  
  this.readFromMemory = function() {
    this.displayScreen.value = this.storedOperand; 
    this.operand1 = this.storedOperand;
    this.flag = true;
    this.operand2 = undefined;
    this.operator = undefined; 
    this.count = 0;
  }

  this.changeOperandSign = function() {
    if (this.operand2 == undefined && this.operand1) {
        this.operand1 = -(this.operand1);
      }
      if (this.operand2) {
        this.operand2 = -(this.operand2);
    }
  }

  this.resetValues = function() {
    that.addMem = false;
    that.subMem = false;
  }

  this.memoryStatus = function(operatorSymbol) {
    this.addMem = true;
    this.storedOperand = this.storeMemory(operatorSymbol);
    this.count = 0;
    this.flag = true;
  }

  this.trackDecimal = function() {
    this.decimalTracker++;
    if (this.decimalTracker > 1) {
      return false;
    }
  }

  this.storeMemory = function(memOperator) {
    this.storedOperand = eval(this.storedOperand + memOperator + "(" + this.displayScreen.value + ")" );
    return this.storedOperand;
  }
  
  this.calculateExpression = function() {
    var solution = eval(this.operand1 + this.operator + this.operand2);
    this.displayScreen.value = solution;
    this.operand1 = solution;
    this.operand2 = undefined;
  }  
}