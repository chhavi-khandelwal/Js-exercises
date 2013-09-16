function GetElement(id) {
  this.element = document.getElementById(id);
}
GetElement.prototype.alertUrl = function() {
  var urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)?(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  var urlValue = this.element.value;
  if (!urlRegEx.test(urlValue)) {
    alert("Enter a valid Url");
  }
  else {
    var regEx1 = /[A-Za-z]{3,9}:\/\//i;
    var str = urlValue.split(regEx1);
    var regEx3 = /(\/[\w\d]+)/;
    var check;
    var dom;
    if (str[0].split(/\./)[0] == "www") 
      var str = str[0].split(/www\./);
    else if (str[1].split(/\./)[0] == "www")
      var str = str[1].split(/www\./);
    dom = str[1].split(regEx3);
    if(dom[0].split(/\./).length > 2)
      check = 1;
    else
      check = 0; 
    var domain = dom[0].split(/\./);
    if (dom.length > 0 && check == 0) {
      alert("Domain: " + dom[0]);
      return true;
    }
    else
    if (check == 1) {
      var subdom = new Array();
      for (i = 0; i < domain.length-2; i++) {
        subdom.push(domain[i]);
      }
      alert("Domain: " + domain[domain.length - 2] + "." + domain[domain.length - 1] + " Subdomain: " + subdom.join("."));
    }  
  }
}
var url = new GetElement("url");
function CheckUrl(event) {
  event.preventDefault();
  url.alertUrl();
}
var formId = document.getElementById("myform");
formId.addEventListener("submit", CheckUrl, false);