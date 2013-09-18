function UserName(name) {
  that = this;
  this.myName = name;
}
UserName.prototype.alertName= function() {
  var trueName = prompt("Enter your " + this.myName);
  var trimmedName = trueName.trim();
  if (!trimmedName) {
    alert("Enter the correct name");
    return that.alertName();
  }
  else
    return trueName; 
}  
var firstName = new UserName("FirstName");
var first = firstName.alertName();
var secondName = new UserName("SecondName");
var second = secondName.alertName();
var message = "hello " + first + " " + second;
var div = document.getElementById("mydiv");
alert(message);
div.innerHTML = message;
