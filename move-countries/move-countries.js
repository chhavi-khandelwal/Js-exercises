function Div(id) {
  this.divId = document.getElementById(id);
  this.addList = document.getElementById("addlist");
  this.removeList = document.getElementById("removelist");
} 
Div.prototype.addOrRemove = function(task) {
  if (task.id == "add")
    while (!(this.addList.selectedIndex == -1)) {
    this.removeList.appendChild(this.addList.options[this.addList.selectedIndex]);
  }
  if (task.id == "remove")
  while (!(this.removeList.selectedIndex == -1)) {
    this.addList.appendChild(this.removeList.options[this.removeList.selectedIndex]);  
  }
}
var buttonClick = new Div("main-container");