function Url() {
  this.validUrl;
}
Url.prototype.openNewWindow = function() {
  this.validUrl = prompt("Enter a URL");
  var trimmedUrl = this.validUrl.trim();
  if (!trimmedUrl) {
    alert("Enter a valid url");
    return urlValue.openNewWindow();
  }
  else {
    window.open(this.validUrl,'',"width = 400, height = 450, scrollbars = 0, resizable = 0, location = 0, status = 0, menubar = 0");
  }   
}
var urlValue = new Url();
urlValue.openNewWindow();