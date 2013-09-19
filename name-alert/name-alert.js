function UserName(name) {
  this.myName = name;
  this.initials;
}
UserName.prototype.alertName = function() {
  var trueName = prompt("Enter your " + this.myName);
  var trimmedName = trueName.trim();
  if (!trimmedName) {
    alert("Enter the correct name");
    return this.alertName();
  }
  else
    this.initials = trimmedName;
}  
var firstName = new UserName("FirstName"); 
firstName.alertName();
var secondName = new UserName("SecondName");
secondName.alertName();
var message = "hello " + firstName.initials + " " + secondName.initials;
var div = document.getElementById("mydiv");
alert(message);
div.innerHTML = message;