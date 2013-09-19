function ListTransfer(id) {
  ListTransferScope = this;
  this.divId = document.getElementById(id);
  this.addButton = document.getElementById("add");
  this.removeButton = document.getElementById("remove"); 
  this.addButton.addEventListener("click", this.moveSelections);
  this.removeButton.addEventListener("click", this.moveSelections);
  this.addList = document.getElementById("addlist");
  this.removeList = document.getElementById("removelist");
} 
ListTransfer.prototype.moveSelections = function () {
  if(this.id == "add")
    ListTransferScope.removeList.appendChild(ListTransferScope.addList.options[ListTransferScope.addList.selectedIndex]);
  else  
    ListTransferScope.addList.appendChild(ListTransferScope.removeList.options[ListTransferScope.removeList.selectedIndex]);
}
var countryTransferList = new ListTransfer("main-container");