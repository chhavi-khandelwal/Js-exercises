function promptUrl() {
  this.validUrl = prompt("Enter a URL", "");
  this.trimmedUrl = this.validUrl.trim();
  if (this.validUrl == null || this.validUrl == "" || this.trimmedUrl == "") {
    alert("Enter a valid url");
    return new promptUrl();
  }
  else return this.validUrl;
}
promptUrl.prototype.openNewWindow = function() {
  if(this.validUrl) {
    window.open(this.validUrl,'','width = 400', 'height = 450');
  }   
}
var urlValue = new promptUrl();
urlValue.openNewWindow();