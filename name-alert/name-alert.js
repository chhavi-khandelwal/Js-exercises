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
  else if (this.myName == "FirstName" && (trimmedName)) {
    this.initials = trueName;
  }
  else {
    this.initials = trueName;
    var message = "hello " + firstName.initials + " " + this.initials;
    var div = document.getElementById("mydiv");
    alert(message);
    div.innerHTML = message;
  }
}  
var firstName = new UserName("FirstName"); 
firstName.alertName();
var secondName = new UserName("SecondName");
secondName.alertName();