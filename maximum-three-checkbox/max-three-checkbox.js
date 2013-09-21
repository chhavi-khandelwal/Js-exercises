function CheckboxGroup(className) {
  this.noneCheckbox = document.getElementById("none");
  this.checkboxes = document.querySelectorAll("input[type='checkbox']." + className);
}
CheckboxGroup.prototype.checkMax = function(selectedCheckbox) {
  var count = 0;
  var maxSelectionsAllowed = 3;
  this.noneCheckbox.checked = false;
  for (var i = 0, len = this.checkboxes.length; i < len; i++) {
    if (this.checkboxes[i].checked && !(this.checkboxes[i] == selectedCheckbox)) {
      count++;
    }
  }
  if (count >= maxSelectionsAllowed) {
    var selectedDays = new Array();
    selectedCheckbox.checked = false;
    for (var i = 0, len = this.checkboxes.length; i < len; i++) {
      if (this.checkboxes[i].checked) {
        selectedDays.push(this.checkboxes[i].value);
      }
    }
    alert("Only 3 days can be selected. You have already selected " + selectedDays[0] + "," + selectedDays[1] + " and " + selectedDays[2]);
  }
}
CheckboxGroup.prototype.selectNone = function() {
  for (var i = 0, len = this.checkboxes.length; i < len; i++) {
    this.checkboxes[i].checked = false;
  }
}
var daysCheckboxes = new CheckboxGroup("days");
