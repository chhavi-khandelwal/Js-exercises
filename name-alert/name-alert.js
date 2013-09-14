function promptName(name) {
  this.trueName = prompt("Enter your " + name, "");
  this.trimmedName = this.trueName.trim();
  if (this.trueName === null || this.trimmedName === "" || this.trueName === " ") {
    alert("Enter the correct name");
    return new promptName(name);
  }
  else
    return this.trueName; 
  }
promptName.prototype.alertName = function(secondName) {
  var message = "hello " + this.trueName + " " + secondName.trueName;
  var div = document.getElementById("mydiv");
  alert(message);
  div.innerHTML = message;
}
var firstName = new promptName("FirstName");
var secondName = new promptName("SecondName");
firstName.alertName(secondName);
