function userName(name) {
  this.trueName = prompt("Enter your " + name);
  this.trimmedName = this.trueName.trim();
  if (!this.trimmedName) {
    alert("Enter the correct name");
    return new userName(name);
  }
  else
    return this.trueName; 
  }
userName.prototype.alertName = function(secondName) {
  var message = "hello " + this.trueName + " " + secondName.trueName;
  var div = document.getElementById("mydiv");
  alert(message);
  div.innerHTML = message;
}
var firstName = new userName("FirstName");
var secondName = new userName("SecondName");
firstName.alertName(secondName);
