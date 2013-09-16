function GetElement(id) {
  this.element = document.getElementById(id);
}
GetElement.prototype.checkNumber = function() {
  var result = document.getElementById("result");
  var numRegEx = /^[\-|\+]?[/d]*([\.[\d]+)?$/;
  if (!numRegEx.test(this.element.value)) {
    result.value = "false";
    alert("Invalid number");
    return false;
  }
  else {
    result.value = "true";
    return true;
  }    
}
var numValue = new GetElement("number");
function formValidation(event) {
  if(!numValue.checkNumber()) {
    event.preventDefault();
  }
}
var formId = document.getElementById("myform");
formId.addEventListener("submit", formValidation, false);