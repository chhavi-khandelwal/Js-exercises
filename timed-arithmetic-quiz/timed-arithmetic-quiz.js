function Quiz(buttonId) {
  that = this;
  this.startButtonId = document.getElementById(buttonId);
  this.startMenuPage = document.getElementById("startmenu");
  this.quizDiv = document.getElementById("quizpage");
  this.resultDiv = document.getElementById("resultpage");
  this.resultText = document.getElementById("result");
  this.nextButton = document.getElementById("next");
  this.timer = document.getElementById("timer");
  this.score = document.getElementById("score");
  this.question = document.getElementById("question");
  this.operators = ["+", "-", "*", "/"];
  this.questionNumber = 0;
  this.total = 0;
  this.totalQuestions = 20;
  this.quizDiv.style.display = "none";
  this.resultDiv.style.display = "none";
  this.jsonArray = [];
  this.wrongAnsweredQuestions = [];
  this.questionText = document.createTextNode("");
  this.solution, this.timeSpan;
  this.minRange = 1;
  this.maxRange = 20;
  this.startButtonId.addEventListener("click", this.startQuiz, false);
  this.nextButton.addEventListener("click", this.newScreen, false);
}
Quiz.prototype.startQuiz = function() {
  that.startMenuPage.style.display = "none";
  that.quizDiv.style.display = "block";
  that.pushToJsonArray();
  that.newScreen();
}
Quiz.prototype.pushToJsonArray = function() {
  var i = 0;
  while (i < this.totalQuestions) {
    this.operand1 = this.chooseRandomNumber(this.minRange, this.maxRange);
    this.operand2 = this.chooseRandomNumber(this.minRange, this.maxRange);
    this.operator = this.chooseRandomNumber(0, this.operators.length - 1);
    this.jsonArray.push({"operand1": this.operand1, "operand2": this.operand2, "operator": this.operators[this.operator], "result": this.getSolution()});
    i++;
  }
}
Quiz.prototype.getSolution = function() {
  var solution;
  switch(this.operators[this.operator]) {
    case "+": solution = this.operand1 + this.operand2;
              break;
    case "-": solution = this.operand1 - this.operand2;
              break;
    case "*": solution = this.operand1 * this.operand2;
              break;
    case "/": solution = Math.floor(this.operand1 / this.operand2);
              break;   
  }
  return solution;
}
Quiz.prototype.chooseRandomNumber = function(min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);
  return randomNumber;
}
Quiz.prototype.newScreen = function() {
  var answer = that.resultText.value;
  if (that.questionNumber < that.totalQuestions) {
    that.resultText.disabled = false;
    that.resultText.value = "";
    that.questionText.textContent = "";
    that.startTimer();
    var questionString = "Question" + (that.questionNumber + 1) + ":  " + (that.jsonArray[that.questionNumber].operand1) + " " +  (that.jsonArray[that.questionNumber].operator) + " " +  that.jsonArray[that.questionNumber].operand2;
    that.questionText = document.createTextNode(questionString);
    that.question.appendChild(that.questionText);
  }
  that.match(answer);
  that.score.innerHTML = that.total; 
  that.displayResultPage();
  that.questionNumber++;
}
Quiz.prototype.match = function(answer) {
  if (!this.questionNumber == 0 && this.questionNumber <= this.totalQuestions) {   
    if (parseInt(answer) == this.jsonArray[this.questionNumber - 1].result) {   
      this.total++;
    }
    else {
      this.wrongAnsweredQuestions.push(this.questionNumber - 1);
    }
  }
}
Quiz.prototype.displayResultPage = function(answer) {
  if (this.questionNumber == this.totalQuestions) {
    clearInterval(this.timeSpan);
    this.quizDiv.style.display = "none";
    this.resultDiv.style.display = "block";
    this.displayResult();
  }
}
Quiz.prototype.displayResult = function() {
  var textnode = document.createTextNode("your score: " + this.total);
  this.resultDiv.appendChild(textnode);
  var i = 0;
  while (i < this.wrongAnsweredQuestions.length) {
    var wrongAnswer = "Question:" + (i + 1) + " " + this.jsonArray[this.wrongAnsweredQuestions[i]].operand1 + " " +  (this.jsonArray[this.wrongAnsweredQuestions[i]].operator) + " " +  (this.jsonArray[this.wrongAnsweredQuestions[i]].operand2) + " " + "=" + (this.jsonArray[this.wrongAnsweredQuestions[i]].result);
    var resultTextnode = document.createTextNode(wrongAnswer);  
    var div = document.createElement("div");
    div.className = "answerkey";
    div.appendChild(resultTextnode);
    this.resultDiv.appendChild(div);
    i++;
  }
}
Quiz.prototype.startTimer = function() {
  var counter = 21;
  clearInterval(this.timeSpan);
  this.timeSpan = setInterval(elapse, 1000);
  function elapse() {
    if (counter > 0) {
      counter = counter - 1;
      that.timer.innerHTML = counter;
    }  
    if (counter <= 0) {
      clearInterval(that.timeSpan);
      that.resultText.disabled = true;
      alert("TIMEOUT");
    }      
  }
}
var newQuiz = new Quiz("start");