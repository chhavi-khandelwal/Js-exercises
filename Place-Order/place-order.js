var ingredients = [ {"ingredientName":"Breads", "type":[{"name":"wheat", "price":10, "id":"bread1", "selectFlag": "false"}, 
{"name":"Multi-Grain", "price":20, "id":"bread2", "selectFlag": "false"}, 
{"name":"Brown", "price":12, "id":"bread3", "selectFlag": "false"}]
},
{"ingredientName":"Supplements", "type":[{"name":"vegetarian", "price":30, "id":"supplement1", "selectFlag": "false"}, 
{"name":"non-vegetarian", "price":40, "id":"supplement2", "selectFlag": "false"},
{"name":"sea-food", "price":50, "id":"supplement3", "selectFlag": "false"}]
},
{"ingredientName":"Sausages", "type":[{"name":"Polished", "price":30, "id":"sausage1", "selectFlag": "false"},
{"name":"Cooked", "price":40, "id":"sausage2", "selectFlag": "false"},
{"name":"Sliced", "price":50, "id":"sausage3", "selectFlag": "false"}]
}
];

window.addEventListener("load", initialize());

function initialize() {
  var gridItems = new OrderGrid("items-container");
  gridItems.makeGrid();
  var placeOrderButton = document.getElementById("placeOrder");
  placeOrderButton.addEventListener("click", gridItems.placeOrder);
}

function OrderGrid(id) {
  var that = this;
  this.itemContainer = document.getElementById(id);
  this.costOfOrders = [];
  this.currentOrder = [];
  
  //makes grid for displaying ingredients
  this.makeGrid = function() {
    var columnDiv, j = 0;
    for (var key in ingredients) {
      this.createHead(key);
      for (var i = 0, len =  ingredients[key]["type"].length; i < len; i++) {
        this.foodItemContainer = this.createFoodItemContainer(key, i);
        this.foodItemContainer.addEventListener("click", that.foodItemFunctionality);
      }
    }
  }
  
  //creates div for main ingredients
  this.createHead = function(key) {
    this.head = document.createElement("div");
    var headTextNode = document.createTextNode(ingredients[key].ingredientName);
    this.head.appendChild(headTextNode);
    this.head.className = "orderDiv";
    this.head.id = ingredients[key].ingredientName;
    this.itemContainer.appendChild(this.head);
  }
  
  //creates divs for showing types of main ingredients
  this.createFoodItemContainer = function(key, i) {
    var foodItemContainer = document.createElement("input");
    foodItemContainer.type = "button";
    foodItemContainer.id = ingredients[key]["type"][i].name;
    foodItemContainer.name = ingredients[key].ingredientName;
    foodItemContainer.value = ingredients[key]["type"][i].name + " " + "Rs." + ingredients[key]["type"][i].price;
    foodItemContainer.className = "foodItemDiv dehighlight";
    this.head.appendChild(foodItemContainer);
    return foodItemContainer;
  }
  
  //selects ingredient after clicking on it
  this.foodItemFunctionality = function() {
    that.toggleSelection(this);
    that.pushToCurrentOrder();
    var total = that.calculateTotal();
    that.displayCurrentOrder(total);
    return false;
  }
  
  //sets flag and color for selected or deselected ingredient
  this.toggleSelection = function(self) {
    for (var key in ingredients) {
      if (ingredients[key].ingredientName == self.name) {
        for (var i = 0, len =  ingredients[key]["type"].length; i < len; i++) {
          if (ingredients[key]["type"][i].name == self.id) {
            var flag = that.toggleForSelectedIngredient(key, i);
            this.highlightElements(self, flag);
          }
          else {
            this.toggleForDeselectedElements(key, i);
          }  
        }
      }  
    }
    this.dehighlightElements(self);
  }
  
  //highlights or dehighlights ingredient
  this.highlightElements = function(self, flag) {
    if (flag == "true") {
      self.className = self.className.replace("dehighlight", "highlight");
    }
    else {
      self.className = self.className.replace("highlight", "dehighlight");  
    }
  }
 
 //dehiglights rest of the deselected ingredient
  this.dehighlightElements = function(self) {
    var ingredientElements = document.getElementsByName(self.name);
    for (var i = 0, len = ingredientElements.length; i < len; i++) {
      if (ingredientElements[i].id != self.id && ingredientElements[i].className.split(" ").indexOf("highlight")  != -1) {
      console.log("1")
        ingredientElements[i].className = ingredientElements[i].className.replace("highlight", "dehighlight");  
      }
    }
  }
  
  //sets flag for selected ingredient
  this.toggleForSelectedIngredient = function(key, i) {
    var select = ingredients[key]["type"][i]["selectFlag"];
    if (select == "true") {
      select = "false";
    }
    else {
      select = "true";
    }
    ingredients[key]["type"][i]["selectFlag"] = select;
    return select;
  }

  //sets flag for deselected ingredient
  this.toggleForDeselectedElements = function(key, i) {
    ingredients[key]["type"][i]["selectFlag"] = "false";
  }

  //stores id of ingredient selected in currentOrder[]
  this.pushToCurrentOrder = function() {
    that.currentOrder = [];
    for (var key in ingredients) {
      for (var i = 0, len =  ingredients[key]["type"].length; i < len; i++) {
        if (ingredients[key]["type"][i]["selectFlag"] == "true") {
          that.currentOrder.push({"Id": ingredients[key]["type"][i]["id"]});
        }
      } 
    }
  }
  
  //calculates total for current order
  this.calculateTotal = function() {
    total = 0;
    for (var i = 0, len = that.currentOrder.length; i < len; i++) {
      for (var key in ingredients) {
        for (var j = 0, l =  ingredients[key]["type"].length; j < l; j++) {
          if (that.currentOrder[i].Id == ingredients[key]["type"][j].id) {
            total += ingredients[key]["type"][j].price;
          }
        }
      }  
    }
    return total;
  }
  
  //diaplays current order
  this.displayCurrentOrder = function(total) {
    var orderContainer = that.getOrderContainer();
    for (var i = 0, len = that.currentOrder.length; i < len; i++) {
      for (var key in ingredients) {
        for (var j = 0, l =  ingredients[key]["type"].length; j < l; j++) {
          if (that.currentOrder[i].Id == ingredients[key]["type"][j].id) {
            that.createCustomerOrderContainer(key, orderContainer, j);
          }
        }
      }
    }
    that.displayTotal(total, orderContainer);
  }

  this.getOrderContainer = function() {
    var orderContainer = document.getElementById("selected-items-container");
    orderContainer.className = "displayContainer";
    orderContainer.innerHTML = "";
    return orderContainer;
  }
  
  //creates div for customer order
  this.createCustomerOrderContainer = function(key, orderContainer, j) {
    var menuItem = document.createElement("div");
    var itemTextNode = document.createTextNode(ingredients[key]["type"][j].name + " ");
    menuItem.appendChild(itemTextNode);
    var priceTextNode = document.createTextNode("Rs." + ingredients[key]["type"][j].price);
    menuItem.appendChild(priceTextNode);
    orderContainer.appendChild(menuItem);
  }
  
  //displays total
  this.displayTotal = function(total, orderContainer) {
    orderContainer.appendChild(document.createTextNode("Total = " + total));
    if (total == 0) {
      orderContainer.innerHTML = "Your Order";
    }
  }
  
  //places order when button is clicked
  this.placeOrder = function() {
    var customerName = that.getCustomerName();
    if (!customerName) {
      return false;
    }
    var orderContainer = that.getOrderContainer();
    orderContainer.innerHTML = "Your Order";
    that.pushToAllOrders();
    that.createOrderContainer(customerName);
    var totalAmount = that.getTotalAmount();
    that.displayOrderContainer(totalAmount);
    that.showRevenue();
    that.itemContainer.innerHTML  = "";
    that.makeGrid();
    that.currentOrder = [];
  }
  
  //returns customer name
  this.getCustomerName = function() {
    var customerName = "";
    if (that.currentOrder.length == 0){
      alert("Select your order");
      return false;
    }
    else {
      do {
        customerName = prompt("name of the customer");
        var returnValue = that.validateName(customerName);
        if (!returnValue) {
          alert("Enter a valid name");
        }
        else {
          break;
        }
      }while(true);
    }
    return customerName;
  }
  
  //validates customer name
  this.validateName = function(customerName) {
    if (customerName != null && !customerName.trim()) {
      return false;
    }
    else {
      return true;
    }
  }
  
  //push all the orders to the array
  this.pushToAllOrders = function() {
    that.allOrders = [];
    for (var key in ingredients) {
      for (var i = 0, len =  ingredients[key]["type"].length; i < len; i++) {
        if (ingredients[key]["type"][i]["selectFlag"] == "true") {
          that.allOrders.push({"Id": ingredients[key]["type"][i].id, "name": ingredients[key]["type"][i].name, "price": parseInt(ingredients[key]["type"][i].price, 10)});
          ingredients[key]["type"][i]["selectFlag"] = "false";
        }
      }
    }
  }
  
  //gets total revenue of all the orders
  this.getTotalAmount = function() {
    var totalAmount = 0;
    for (var i = 0, len = that.allOrders.length; i < len; i++) {
      totalAmount += that.allOrders[i].price; 
    }
    that.costOfOrders.push(totalAmount);
    return totalAmount;
  }

  //creates div for displaying all the order
  this.createOrderContainer = function(name) {
    var customerOrderContainer = document.getElementById("orders-container");
    customerOrderContainer.className = "displayContainer";
    that.order = document.createElement("div");
    that.order.className = "order";
    var orderTextNode = document.createTextNode("Customer Name: " + name);
    var myContainer = document.createElement("div");
    myContainer.appendChild(orderTextNode);
    that.order.appendChild(myContainer);
    customerOrderContainer.appendChild(that.order);
  }
  
  //displays  div displaying all the order
  this.displayOrderContainer = function(totalAmount) {
    for (var i = 0, len = that.allOrders.length; i < len; i++) {
      var id = "Id: " + that.allOrders[i].Id + " ";
      var ingredientNamePrice = that.allOrders[i].name + " = " +  that.allOrders[i].price;
      var myTotal = "Total: " + "Rs." + totalAmount;
      that.createOrderContainerTextNode(id);
      that.createOrderContainerTextNode(ingredientNamePrice);
    }
      that.createOrderContainerTextNode(myTotal);
  }
  
  this.createOrderContainerTextNode = function(nodeVal) {
    var idNode = document.createTextNode(nodeVal);
    var Container = document.createElement("div");
    Container.appendChild(idNode);
    that.order.appendChild(Container);
  }
  
  //displays total revenue
  this.showRevenue = function() {
    var totalRevenue = 0;
    var revenueContainer = that.createRevenueContainer();
    for (var i = 0, len = that.costOfOrders.length; i <len; i++) {
      totalRevenue += parseInt(that.costOfOrders[i], 10);
    }
    var revenueTextNode = document.createTextNode(totalRevenue);
    revenueContainer.appendChild(revenueTextNode);
  }
  
  //creates div for displaying total revenue
  this.createRevenueContainer = function() {
    var revenueContainer = document.getElementById("revenue-amount");
    var totalRevenueContainer = document.getElementById("total-revenue-container");
    totalRevenueContainer.className = "displayRevenueContainer";
    revenueContainer.innerHTML = "";
    return revenueContainer;
  }
}