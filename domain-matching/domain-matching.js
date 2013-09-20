function Form(id) {
  this.formId = document.getElementById(id);
  this.formId.addEventListener("submit", this.alertUrl, false);
}
Form.prototype.alertUrl = function(event) {
  var urlRegEx = /^(?:(?:http|https|ftp):\/\/)?(?:www\.)?((([\w\d\-\_]+\.)+(\w{2}\.)(\w{2}))|(([\w\d\-\_]+\.)+(\w{2,4})))(?:\/[\w\d\-\_\?\=\&\#\.]+)*$/i;
  var urlValue = document.getElementById("url").value;
  if (!urlRegEx.test(urlValue)) {
    alert("Enter a valid Url");
    event.preventDefault();
  }
  else {
    var subdom = [];
    var regexMatch1 = RegExp.$1;
    var regexMatch2 = RegExp.$2;
    var regexMatch3 = RegExp.$3;
    var regexMatch4 = RegExp.$4;
    var regexMatch5 = RegExp.$5;
    var regexMatch6 = RegExp.$6;
    var regexMatch7 = RegExp.$7;
    var regexMatch8 = RegExp.$8;
    var regexMatch9 = RegExp.$9;
    var splitUrl = regexMatch1.split(/\./);  
    if(!regexMatch2) {
      if (splitUrl.length > 2) {
        for (var i = 0; i < splitUrl.length - 2; i++) {
        subdom.push(splitUrl[i]);
        }
        alert("domain name: " + regexMatch7 + regexMatch8 + " subdomain: " + subdom.join("."));
      }
      else {
        alert("domain name: " + regexMatch7 + regexMatch8);
      }
    } 
    else {
      if (splitUrl.length > 3) {
        for (var i=0; i < splitUrl.length - 3; i++) {
        subdom.push(splitUrl[i]);
        }
        alert("domain name: " + regexMatch3 + regexMatch4 + regexMatch5 + " subdomain: " + subdom.join("."));
      }  
      else {
        alert("domain name: " + regexMatch3 + regexMatch4 + regexMatch5);  
      }
    }
  }  
}
var form = new Form("myform");