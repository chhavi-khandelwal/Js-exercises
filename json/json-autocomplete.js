var jsonusers = [ {"user":"Luigi Damiano"},
 {"user":"Zenith Coboro"}, 
 {"user":"Zig Ziglar"}, 
 {"user":"Steve Costner"}, 
 {"user":"Bill Grazer"}, 
 {"user":"Timothy Frazer"}, 
 {"user":"Boris Becker"}, 
 {"user":"Glenn Gladwich"}, 
 {"user":"Jim Jackson"}, 
 {"user":"Aaron Kabin"}, 
 {"user":"Roy Goldwin"}, 
 {"user":"Jason Goldberg"}, 
 {"user":"Tim Ferris"}, 
 {"user":"Buck Singham"}, 
 {"user":"Malcom Gladwell"}, 
 {"user":"Joy Rabura"}, 
 {"user":"Vid Luther"}, 
 {"user":"Tom Glicken"}, 
 {"user":"Ray Baxter"}, 
 {"user":"Ari Kama"}, 
 {"user":"Kenichi Suzuki"}, 
 {"user":"Rick Olson"} ];
var jsonstr = JSON.stringify(jsonusers);
var jsonText = JSON.parse(jsonstr);
function TextBox(id) {
  that = this;
  this.textId = document.getElementById(id);
  this.suggestionList = document.getElementById("listdiv");
  this.textId.addEventListener("keyup", this.autoComplete);
  this.count = 0;
}
TextBox.prototype.autoComplete = function(event) {
  if (event.keyCode != 40 && event.keyCode != 38) {
    that.searchList();
  }  
  var suggestionNode = document.getElementsByClassName("suggestionNode");
  if (event.keyCode == 40 && that.count < suggestionNode.length) {
    that.count++;
    that.manageSuggestionList(suggestionNode);
  }
  if (event.keyCode == 38 && that.count > 1) {
    --that.count;
    that.manageSuggestionList(suggestionNode);
  }
  if (event.keyCode == 8 && (that.textId.value)) {  //backspace
    that.count = 0;
  }
  if (that.textId.value == "" || event.keyCode == 13) {  //enter key
    that.removeSuggestionList();
  }
}
TextBox.prototype.manageSuggestionList = function(suggestionNode) {
  suggestionNode[this.count - 1].style.backgroundColor = "#707070";
  this.textId.value = suggestionNode[this.count - 1].textContent;
  for (var i = 0, len = suggestionNode.length; i < len; i++) {
    if (i != this.count - 1) 
      suggestionNode[i].style.backgroundColor = "white";
  }
}
TextBox.prototype.removeSuggestionList = function() {
  while (this.suggestionList.firstChild) {
    this.suggestionList.removeChild(this.suggestionList.firstChild);
  }
}
TextBox.prototype.displaySuggestionList = function(nameList) {
  this.removeSuggestionList();
  for (var i = 0, len = nameList.length; i < len; i++) {
    var textNode = document.createTextNode(nameList[i]);
    if (!this.textId.value == "") {
      var suggestion = document.createElement("div");
      suggestion.className = "suggestionNode";
      suggestion.appendChild(textNode);
      this.suggestionList.appendChild(suggestion);
    }
  }  
}
TextBox.prototype.searchList = function() {
  var enteredName;
  enteredName = that.textId.value.toLowerCase();
  var nameList = [];
  for (var i = 0, len = jsonusers.length; i < len; i++) {
    if (jsonText[i].user.toLowerCase().indexOf(enteredName) == 0) {
      nameList.push(jsonText[i].user);
    }
  }
  this.displaySuggestionList(nameList);
}
var autoObj = new TextBox("textbox");