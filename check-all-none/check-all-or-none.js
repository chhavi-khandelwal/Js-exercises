function Form(id) {
	this.id = id;
}
Form.prototype.checkAllOrNone = function(check) {
	for(var i=0, len=myform.childNodes.length; i < len; i++  ) {
	    if (myform.childNodes[i].type == "checkbox")
		    if(check == true)
		    myform.childNodes[i].checked = true;
		    else
		    if(check == false)
			myform.childNodes[i].checked = false;
	}
}
var formObj = new Form("myform");