function Form(id) {
  this.root = document.getElementById(id);
  this.none = document.getElementById("none");
  this.checkboxes = document.querySelectorAll("#" + this.root.id + " input[type='checkbox'].days");
}
Form.prototype.checkMax = function(dayname) {
  var count = 0;
  var selectedDays = new Array();
  none.checked = false;
  for ( var i = 0, len = this.checkboxes.length; i < len; i++) {
    if(!(dayname == none)) {
      if (this.checkboxes[i].checked && !(this.checkboxes[i] == dayname))
        count++;
    }
    else {
      none.checked = true;
      this.checkboxes[i].checked = false;
    }
  }
  if (count >= 3) {
    dayname.checked = false;
    for (var i = 0, len = this.checkboxes.length; i < len; i++) {
      if (this.checkboxes[i].checked)
        selectedDays.push(this.checkboxes[i].value);
    }
    alert("Only 3 days can be selected. You have already selected " + selectedDays[0] + "," + selectedDays[1] + " and " + selectedDays[2]);
  }
}
var checkObj = new Form("myform");