function checkAllNone(check) {
	var myform;
	myform = document.getElementById("myform");
	  for(var i=0, len=myform.childNodes.length; i < len; i++  )
	  { if (myform.childNodes[i].type == "checkbox")
		  if((check == true))
		     myform.childNodes[i].checked = true;
		  else
		  if((check == false))
			myform.childNodes[i].checked = false;
	  }	
	}
	