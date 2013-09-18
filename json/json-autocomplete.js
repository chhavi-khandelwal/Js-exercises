var jsonusers = [ {"user":"Luigi Damiano"},
 {"user":"Zenith Coboro"}, 
 {"user":"Zig Ziglar"}, 
 {"user":"Steve Costner"}, 
 {"user":"Bill Grazer"}, 
 {"user":"Timothy Frazer"}, 
 {"user":"Boris Becker"}, 
 {"user":"Glenn Gladwich"}, 
 {"user":"Jim Jackson"}, 
 {"user":"Aaron Kabin"}, 
 {"user":"Roy Goldwin"}, 
 {"user":"Jason Goldberg"}, 
 {"user":"Tim Ferris"}, 
 {"user":"Buck Singham"}, 
 {"user":"Malcom Gladwell"}, 
 {"user":"Joy Rabura"}, 
 {"user":"Vid Luther"}, 
 {"user":"Tom Glicken"}, 
 {"user":"Ray Baxter"}, 
 {"user":"Ari Kama"}, 
 {"user":"Kenichi Suzuki"}, 
 {"user":"Rick Olson"} ];
var jsonstr = JSON.stringify(jsonusers);
var jsonText = JSON.parse(jsonstr);
function TextBox(id) {
  that = this;
  this.textId = document.getElementById(id);
  this.textId.addEventListener("keyup", this.autoComplete);
  count = 0;
}
TextBox.prototype.autoComplete = function(event) {
  var enteredName;
  enteredName = that.textId.value.toLowerCase();
  var listdiv = document.getElementById("listdiv");
  if (!that.textId.value == "" && event.keyCode != 40 && event.keyCode != 38) {
    listdiv.innerHTML = "";
    var newArray = [];
    count = 0;
    for (var i = 0; i < jsonusers.length; i++) {
      if (jsonText[i].user.toLowerCase().indexOf(enteredName) == 0) {
        newArray.push(jsonText[i].user);
      }
    }
    for (var i = 0; i < newArray.length; i++) {
      textNode = document.createTextNode(newArray[i]);
      if (!that.textId.value == "") {
        div = document.createElement("div");
        div.className = "divnode";
        div.appendChild(textNode);
        listdiv.appendChild(div);
      }
    }
  }  
  var divnode = document.getElementsByClassName("divnode");
  if (event.keyCode == 40 && count < divnode.length) {
    that.textId.value = enteredName;
    divnode[count].style.backgroundColor = "#707070";
    that.textId.value = divnode[count].innerHTML;
    count++;
    for (var i = 0; i < divnode.length; i++) {
      if (i != count - 1) 
        divnode[i].style.backgroundColor = "white";
    }
  }
  if (event.keyCode == 38 && count > 0) {
    --count;
    that.textId.value = enteredName;
    if (count < divnode.length && !(count < 1)) {
      divnode[count - 1].style.backgroundColor = "#707070";
      that.textId.value = divnode[count - 1].innerHTML;
    }
    for (var i = 0; i < divnode.length; i++) {
      if (i != (count - 1)) 
        divnode[i].style.backgroundColor = "white";
    }
  }
  if (that.textId.value == "" || event.keyCode == 13) {
    if (listdiv) {
      for (var i = 0; i < divnode.length; i++)
        listdiv.removeChild(divnode[i]);
      if (divnode[0])
        listdiv.removeChild(divnode[0]);  
    }  
  }
}
var autoObj = new TextBox("textbox");