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
  console.log(firstName);
 console.log(secondName);
  var message = "hello " + this.trueName + " " + secondName.trueName;
  var para = document.getElementById("mydiv");
  alert(message);
  para.innerHTML = message;
}
var firstName = new promptName("FirstName");
var secondName = new promptName("SecondName");
firstName.alertName(secondName);
