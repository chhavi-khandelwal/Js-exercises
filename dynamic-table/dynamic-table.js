function Table(tableid) {
  this.tableid = document.getElementById("dynamictable");
  this.count = 0;
}
Table.prototype.addRow = function() {
  this.count++;
  var row = this.tableid.insertRow(1);
  row.id = this.count;
  var cell1 = row.insertCell(0);
  var name = document.createElement("input");
  name.type = "textbox";
  name.autofocus = true;
  cell1.appendChild(name); 
  var cell2 = row.insertCell(1);
  var email = document.createElement("input");
  email.type = "textbox";
  cell2.appendChild(email); 
  var cell3 = row.insertCell(2);
  var button = document.createElement("input");
  button.type = "button";
  button.value = "save";
  button.className = "savefield";
  var counter = this.count;
  button.id = "saveButton"[counter];
  console.log(button.id);
  cell3.appendChild(button);
  button.onclick = function() {
    name.disabled = true;
    name.style.background = "white";
    name.style.color = "black";
    name.style.border = "none";
    email.disabled = true;
    email.style.background = "white";
    email.style.color = "black";
    email.style.border = "none";
    var myrow = document.getElementById(counter);
    var lastTableCell = myrow.lastChild;
    var saveButton = document.getElementById("saveButton"[counter]);
    console.log(saveButton);
    var edit = document.createElement("a");
    edit.href = "#";
    var emailTextNode = document.createTextNode("edit");
    edit.appendChild(emailTextNode);
    edit.onclick = function() {
      name.disabled = false;
      name.style.border = "1px solid #ada9a5";
      name.style.borderRadius = "3px"; 
      email.disabled = false;
      email.style.border = "1px solid #ada9a5";
      email.style.borderRadius = "3px";
      var emptyText = document.createTextNode("");
      lastTableCell.replaceChild(saveButton, edit);
      lastTableCell.replaceChild(emptyText, del);            
      lastTableCell.appendChild(saveButton);
      return false;
    }
    var del = document.createElement("a");
    del.href = "#";
    var delTextNode = document.createTextNode("/del");
    del.appendChild(delTextNode);
    del.onclick = function() {
      var tablebody = document.getElementsByTagName("tbody");
      tablebody[0].removeChild(myrow);
      return false;
    }
    lastTableCell.replaceChild(edit, saveButton);
    lastTableCell.appendChild(del);
  }  
}
var lastTableCell = new Table("dynamictable");