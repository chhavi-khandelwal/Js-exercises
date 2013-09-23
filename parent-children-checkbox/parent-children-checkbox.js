function ParentCheckbox(id, childArray) {
  this.root = document.getElementById(id);
  this.childArray = childArray;
  this.subList = this.makeSubList();
}
ParentCheckbox.prototype.openAndCheckSubList = function() {
  this.checkChildren();
  this.subList.style.display = this.root.checked ? "block" : "none";
  location.hash = this.root.parentNode.id;
}
ParentCheckbox.prototype.checkChildren = function() {
  var childCheckboxes = document.querySelectorAll("#" + this.subList.id + " input[type='checkbox']." + this.root.id);
  for (var i = 0, len = childCheckboxes.length; i < len; i++) {
    childCheckboxes[i].checked = this.root.checked;
  }
}
ParentCheckbox.prototype.makeSubList = function() {
  var mainList = document.createElement("ul");
  mainList.id = "list" + this.root.value;
  for (var j = 0, len = this.childArray.length; j < len; j++) {
    var listItem = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = this.root.id;
    var label = document.createElement("label");
    var textNode = document.createTextNode(this.childArray[j]);
    label.appendChild(textNode);
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    mainList.appendChild(listItem);  
  }
  this.root.parentNode.appendChild(mainList);
  mainList.style.display = "none";
  return mainList;
}
var drinks = new Array("COKE", "PEPSI", "DEW");
var movies = new Array("DAR", "SIR");
var bikes = new Array("HAYABUSA", "PULSAR", "CBZ");
var colors = new Array("RED", "YELLOW", "GREEN", "BLUE");
var colorCheckbox = new ParentCheckbox("color", colors);
var drinksCheckbox = new ParentCheckbox("drinks", drinks);
var moviesCheckbox = new ParentCheckbox("movies", movies);
var bikesCheckbox = new ParentCheckbox("bikes", bikes);