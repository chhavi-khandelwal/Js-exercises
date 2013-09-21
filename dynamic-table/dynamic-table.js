function Table(id) {
  that = this;
  this.tableId = document.getElementById(id);
  this.count = 0;
}
Table.prototype.addRow = function() {
  this.count++;
  var row = this.tableId.insertRow(1);
  row.id = this.count;
  var cell = [];
  var addRowParams = [];
  for (var i = 0; i < 3; i++) {
    cell[i] = row.insertCell(i); 
  }
  var name = this.createInputElement("name");
  var email = this.createInputElement("email");
  cell[0].appendChild(name); 
  cell[1].appendChild(email); 
  var saveButton = document.createElement("input");
  saveButton.type = "button";
  saveButton.value = "save";
  var counter = this.count;
  saveButton.id = "saveButton" + [counter];
  addRowParams.push(saveButton, counter, name, email);
  cell[2].appendChild(saveButton);
  saveButton.onclick = function() {
    that.buttonClick(addRowParams);
    return false;
  }
}
Table.prototype.createInputElement = function(item) {
  item = document.createElement("input");
  item.type = "textbox";
  return item;
}
Table.prototype.createAnchorNode = function(item) {
  var itemName = document.createElement("a");
  itemName.href = "#";
  itemName.appendChild(document.createTextNode(item));
  return itemName;
}
Table.prototype.buttonClick = function(addRowParams) {
  var myrow = document.getElementById(addRowParams[1]);
  var lastTableCell = myrow.lastChild;
  var edit = this.createAnchorNode("edit");
  var del = this.createAnchorNode("/ del");
  var editName = document.createTextNode(addRowParams[2].value);
  var emailValue = document.createTextNode(addRowParams[3].value);
  var editParams = [];
  editParams.push(lastTableCell, del, edit, myrow, editName, emailValue);
  myrow.firstChild.replaceChild(editParams[4], addRowParams[2]);
  myrow.childNodes[1].replaceChild(editParams[5], addRowParams[3]);
  lastTableCell.replaceChild(edit, addRowParams[0]);
  lastTableCell.appendChild(del);
  edit.onclick = function() {
    that.editClick(addRowParams, editParams);
    return false;
  }
  del.onclick = function() {
    that.delClick(myrow);
    return false;
  }
}
Table.prototype.delClick = function(myrow) {
  var tablebody = document.getElementsByTagName("tbody");
  tablebody[0].removeChild(myrow);
}
Table.prototype.editClick = function(addRowParams, editParams) {  
  editParams[0].replaceChild(addRowParams[0], editParams[2]);
  editParams[0].removeChild(editParams[1]);            
  editParams[3].firstChild.replaceChild(addRowParams[2], editParams[4]);
  editParams[3].childNodes[1].replaceChild(addRowParams[3], editParams[5]);
}
var userTable = new Table("dynamictable");