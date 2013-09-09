function Form(rootVal) {
  this.root = document.getElementById(rootVal);
}
Form.prototype.checkAllOrNone = function(check) {
  var checkboxes = document.querySelectorAll("#" + this.root.id + " input[type='checkbox']");
  for (var i = 0, len = checkboxes.length; i < len; i++  ) {
    checkboxes[i].checked = check;
  }      
}
var formObj = new Form("myform");