function Form(id) {
  this.formId = document.getElementById(id);
  this.formId.addEventListener("submit", this.alertUrl, false);
}
Form.prototype.alertUrl = function(event) {
  var urlRegEx = /^(?:(?:http|https|ftp):\/\/)?(?:www\.)?(?:((?:[\w\d\_\-]+\.)*[\w\d\-\_]+)\.)?([\w\d\_\-]+\.[\w\d]{2,4})(?:\/[\w\d\-\_\?\=\&\#\.]+)*$/i;
  var urlValue = document.getElementById("url").value;
  if (!urlRegEx.test(urlValue)) {
    alert("Enter a valid Url");
    event.preventDefault();
  }
  else {
    if (RegExp.$1) {
      alert("domain name: " + RegExp.$2 + " subdomain: " + RegExp.$1);
    }
    else {
      alert("domain name: " + RegExp.$2);
    }
  }
}
var form = new Form("myform");