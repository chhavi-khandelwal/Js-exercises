function Root(id, options) {
  this.root = document.getElementById(id);
  this.options = options;
  this.checkedChild = this.openSubList(this.root);
}
Root.prototype.openList = function() {
  location.hash = this.root.id;
  this.checkedChild.style.display = this.root.checked ? "block" : "none";
  this.checkChilds();
}
Root.prototype.checkChilds = function() {
  var childCheckboxes = document.querySelectorAll("#" + this.checkedChild.id + " input[type='checkbox']");
  for (var i = 0, len = childCheckboxes.length; i < len; i++) {
    childCheckboxes[i].checked = this.root.checked; 
  }
}
Root.prototype.openSubList = function(option) {
  var mainList = document.createElement("ul");
  mainList.id = "list" + option.value;
  for (var j = 0; j < this.options.length; j++) {
    var list = document.createElement("li");
    list.style.listStyleType = "none";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var label = document.createElement("label");
    var textNode = document.createTextNode(this.options[j]);
    label.appendChild(textNode);
    list.appendChild(checkbox);
    list.appendChild(label);
    mainList.appendChild(list);
  }
  option.parentNode.appendChild(mainList);
  mainList.style.display = "none";
  return mainList;
}
var drinks = new Array("COKE", "PEPSI", "DEW");
var movies = new Array("DAR", "SIR");
var bikes = new Array("HAYABUSA", "PULSAR", "CBZ");
var colors = new Array("RED", "YELLOW", "GREEN", "BLUE");
var colorCheckbox = new Root("color", colors);
var drinksCheckbox = new Root("drinks", drinks);
var moviesCheckbox = new Root("movies", movies);
var bikesCheckbox = new Root("bikes", bikes);