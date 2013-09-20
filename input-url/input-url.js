function Url() {
  this.validUrl;
}
Url.prototype.promptUrl = function() {
  do {
    this.validUrl = prompt("Enter a URL");
    var trimmedUrl = this.validUrl.trim();
  } while (!this.validateUrl(trimmedUrl));
    return this.windowOpen();     
}
Url.prototype.validateUrl = function(trimmedUrl) {
  if (!trimmedUrl) {
    alert("Enter a valid url");
    return false;
  }
  else {
    return true;
  }  
}
Url.prototype.windowOpen = function() {
    window.open(this.validUrl,'',"width = 400, height = 450, scrollbars = 0, resizable = 0, location = 0, status = 0, menubar = 0");
}
var urlValue = new Url();
urlValue.promptUrl();