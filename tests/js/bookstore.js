// Inactive Time counter, initialized to 300 seconds
var inactiveTime = 300;

// Message shown when inactiveTime counter runs out
var BUY_REMINDER_MESSAGE = "Hey there! Are you still planning to buy something?";

// Cart associative array
var cart = {};

// Stock associative array
var products = {};

// Url for the backend services
var BACKEND_URL = "https://cpen400a.herokuapp.com/products";


// Id and Class reference objects to avoid typos 
var Ids = {
    cartModal: "cartModal",
    cartModalTable: "cartModalTable",
    cartDisplayButton: "cartDisplayButton",
    inactiveTimeDisplay: "inactiveTimeDisplay",
    cartEmptyModalMessage: "cartEmptyModalMessage"
};

var Classes = {
    btn: "btn",
    removeBtn: "removeBtn",
    productContainer: "product-container",
    addBtn: "addBtn",
    modalProductBtn: "modalProductBtn",
    modalAddBtn: "modalAddBtn",
    modalRmvBtn: "modalRmvBtn"
};

/*
    Function to assign ids, labels, and images to product panel
*/
function configureProductPanels() {
    var productPanels = document.getElementsByClassName("product-container");
    var counter = 0;
    
    for (var property in products) {
        if (products.hasOwnProperty(property)) {
            productPanels[counter].id = property.toString();
            var productPrice = productPanels[counter].querySelector("div.caption > h5");
            productPrice.innerText = "$" + products[property].price;
            var productLabel = productPanels[counter].querySelector("div.product-container > h5")
            productLabel.innerText = productRealName(property.toString());
            var productImg = productPanels[counter].querySelector("img.product");
            productImg.src = products[property].url;
            counter++;
        }
    }
}

/* 
    Function to send Ajax request until a successful response is received.
    A callback function was used in order to successfully return the responseText
    from the ajax request, due to the asynchgronous nature of ajax calls.
*/
var sendRequest = function(url, callbackFunction){
    var result;
    var	xhr = new XMLHttpRequest();
    xhr.open("GET",	url);
    xhr.onload = function()	{
        if (xhr.status == 200){
            console.log("Received response");
            result = JSON.parse(xhr.responseText);
            if(typeof callbackFunction === 'function') {
                callbackFunction(result); 
            }              
        } else {
            sendRequest(url, callbackFunction);
        }
    };

    xhr.onerror	= function() {
        console.log("Server	unreachable");
        sendRequest(url, callbackFunction);
    };
    
    xhr.timeout = 5000;
    
    xhr.ontimeout =	function() {
        console.log("Request timed out");
        sendRequest(url, callbackFunction);
    };
    
    xhr.onabort = function() {
        console.log("Request Aborted");
    };
    
    xhr.send();
};

/*
    Helper function to check if an object is empty
*/
function isEmptyObject(obj) {
  for(var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}

/*
    Displays the inactiveTime at the footer
*/
function inactiveTimeFunction(){
    var inactiveTimeDisplay = document.getElementById(Ids.inactiveTimeDisplay);
    inactiveTimeDisplay.innerHTML = "Inactive Time: " + inactiveTime; 
}

/* 
    Function to decrement and restart the timer when complete
*/
function countDown() {
    if (inactiveTime > 0) {
        inactiveTime--;
        inactiveTimeFunction();
    } else {
        alert(BUY_REMINDER_MESSAGE);
        inactiveTime = 300;
    }
}

/*
    A function that waits 5 seconds. 
    Utilized in the showCart() function.
*/
function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {
       //do nothing
   }
}

/* 
    Function to insert all the add/remove cart buttons into each product panel
*/
function insertProductPurchaseButtons() {
    var productPanels = document.getElementsByClassName(Classes.productContainer);
    for (var i = 0; i < productPanels.length; i++) {
        var currPanel = productPanels[i];
        var currPanelId = currPanel.getAttribute('id');
        var addButton = configureButton("Add",[Classes.btn, Classes.addBtn]);
        var removeButton = configureButton("Remove",[Classes.btn, Classes.removeBtn]);
        
        addButton.onclick = (function() { 
            var productName = currPanelId;
            return function() {
                addToCart(productName);
            }
        })();
        removeButton.onclick = (function() {
            var productName = currPanelId;
            return function() {
                removeFromCart(productName,1); 
            }
        })();
         
        currPanel.appendChild(addButton);
        currPanel.appendChild(removeButton);
    }
}

/* 
    Helper function to create and configure buttons
*/
function configureButton(buttonText, buttonClasses) {
    var newButton = document.createElement("BUTTON");
    var buttonText = document.createTextNode(buttonText);
    newButton.appendChild(buttonText);
    newButton.setAttribute('type', 'button');
    
    for (var i = 0; i < buttonClasses.length; i++) {
        newButton.className += buttonClasses[i];
        newButton.className += " ";
    }
    
    return newButton;
} 

/*
    This function controls the display of the remove button for the products.
    Namely, it retrieves all the remove buttons and checks if the parent element
    is in the cart object or not. It then sets the visibility of the remove button
    accordingly.
*/
function changeRemoveButtonDisplaySetting(){
    var listRemoveButtons = document.getElementsByClassName(Classes.btn + " " + Classes.removeBtn);
    var id;
    for(var i=0; i<listRemoveButtons.length; i++){
        id = listRemoveButtons[i].parentElement.id;
        if(!(cart.hasOwnProperty(id)))
            listRemoveButtons[i].style.visibility = "hidden";
        else
            listRemoveButtons[i].style.visibility = "visible";
    }
}

/*
    Translates the product IDs into the actual product names when displaying the cart.
*/
function productRealName(productName) {
    var resultName;
    switch(productName){
        case "Box1":
            resultName = "Clear Plastic Container";
            break;
        case "Box2":
            resultName = "Set of plastic containers";
            break;
        case "Clothes1":
            resultName = "Burgundy Dress";
            break;
        case "Clothes2":
            resultName = "Shirt";
            break;
        case "Jeans":
            resultName = "Jeans";
            break;
        case "Keyboard":
            resultName = "LED Keyboard";
            break;
        case "KeyboardCombo":
            resultName = "Gaming Keyboard";
            break;
        case "Mice":
            resultName = "Mouse";
            break;
        case "PC1":
            resultName = "Dell PC Tower";
            break;
        case "PC2":
            resultName = "Personal Computer Set";
            break;
        case "PC3":
            resultName = "Computer Tower";
            break;
        case "Tent":
            resultName = "Tent";
            break;
            
    }
    return resultName;
}

/*
    Ensures the buttons are not added until the rest of the DOM has been rendered.
*/
window.onload = function() {
    sendRequest(BACKEND_URL, function(responseText){
        
        products = responseText;
        configureProductPanels();
        insertProductPurchaseButtons();
        cartDisplay();
        inactiveTimeFunction();
        changeRemoveButtonDisplaySetting();
        cartDisplay();
        changeRemoveButtonDisplaySetting();
    });
    
    
    document.addEventListener("keydown", escapeModalClose, false);
};

// Starts the inactiveTime timer
var cartTimer = setInterval(function(){ countDown(); }, 1000);

