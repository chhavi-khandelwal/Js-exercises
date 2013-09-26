function Table(userTableColumns, id) {
  that = this;
  this.table = document.getElementById(id);
  this.columns = userTableColumns;
  this.count = 0;
  this.createHeader();
}
Table.prototype.addRow = function() {
  this.count++;
  var row = this.table.insertRow(1);
  row.id = this.count;
  this.addCells(row, this.count);  
}
Table.prototype.addCells = function(row, countTrack) {
  for (var key in this.columns) {
    var cell = row.insertCell();
    this.element = this.createInputElement(this.columns[key]);
    this.element.id = key + countTrack;
    cell.appendChild(this.element);
    if (key == "action") {
      var counter = countTrack;
      this.element.value = "Save";
      this.element.onclick = function() {
        that.clickSaveButton(counter);
        return false;
      }
    }
  }
}
Table.prototype.createInputElement = function(keyValue) {
  var item = document.createElement("input");
  item.type = keyValue;
  return item;
}
Table.prototype.createHeader = function() {
  var row = this.table.insertRow(0);
  row.id = this.count;
  for (var key in this.columns) {
    var cell = row.insertCell();
    var keyTextNode = document.createTextNode(key);
    cell.appendChild(keyTextNode);
  }
}
Table.prototype.clickSaveButton = function(counter) {
  var currentRow = document.getElementById(counter);
  var textboxText = [];
  var i = 0;
  for (var key in this.columns) {
    var rowElement = document.getElementById(key + counter);
    var cellNode = rowElement.parentNode;
    if (this.columns[key] == "textbox") {
      textboxText[i] = rowElement.value;
      cellNode.replaceChild(document.createTextNode(rowElement.value), rowElement);
      i++;
    } 
    else if(key == "action") {
      var edit = this.createAnchorNode("edit");
      var del = this.createAnchorNode("/ del");
      cellNode.replaceChild(edit, rowElement);
      cellNode.appendChild(del);
      edit.onclick = function() {
        that.editClick(currentRow, counter, textboxText);
        return false;
      }
      del.onclick = function() {
        that.delClick(currentRow);
        return false;
      }
    }
  }
  return false;
}
Table.prototype.editClick = function(currentRow, counter, textboxText) {
  while(currentRow.firstChild) {
    currentRow.removeChild(currentRow.firstChild);
  }
  this.addCells(currentRow, counter);
  var i = 0;
  for (var key in this.columns) {
    if (this.columns[key] == "textbox") {
    var elementVal = document.getElementById(key + counter);
    elementVal.value = textboxText[i];
    i++;
    }
  }
}
Table.prototype.createAnchorNode = function(item) {
  var itemName = document.createElement("a");
  itemName.href = "#";
  itemName.appendChild(document.createTextNode(item));
  return itemName;
}
Table.prototype.delClick = function(currentRow) {
  var tablebody = document.getElementsByTagName("tbody");
  tablebody[0].removeChild(currentRow);
}
var userTableColumns = {
  name: "textbox",
  email: "textbox",
  action: "button"
};
var userTable = new Table(userTableColumns, "dynamictable");