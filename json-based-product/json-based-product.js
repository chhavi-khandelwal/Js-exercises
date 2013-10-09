var productData = [{"name":"1","url":"1.jpg","color":"Yellow","brand":"BRAND A","sold_out":"1"},
{"name":"2","url":"2.jpg","color":"Red","brand":"BRAND B","sold_out":"0"},
{"name":"3","url":"3.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},
{"name":"4","url":"4.jpg","color":"Red","brand":"BRAND A","sold_out":"1"},
{"name":"5","url":"5.jpg","color":"Blue","brand":"BRAND B","sold_out":"0"},
{"name":"6","url":"6.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},
{"name":"7","url":"7.jpg","color":"Red","brand":"BRAND C","sold_out":"1"},
{"name":"8","url":"8.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},
{"name":"9","url":"9.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"},
{"name":"10","url":"10.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},
{"name":"11","url":"11.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},
{"name":"12","url":"12.jpg","color":"Yellow","brand":"BRAND D","sold_out":"0"},
{"name":"13","url":"13.jpg","color":"Blue","brand":"BRAND A","sold_out":"0"},
{"name":"14","url":"14.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},
{"name":"15","url":"15.jpg","color":"Green","brand":"BRAND B","sold_out":"0"},
{"name":"16","url":"16.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},
{"name":"17","url":"17.jpg","color":"Green","brand":"BRAND A","sold_out":"1"},
{"name":"18","url":"18.jpg","color":"Blue","brand":"BRAND D","sold_out":"1"},
{"name":"19","url":"19.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},
{"name":"20","url":"20.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"}
];

window.addEventListener("load", initialize());

function initialize() {
  var listOption = new selectList("selectlist");
  listOption.makeGrid();
}

function selectList(id) {
  var that = this;
  this.list = document.getElementById(id);
  this.body = document.getElementById("body");

  this.makeGrid = function() {
    this.grid = this.createGridBlock();
    var count = 0, rows = 5, cols = 4;
    for (var i = 0; i < cols; i++) {
      var columnContainer = this.createColumnContainer();
      for (var j = 0; j < rows; j++) {
        var productContainer = this.createProductContainer(columnContainer);
        var productImage = this.createImage(productContainer, count);
        count++;
      }
    }
    this.body.appendChild(this.grid);
    this.list.addEventListener("change", this.sortProducts.bind(that));
  }

  this.createGridBlock = function() {
    var grid = document.createElement("div");
    grid.id = "mygrid";
    return grid;
  }

  this.createColumnContainer = function() {
    var columnContainer = document.createElement("div");
    columnContainer.className = "columnContainer";
    this.grid.appendChild(columnContainer);
    return columnContainer;
  }

  this.createProductContainer = function(columnContainer) {
    var productContainer = document.createElement("div");
    productContainer.className = "productContainer";
    columnContainer.appendChild(productContainer);
    return productContainer;
  }

  this.createImage = function(productContainer, count) {
    var productImage = document.createElement("img");
    productImage.src = productData[count].url;
    productImage.className = "productImage";
    productContainer.appendChild(productImage);
  }

  this.sortProducts = function() {
    var index = this.list.selectedIndex;
    var selectedOption = this.list.options[index];
    var selectedValue = selectedOption.value;
    productData.sort(compare);
    function compare(val1, val2) {
      if (selectedOption.value == "name") {
        var value1 = parseInt(val1[selectedValue], 10), value2 = parseInt(val2[selectedValue], 10);
      }
      else {
        var value1 = val1[selectedValue], value2 = val2[selectedValue];
      }
      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      } else {
        return 0;
      }
    }
    this.makeNewGrid();
  }

  this.makeNewGrid = function() {
    this.body.removeChild(this.grid);
    this.makeGrid();
  }
}