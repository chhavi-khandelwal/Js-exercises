function Div(id) {
  divObj = this;
  this.divId = document.getElementById(id);
  this.button1 = document.getElementById("add");
  this.button2 = document.getElementById("remove"); 
  this.button1.addEventListener("click", this.ButtonClick);
  this.button2.addEventListener("click", this.ButtonClick);
  this.addList = document.getElementById("addlist");
  this.removeList = document.getElementById("removelist");
} 
Div.prototype.ButtonClick = function () {
  if(this.id == "add")
    divObj.removeList.appendChild(divObj.addList.options[divObj.addList.selectedIndex]);
  else  
    divObj.addList.appendChild(divObj.removeList.options[divObj.removeList.selectedIndex]);
}
var buttonClick = new Div("main-container");