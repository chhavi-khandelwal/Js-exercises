window.addEventListener("load", initializeContactManager());

// creates object of the class contact Manager and adds event listener to the button which saves the contact info
function initializeContactManager() {
	
  var contact = new contactManager();
  contact.saveButtonListener();
	contact.createViewButtons();

}

function contactManager() {
  this.displayContainer = document.getElementById("display-container");   // contains all contacts
  this.userContact = [];   // saves usercontact info (name, email and contact no.)
  this.autoGeneratedId = 1;          //gives id to every contact
  this.gridView = true;

  this.saveButtonListener = function() {
    var saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", this.saveContact.bind(this));
  }

  this.saveContact = function(event) {
    event.preventDefault();
    if (this.validateContactInfo()) 
      this.maintainContactManager();
  }

  // checks for validation of name, email and contact no. and displays in list view and grid view
	this.validateContactInfo = function() {
    this.name = this.validateName();
    if (!this.name) {
      alert("enter a valid name");
      return false;
    }

    this.email = this.validateEmail();
    if(this.email === false) {
      alert("enter a valid email");
      return false;
    }

    this.mobileNumber = this.validateMobile();
    if (!this.mobileNumber) {
      alert("enter a valid Mobile Number");
      return false;
    }
    else return true;
  }
  
  this.maintainContactManager = function() {
	  this.pushToUserContact();
	  this.clearFields();
	  this.displayContainer.innerHTML = "";
    if (this.gridView) {
  	  this.createGridView();
    }
    else {
      this.createListView();
    }
		this.autoGeneratedId++;

  }


//creates grid view and list view buttons
  this.createViewButtons = function() {
  	this.viewButtonBox = document.getElementById("view-box");
  	var listViewButton = document.createElement("input");
  	listViewButton.type = "button";
  	listViewButton.value = "List View";
  	this.viewButtonBox.appendChild(listViewButton);
  	listViewButton.addEventListener("click", this.createListView.bind(this));
  	var gridViewButton = document.createElement("input");
  	gridViewButton.type = "button";
  	gridViewButton.value = "Grid View";
  	this.viewButtonBox.appendChild(gridViewButton);
  	gridViewButton.addEventListener("click", this.createGridView.bind(this));

  } 
  
  //creates list view contacts
  this.createListView = function() {
    this.gridView = false;
    this.displayContainer.innerHTML = "";

    for (var i = 0, len = this.userContact.length; i < len; i++) {

			var myContact = this.createListViewBox(this.userContact[i].id, i);
      this.displayContainer.appendChild(myContact);
      
    }
  } 

   //creates listview container
  this.createListViewBox = function(id, i) {
    var myContact = document.createElement("div");
    myContact.id = "contact" + id;
    myContact.className = "listDiv";

    this.createViewContactBox(this.userContact[i].id, myContact);
    this.createViewContactBox(this.userContact[i].name, myContact);
    this.createViewContactBox(this.userContact[i].email, myContact);
    this.createViewContactBox(this.userContact[i].mobile, myContact);
    this.createDeleteButton(myContact, id);
    
    return myContact;
  }

   //creates gridview container
  this.createGridViewBox = function(id, i) {
    var myContact = document.createElement("div");
    myContact.id = "contact" + id;
    myContact.className = "gridDiv";
    
    this.createViewContactBox("id: " + this.userContact[i].id, myContact);
    this.createViewContactBox("Name: " + this.userContact[i].name, myContact);
    this.createViewContactBox("Email: " + this.userContact[i].email, myContact);
    this.createViewContactBox("Mobile: " + this.userContact[i].mobile, myContact);
    this.createDeleteButton(myContact, id);
    
    return myContact;
  }

  //creates Grid view contacts
  this.createGridView = function() {
    this.gridView = true;
    this.displayContainer.innerHTML = "";

  	for (var i = 0, len = this.userContact.length; i < len; i++) {

  		var myContact = this.createGridViewBox(this.userContact[i].id, i);
      this.displayContainer.appendChild(myContact);
      
    }
  }
  
  //creates divs for contact info inside the listView and gridView divs
  this.createViewContactBox = function(myValue, myContainer) {
    var listContainer = document.createElement("div");
    var contText = document.createTextNode(myValue);
    listContainer.appendChild(contText);
    myContainer.appendChild(listContainer);
  }

  //removes saved contact
  this.removeContact = function(event) {
    var container = document.getElementById("contact" + event.target.id);
    this.displayContainer.removeChild(container);

    for (var i = 0, len = this.userContact.length; i < len; i++) {
      if (this.userContact[i].id == event.target.id) {
        this.userContact.splice(i,1);
        break;
      }
    }
  }
  
  //saves contact to userContact[]
  this.pushToUserContact = function() {
    this.userContact.push({"id": this.autoGeneratedId, "name": this.name, "email": this.email, "mobile": this.mobileNumber});
  }
  
  //clears every field once valid info is added to the contact file
  this.clearFields = function() {
    this.nameNode.value = "";
    this.emailNode.value = "";
    this.mobileNode.value = "";
  }
  
  //creates delete button
  this.createDeleteButton = function(container, id) {
    var deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Delete";
    deleteButton.id = id;
    deleteButton.className = "listDelButton";
    container.appendChild(deleteButton);
    deleteButton.addEventListener("click", this.removeContact.bind(this));
  }


  //validates name
	this.validateName = function() {
    this.nameNode = document.getElementById("name");
    var enteredName = this.nameNode.value.trim();
    if (enteredName == "") {
    	return false;
    }
    else {
    	return enteredName;
    }
	}

  //validates mobile info
	this.validateMobile = function() {
    this.mobileNode = document.getElementById("mobile");
    var mobNumber = this.mobileNode.value;
    var mobRegex = /^[\d]{10}$/;
    var validMob = mobRegex.test(mobNumber);
    if (!validMob) {
    	return false;
    }
    else {
    	return mobNumber;
    }
	}

  this.validateEmail = function() {
    this.emailNode = document.getElementById("email");
    var email = this.emailNode.value;
    var emailRegEx =  /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4})?$/i;
    if (emailRegEx.test(email)) {
      return email;
    }
    else {
      // alert("enter a valid email");
      return false;
    }
  }
}