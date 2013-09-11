function Root(id, options) {
  this.root = document.getElementById(id);
  this.options = options;
}
Root.prototype.openList = function(option) {
  var checkboxes = document.getElementsByClassName("parent-checkbox");
  var checkChild = document.getElementsByClassName("checkboxlabel");
  location.hash = checkChild[option].id;
  if (checkboxes[option].checked) {        
    var mainList = document.createElement("ul");
    for (var j = 0; j < this.options.length; j++) {
    mainList.id = option;
    var list = document.createElement("li");
    list.style.listStyleType = "none";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var label = document.createElement("label");
    label.innerHTML = this.options[j];
    list.appendChild(checkbox);
    list.appendChild(label);
    mainList.appendChild(list);
   }  
    checkChild[option].appendChild(mainList);
    location.hash = checkChild[option].id;
  }
  if (!checkboxes[option].checked) {
  var unorderedList = document.getElementById(option);
  checkChild[option].removeChild(unorderedList);        
  }
}   
var drinks = new Array("COKE", "PEPSI", "DEW");
var movies = new Array("DAR", "SIR");
var bikes = new Array("HAYABUSA", "PULSAR", "CBZ");
var colors = new Array("RED", "YELLOW", "GREEN", "BLUE");
var colorCheckbox = new Root("color", colors);
var drinksCheckbox = new Root("drinks", drinks);
var moviesCheckbox = new Root("movies", movies);
var bikesCheckbox = new Root("bikes", bikes);