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
  this.quizDiv.style.display = "none";
  this.resultDiv.style.display = "none";
  this.jsonArray = [];
  this.wrongAnsweredQuestions = [];
  this.questionText = document.createTextNode("");
  this.solution, this.timeSpan;
  this.startButtonId.addEventListener("click", this.startQuiz, false);
  this.nextButton.addEventListener("click", this.displayQuestion, false);
}
Quiz.prototype.startQuiz = function() {
  that.startMenuPage.style.display = "none";
  that.quizDiv.style.display = "block";
  that.pushToJsonArray();
  that.displayQuestion();
}
Quiz.prototype.pushToJsonArray = function() {
  var i = 0;
  while (i < 20) {
    var randomNumbers = [];
    var random = that.chooseRandomNumber(randomNumbers);
    that.jsonArray.push({"operand1": random[0], "operand2": random[1], "operator": that.operators[(random[2])], "result": that.getSolution(random)});
    i++;
  }
}
Quiz.prototype.getSolution = function(random) {
  var solution;
  switch(random[2]) {
    case 0: solution = random[0] + random[1];
            break;
    case 1: solution = random[0] - random[1];
            break;
    case 2: solution = random[0] * random[1];
            break;
    case 3: solution = Math.floor(random[0] / random[1]);
            break;   
  }
  return solution;
}
Quiz.prototype.chooseRandomNumber = function(randomNumbers) {
  var max = 20, min = 1, maxArr = 3, minArr = 0;
  var operand1 = Math.round(Math.random() * (max - min) + min);
  var operand2 = Math.round(Math.random() * (max - min) + min);
  var operator = Math.round(Math.random() * (maxArr - minArr) + minArr);
  randomNumbers.push(operand1, operand2, operator);
  return randomNumbers;
}
Quiz.prototype.displayQuestion = function() {
  var count = 0;
  var answer = that.resultText.value;
  if (that.questionNumber < 20) {
    that.resultText.disabled = false;
    that.resultText.value = "";
    that.questionText.textContent = "";
    that.startTimer();
    var questionString = "Question" + (that.questionNumber + 1) + ":  " + (that.jsonArray[that.questionNumber].operand1) + " " +  (that.jsonArray[that.questionNumber].operator) + " " +  that.jsonArray[that.questionNumber].operand2;
    that.questionText = document.createTextNode(questionString);
    that.question.appendChild(that.questionText);
  }
  if (!that.questionNumber == 0 && that.questionNumber <= 20) {
    if (parseInt(answer) == that.jsonArray[that.questionNumber - 1].result) {
      that.total++;
    }
    else {
      that.wrongAnsweredQuestions.push(that.jsonArray[that.questionNumber - 1]);
    }
  }
  that.score.innerHTML = that.total; 
  if (that.questionNumber == 20) {
    clearInterval(that.timeSpan);
    that.quizDiv.style.display = "none";
    that.resultDiv.style.display = "block";
    that.displayResult();
  }
  that.questionNumber++;
}
Quiz.prototype.displayResult = function() {
  var textnode = document.createTextNode("your score: " + that.total);
  that.resultDiv.appendChild(textnode);
  var i = 0;
  while (i < that.wrongAnsweredQuestions.length) {
    var wrongAnswer = "Question:" + (i + 1) + "   " + that.wrongAnsweredQuestions[i].operand1 + " " + that.wrongAnsweredQuestions[i].operator + " " + that.wrongAnsweredQuestions[i].operand2 + " " + "=" + that.wrongAnsweredQuestions[i].result + "\n"; 
    var resultTextnode = document.createTextNode(wrongAnswer);  
    var div = document.createElement("div");
    div.className = "answerkey";
    div.appendChild(resultTextnode);
    that.resultDiv.appendChild(div);
    i++;
  }
}
Quiz.prototype.startTimer = function() {
  var counter = 20;
  clearInterval(that.timeSpan);
  that.timeSpan = setInterval(elapse, 1000);
  function elapse() {
    counter = counter - 1;
    that.timer.innerHTML = counter;
    if (counter <= 0) {
      clearInterval(that.timeSpan);
      that.resultText.disabled = true;
      alert("TIMEOUT");
    }
  }
}
var startButton = new Quiz("start");