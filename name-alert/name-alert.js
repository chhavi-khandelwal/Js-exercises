function User() {
  this.firstName = "";
  this.secondName = "";
}
User.prototype.promptName = function(myName) {
  var name;
  do {
    name = prompt("Enter your " + myName);
    var trimmedName = name.trim();
  } while (!this.checkTrimmedName(trimmedName));  
  if (myName == "firstName") {
    this.firstName = trimmedName;
  }
  else {
    this.secondName = trimmedName;
  }  
} 
User.prototype.checkTrimmedName = function(trimmedName) {
  if (!trimmedName) {
    alert("Enter the correct name");
    return false;
  }
  else {
    return true;
  }  
}
User.prototype.welcome = function() {
  var message = "hello " + this.firstName + " " + this.secondName;
  var div = document.getElementById("mydiv");
  alert(message);
  div.innerHTML = message;
}
var user = new User(); 
user.promptName("firstName");
user.promptName("secondName");
user.welcome();
