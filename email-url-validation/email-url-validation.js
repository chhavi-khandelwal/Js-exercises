function Validation(id) {
  this.element = document.getElementById(id);
}
Validation.prototype.isFormValidate = function(validity) {
  if (validity == "filled") {
    if (this.element.id == "login" || this.element.id == "name" || this.element.id == "homepage") {
      var trimmedText = this.element.value.trim(); 
      var message = this.element.id + " can't be empty";
      if (!trimmedText) {
        alert(message);
        return false;
      }
      else
        return true;  
    }
  }
  if (validity == "emailChecked") {
    if (this.element.id == "email") {
      var emailRegEx = /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
      if(!emailRegEx.test(this.element.value)) {
      alert("Enter a valid Email Id");
      this.element.focus();
      return false;
    }
    else
      return true;
    }
  }
  if (validity == "urlChecked") {
    var urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    if(!urlRegEx.test(this.element.value)) {
      alert("Enter a valid Url Id");
      this.element.focus();
      return false;
    }
    else
      return true;
  }
  if (validity == "minlength") {
    if (this.element.id == "aboutme") {
      var textData = this.element.value.length;
      var trimmedText = this.element.value.trim(); 
      if (!trimmedText || trimmedText.length < 50) {
        alert("Minimum length of text in " + this.element.id + " should be 50");
        return false;
      }
      else
        return true;
    }
  }
  if (validity == "ischecked") {
    var confirmation;
    if (this.element.id == "checkbox") {
      if (!this.element.checked)
        confirmation = confirm("Don't you want to receive the notification?");
      else 
        confirmation = confirm("Do you want to receive the notification?");
    }
        if(confirmation) 
          return true; 
        else 
          return false;
  }
}
var textboxes = document.getElementsByClassName("textboxdata");
var field = new Array();
for (var i = 0, len = textboxes.length; i < len; i++) {
  field[i] = new Validation(textboxes[i].id);
}
var area = new Validation("aboutme");
var checkNotify = new Validation("checkbox");
var emailCheck = new Validation("email");
var urlCheck = new Validation("homepage");
function formValidate(event) {
  for (var i = 0, len = textboxes.length; i < len; i++) {
    if (!field[i].isFormValidate("filled")) {
      event.preventDefault();
      return false;
    }
  }
  if (!emailCheck.isFormValidate("emailChecked")) {
    event.preventDefault();
    return false;
  }
  if(!urlCheck.isFormValidate("urlChecked")) {
    event.preventDefault();
    return false;  
  }
  if (!area.isFormValidate("minlength")) {
    event.preventDefault(); 
    return false;
  }  
  if (!checkNotify.isFormValidate("ischecked"))
    event.preventDefault();
}
var formId = document.getElementById("myform");
formId.addEventListener("submit", formValidate, false);