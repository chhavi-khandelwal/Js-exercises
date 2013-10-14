window.onload = function() {
  initialize();
}

function initialize() {
  var drinks = new Array("COKE", "PEPSI", "DEW");
  var movies = new Array("DAR", "SIR");
  var bikes = new Array("HAYABUSA", "PULSAR", "CBZ");
  var colors = new Array("RED", "YELLOW", "GREEN", "BLUE");
  colorCheckbox = new ParentCheckbox("color", colors);
  drinksCheckbox = new ParentCheckbox("drinks", drinks);
  moviesCheckbox = new ParentCheckbox("movies", movies);
  bikesCheckbox = new ParentCheckbox("bikes", bikes);
}

function ParentCheckbox(id, childrenCheckboxList) {
  this.root = document.getElementById(id);
  this.childrenCheckboxList = childrenCheckboxList;
  this.subList = this.makeSubList();
}
ParentCheckbox.prototype.openAndCheckSubList = function() {
  this.checkChildren();
  this.subList.style.display = this.root.checked ? "block" : "none";
  this.root.parentNode.scrollIntoView();
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
  for (var j = 0, len = this.childrenCheckboxList.length; j < len; j++) {
    var listItem = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = this.root.id;
    var label = document.createElement("label");
    var textNode = document.createTextNode(this.childrenCheckboxList[j]);
    label.appendChild(textNode);
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    mainList.appendChild(listItem);  
  }
  this.root.parentNode.appendChild(mainList);
  mainList.style.display = "none";
  return mainList;
}

