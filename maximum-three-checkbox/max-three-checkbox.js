function Form(id) {
  this.root = document.getElementById(id);
  this.noneCheckbox = document.getElementById("none");
  this.checkboxes = document.querySelectorAll("#" + this.root.id + " input[type='checkbox'].days");
}
Form.prototype.checkMax = function(dayname) {
  var count = 0;
  var maxSelectedCheckboxes = 3;
  this.noneCheckbox.checked = false;
  for (var i = 0, len = this.checkboxes.length; i < len; i++) {
    if(!(dayname == none)) {
      if (this.checkboxes[i].checked && !(this.checkboxes[i] == dayname)) {
        count++;
      }
    }
  }
  if (count >= maxSelectedCheckboxes) {
    var selectedDays = new Array();
    dayname.checked = false;
    for (var i = 0, len = this.checkboxes.length; i < len; i++) {
      if (this.checkboxes[i].checked) {
        selectedDays.push(this.checkboxes[i].value);
      }
    }
    alert("Only 3 days can be selected. You have already selected " + selectedDays[0] + "," + selectedDays[1] + " and " + selectedDays[2]);
  }
}
Form.prototype.selectNone = function() {
  for (var i = 0, len = this.checkboxes.length; i < len; i++) {
    this.checkboxes[i].checked = false;
  }
}
var checkObj = new Form("myform");
