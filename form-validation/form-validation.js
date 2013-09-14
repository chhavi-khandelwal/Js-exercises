function Validation(id) {
  this.element = document.getElementById(id);
}
Validation.prototype.isFormValidate = function(validity) {
  if (validity == "filled") {
    if (this.element.id == "login" || this.element.id == "email" || this.element.id == "name" || this.element.id == "homepage") {
      return this.notFilled(this.element.id);
    }
  }
  if (validity == "minlength") {
    if (this.element.id == "aboutme")
      return this.minLength(this.element.id);
  }
  if (validity == "ischecked") {
    if (this.element.id == "checkbox") {
      return this.isChecked(this.element.id);
    }
  }
}
Validation.prototype.notFilled = function() {
  var trimmedText = this.element.value.trim(); 
  var message = this.element.id + " can't be empty";
  if (trimmedText == "") {
    alert(message);
    return false;
  }
  else
    return true;  
}
Validation.prototype.minLength = function() {
  var textData = this.element.value.length;
  var trimmedText = this.element.value.trim(); 
  if (trimmedText == "" || trimmedText.length < 50) {
    alert("Minimum length of text in " + this.element.id + " should be 50");
    return false;
  }
  else
    return true;
}
Validation.prototype.isChecked = function() {
  if (!this.element.checked) {
    confirm("Don't you want to receive the notification?");
    //return false;
  }
  else 
    confirm("Do you want to receive the notification?");
}
var textboxes = document.getElementsByClassName("textboxdata");
var field = new Array();
for (var i = 0, len = textboxes.length; i < len; i++) {
  field[i] = new Validation(textboxes[i].id);
}
var textarea = document.getElementById("aboutme");
area = new Validation(textarea.id);
checkbox = document.getElementById("checkbox");
checkNotify = new Validation(checkbox.id);
function formValidate(event) {
  for (var i = 0, len = textboxes.length; i < len; i++) {
    if (!field[i].isFormValidate("filled", textboxes[i].id)) {
      event.preventDefault();
      return false;
    }
  }
  if (!area.isFormValidate("minlength", textarea.id)) {
    event.preventDefault(); 
    return false;
  }
  if (!checkNotify.isFormValidate("ischecked", checkbox.id)) {
    return true;
  }
}
var formId = document.getElementById("myform");
formId.addEventListener("submit", formValidate, false);

