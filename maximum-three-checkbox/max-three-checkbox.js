function Form(rootVal) {
   this.root = document.getElementById(rootVal);
}
Form.prototype.checkMax = function(dayname) {
  var count = 0;
  var selectedDays = new Array();
  var checkboxes = document.querySelectorAll("#" + this.root.id + " input[type='checkbox']");
  for( var i = 0, len = checkboxes.length; i < len; i++) { 
        if (checkboxes[i].checked && !(checkboxes[i] == dayname)) {
            count++;  
        }           
        if (checkboxes[i].id == "none") 
            checkboxes[i].checked = false;
  }      
  if (count >= 3) {
    dayname.checked = false;
    for(var i = 0, len = checkboxes.length; i < len; i++) { 
      if (checkboxes[i].checked)     
      selectedDays.push(checkboxes[i].value);  
    }  
    alert("Only 3 days can be selected. You have already selected " + selectedDays[0] + "," + selectedDays[1] + " and " + selectedDays[2]);      
  }
}
Form.prototype.deselect = function(dayname) {
  var checkboxes = document.querySelectorAll("#" + this.root.id + " input[type='checkbox'] ");
  for( var i = 0, len = checkboxes.length - 1; i < len; i++) {  
        checkboxes[i].checked = false;
  }
}
var checkObj = new Form("myform");