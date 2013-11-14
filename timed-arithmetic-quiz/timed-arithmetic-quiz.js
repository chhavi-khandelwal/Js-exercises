window.addEventListener("load", initialize());
function initialize() {
  var startButton = document.getElementById("start-button");
  startButton.addEventListener("click", startQuiz);
}

function startQuiz() {
  arithmeticQuiz = new Quiz(20, 1, 20);
  var startPage = document.getElementById("start-page");
  startPage.className = "visible";
  arithmeticQuiz.generateQuestions();
  arithmeticQuiz.displayQuizPage();
}

function Quiz(numberOfQuestions, minValue, maxValue) {
  var that = this;
  this.totalQuestions = numberOfQuestions;
  this.quizQuestions = [];
  this.currentQuestion = 1;
  this.minRange = minValue;  
  this.maxRange = maxValue;
  this.operators = ["+", "-", "*", "/"];
  
  //generates questions and saves them in quizQuestions[]
  this.generateQuestions = function() {
    var noOfOperators = 4;
    for (var i = 1; i <= this.totalQuestions; i++) {
      var operand1 = this.chooseRandomNumber(this.minRange, this.maxRange);
      var operand2 = this.chooseRandomNumber(this.minRange, this.maxRange);
      var operator = this.operators.random(this.operators.length); 
      var correctAnswer = Math.floor(eval(operand1 + operator + operand2));
      this.quizQuestions.push({"id": i, "operand1": operand1, "operand2": operand2, "operator": operator, "correctAnswer": correctAnswer, "attempted": false});
    }
  }
  
  //chooses random no. for questions
  this.chooseRandomNumber = function(min, max) {
    var randomNumber = Math.round(Math.random() * (max - min) + min);
    return randomNumber;
  }
  
  // chooses ramndom operator
  Array.prototype.random = function(length) {
    return this[Math.floor((Math.random()*length))];
  }
  
  //displays first quiz page
  this.displayQuizPage = function() {
    this.createQuizPage();
    var question = this.getQuestion(this.currentQuestion);
    this.displayQuestion(question);
    this.createAnswerTextBox();
    this.createScoreContainer();
    if (this.currentQuestion == 1) {
      this.displayCurrentScore(0);
    }
    this.createNextButton();
    this.createTimerDiv();
    this.startTimer();
    this.answerTextbox.focus();
  }
  
  //create quiz page container
  this.createQuizPage = function() {
    this.quizPage = document.createElement("div");
    this.quizPage.id = "quizpage";
    this.quizPageContainer = document.getElementById("quiz-question-page");
    this.quizPageContainer.appendChild(this.quizPage);
    var instructionContainer = document.createElement("div");
    instructionContainer.id = "instruction-container";
    var instruction = document.createTextNode("Solve the expression");
    instructionContainer.appendChild(instruction);
    this.quizPage.appendChild(instructionContainer);
  }
  
  //creates answer text box
  this.createAnswerTextBox = function() {
    this.quizForm = document.createElement("form");
    this.answerTextbox = document.createElement("input");
    this.answerTextbox.type = "textbox";
    this.answerTextbox.id = "autofocusbox";
    var answerContainer = document.createElement("div");
    answerContainer.id = "result";
    answerContainer.appendChild(this.answerTextbox);
    this.quizForm.appendChild(answerContainer);
    this.quizPage.appendChild(this.quizForm);
  }
  
  //creates next button
  this.createNextButton = function() {
    this.nextButton = document.createElement("input");
    this.nextButton.type = "submit";
    this.nextButton.id = "next";
    this.nextButton.value = "NEXT";
    var nextButtonContainer = document.createElement("div");
    nextButtonContainer.id = "nextbutton";
    nextButtonContainer.appendChild(this.nextButton);
    this.quizForm.appendChild(nextButtonContainer);
    this.nextButton.addEventListener("click", that.createNewQuizPage);
  }
  
  //create quiz page when next button is pressed
  this.createNewQuizPage = function() {
    that.answer = that.answerTextbox.value;
    that.storeUserAnswer();
    var quizScore = that.calculateScore();
    that.quizPageContainer.removeChild(that.quizPage);
    that.currentQuestion++;
    that.displayQuizPage();
    that.displayCurrentScore(quizScore);
    if (that.currentQuestion > that.totalQuestions) {
      that.displayResultPage(quizScore);
    }
  }
  
  //get question from quizQuestions[]
  this.getQuestion = function(questionNumber) {
    for (var i = 0, len = this.quizQuestions.length; i < len; i++) {
      if (questionNumber == this.quizQuestions[i].id) {
        var questionString = this.createQuestion(i);
        break;
      }
    }
    return questionString;
  }
  
  //creates question string to be displayed
  this.createQuestion = function(i) {
    var questionString = "Question " + (this.quizQuestions[i].id) + ":   " + (this.quizQuestions[i].operand1) + " " +  (this.quizQuestions[i].operator) + " " +  this.quizQuestions[i].operand2;
    return questionString;
  }
  
  //displays question
  this.displayQuestion = function(question) {
    var questionText = document.createTextNode(question);
    var questionContainer = document.createElement("div");
    questionContainer.id = "question";
    questionContainer.appendChild(questionText);
    this.quizPage.appendChild(questionContainer);
  }
  
  //stores answer for score calculation
  this.storeUserAnswer = function() {                                      
    for (var i = 0, len = this.quizQuestions.length; i < len; i++) {
      if (this.currentQuestion == this.quizQuestions[i].id) {
        this.quizQuestions[i].userAnswer = this.answer, 10;
        if (!this.answer.trim() == "") {
          this.quizQuestions[i].attempted = true;
        }
        break;
      }  
    }
  }
  
  //calculates score
  this.calculateScore = function() {
    var score = 0;
    for (var i = 0, len = this.quizQuestions.length; i < len; i++) {
      if (this.quizQuestions[i].attempted == true && parseInt(this.quizQuestions[i].correctAnswer, 10) == parseInt(this.quizQuestions[i].userAnswer, 10)) {
        score++;
      }
    }
    return score;
  }
  
  //displays current score on quiz page each time next button is pressed
   this.displayCurrentScore = function(quizScore) {
    if (this.currentQuestion <= this.totalQuestions) {
      this.scoreContainer.innerHTML = "";
      this.scoreContainer.appendChild(document.createTextNode("score: " + quizScore));
    } 
  }
  
  //creates div in which score is displayed
  this.createScoreContainer = function() {
    this.scoreContainer = document.createElement("div");
    this.scoreContainer.id = "scorediv";
    this.quizPage.appendChild(this.scoreContainer);
  }
  
  //implements working of timer
  this.startTimer = function() {
    var counter = 16;
    clearInterval(this.timeSpan);
    this.timeSpan = setInterval(elapse, 1000);
    function elapse() {
      if (counter > 0) {
      counter = counter - 1;
      that.timer.innerHTML = counter;
      }  
      else {
        clearInterval(that.timeSpan);
        that.disableAnswerContainer();
        alert("              TIMEOUT \n Click Next Button For Next Question");
      }      
    }
  }
  
  //disables answer textbox when there's timeout
  this.disableAnswerContainer = function() {
    this.answerTextbox.disabled = true;
  }
  
  //creates div for timer
  this.createTimerDiv = function() {
    var timerNode = document.createElement("div");
    var timerTextNode = document.createTextNode("Time left (in secs)");
    timerNode.appendChild(timerTextNode);
    timerNode.id = "timerdiv";
    this.timer = document.createElement("div");
    this.timer.id = "timediv";
    timerNode.appendChild(this.timer);
    this.quizPage.appendChild(timerNode);
  }
  
  //displays result page
  this.displayResultPage = function(quizScore) {
    this.createResultPage();
    this.displayFinalResult(quizScore);
    this.getWrongAnswers();
  }
  
  //displays final score
  this.displayFinalResult = function(score) {
    clearInterval(this.timeSpan);
    this.quizPageContainer.removeChild(this.quizPage);
    var scoreNode = document.createTextNode("  Your Score: " + score);
    this.resultPage.appendChild(scoreNode);
  }

  //creates result page
  this.createResultPage = function() {
    this.resultPage = document.createElement("div");
    this.resultPage.id = "resultpage";
    this.quizPageContainer.appendChild(this.resultPage);
  }
  
  //creates div for displaying incorrect answer
  this.createWrongAnswerContainer = function(wrongAnsweredQuestion) {
    var wrongAnswerConatiner = document.createElement("div");
    wrongAnswerConatiner.className = "wrongAnswerConatiner";
    var wrongAnswerTextNode = document.createTextNode(wrongAnsweredQuestion);
    wrongAnswerConatiner.appendChild(wrongAnswerTextNode);
    this.resultPage.appendChild(wrongAnswerConatiner);
  }
  
  //fetches wrong answers from quizQuestions[]
  this.getWrongAnswers = function() {
    for (var i = 0, len = this.quizQuestions.length; i < len; i++) {
      if (parseInt(this.quizQuestions[i].correctAnswer, 10) != parseInt(this.quizQuestions[i].userAnswer, 10)) {
        var wrongAnsweredQuestion = this.createWrongQuestionString(i);
        this.createWrongAnswerContainer(wrongAnsweredQuestion);
      }
    }
  }
  
  //creates  string displaying incorrect answers along with the question 
  this.createWrongQuestionString = function(i) {
    if (this.quizQuestions[i].userAnswer == "") {
      this.quizQuestions[i].userAnswer = "unattempted";
    }
    var wrongAnsweredQuestion = "Question " + (this.quizQuestions[i].id) + ": " + (this.quizQuestions[i].operand1) + " " +  (this.quizQuestions[i].operator) + " " +  this.quizQuestions[i].operand2 + " " + " = " + this.quizQuestions[i].correctAnswer + " (Your Answer: " + this.quizQuestions[i].userAnswer + ")";
    return wrongAnsweredQuestion;
  }
}