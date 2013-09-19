function Form(id) {
  that = this;
  this.formId = document.getElementById(id);
  this.numField = document.getElementById("number");
  this.result = document.getElementById("result");
  this.formId.addEventListener("submit", this.checkNumber);
}
Form.prototype.checkNumber = function(event) {
  var numRegEx = /^[\-|\+]?[/d]*([\.[\d]+)?$/;
  if (!numRegEx.test(that.numField.value)) {
    that.result.value = "false";
    alert("Invalid number");
    event.preventDefault();
  }
  else
    that.result.value = "true";  
}
var numValue = new Form("myform");