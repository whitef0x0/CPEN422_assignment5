/*
    Function to display cart modal after clicking the cart button. Shows
    the products, their quantities, and add/remove buttons to adjust the 
    order size.
*/
function showCartModal() {
    var cartModal = document.getElementById(Ids.cartModal);
    var cartModalTable = document.getElementById(Ids.cartModalTable);
    var cartEmptyModalMsg = document.getElementById(Ids.cartEmptyModalMessage);
    
    // Clear the previous product list contents of the modal (if exists)
    while(cartModalTable.rows[0]){
        cartModalTable.deleteRow(0);
    }
    
    // Add checkout button on first display only
    if (!document.getElementById("checkoutButton")) {
        var checkoutButton = configureButton("Checkout",[]);
        checkoutButton.id="checkoutButton";
        checkoutButton.addEventListener("click",checkoutCart);
        // Append button to div#cartModal's inner container div
        var cartModalInnerDiv = document.querySelector("#cartModal > div");
        cartModalInnerDiv.appendChild(checkoutButton);
    }
    
    // If nothing in cart, display message to inform user it is empty
    if(Object.keys(cart).length == 0 && cart.constructor == Object){
        //If the empty cart message is not already present, add it
        if (!cartEmptyModalMsg) {
            displayCartEmptyMsg(cartModalTable);
        }
    } else {
        // If cart empty message is present from previous modal display, remove it
        if (cartEmptyModalMsg) {
            // First and only child is the inner div containing all other elements
            cartModal.children[0].removeChild(cartEmptyModalMsg);
        }
        for (var item in cart) {
            createCartModalRow(cartModal,cartModalTable,item);
        }
    }
    displayCartModal();
}

/* 
    Helper function to create a modal row containing the product name,
    quanitity, and add/remove buttons.
*/

function createCartModalRow(cartModal,cartModalTable,product) {
    // Create a new row, and add cells for product name and quantity
    var tempRow = cartModalTable.insertRow(-1);
    var productNameCell = tempRow.insertCell(0);
    productNameCell.innerHTML = productRealName(product) + ":";
    var productQuantityCell = tempRow.insertCell(1);
    productQuantityCell.innerHTML = cart[product];
    
    // Add cells for the add/remove buttons
    var addButtonCell = tempRow.insertCell(2);
    var removeButtonCell = tempRow.insertCell(3);
    
    // Create the buttons and set their click functions
    var addButton = configureButton("+", [Classes.modalProductBtn, Classes.modalAddBtn]);
    var removeButton = configureButton("-", [Classes.modalProductBtn, Classes.modalRmvBtn]);
    addButton.onclick = modalProdBtnClickFunc(product, null, productQuantityCell, addToCart, "add");
    removeButton.onclick = modalProdBtnClickFunc(product, tempRow, productQuantityCell, removeFromCart, "remove");
    addButtonCell.appendChild(addButton);
    removeButtonCell.appendChild(removeButton);
}

/* 
    Helper function to set the click functions for the modal 
    product buttons. Function assigned depends on button type
    ("add" or "remove").
*/
function modalProdBtnClickFunc(item, row, cell, func, btnType) {
    var productName = item;
    var targetRow = row;
    var targetQuantityCell = cell;
    if (btnType == "add") {
        return function() {
            var itemAdded = func.call(null,productName);
            if (itemAdded) {
                targetQuantityCell.innerHTML = cart[productName];
            }
        }
    } else {
        return function() {
            var itemRemoved = func.call(null,productName,1);
            if (itemRemoved) {
                if (cart[productName] == undefined) {
                    targetRow.remove();
                    //Inform user cart if cart is empty
                    if(Object.keys(cart).length == 0 && cart.constructor == Object){
                        displayCartEmptyMsg(document.getElementById(Ids.cartModalTable));
                    }
                } else {
                   targetQuantityCell.innerHTML = cart[productName]; 
                } 
            }
        }
    }
    
}

/*
    Function that checks the current cart item prices and quanities
    against updated stock data from the backend. If it notices any price
    changes or that an item's stock numbers are not sufficient to meet 
    the order, it notifies the user and updates the cart to reflect the
    changes. The UI is also updated to reflect price changes.
*/

function checkoutCart() {
    // Alert user that the program is checking the back store
    alert("Confirming the final total price as well as the availability of the products in the cart");
    sendRequest(BACKEND_URL, function(responseText){
        var updatedProducts = responseText;
        var updatedCartTotal = 0;
        var oldCartTotal = 0;
        
        // Compare prices and quantities of all cart items with backend stock data
        for (var item in cart) {
            oldCartTotal += (products[item].price)*cart[item];
            var quantityDifference = cart[item] - updatedProducts[item].quantity;
            if (quantityDifference > 0) {
                displayOutOfStockMsg(item,quantityDifference,updatedProducts[item].quantity);
                removeFromCart(item, quantityDifference);
            }
            var priceDifference = products[item].price - updatedProducts[item].price;
            if (priceDifference != 0) {
                displayPriceChangeMsg(item,products[item].price,updatedProducts[item].price);
            }
        }
        
        // Calculating the new updated cart modal
        for(var item in cart){
            updatedCartTotal += (updatedProducts[item].price)*cart[item];
        }
        
        if (oldCartTotal != updatedCartTotal) {
            displayCartTotal(oldCartTotal,updatedCartTotal);
        } else {
            displayCartTotal(oldCartTotal,null);
        }
        
        // Update the products object and all displays with new info
        products = updatedProducts;
        // Update product quantities against cart values
        for (item in cart) {
            products[item].quantity -= cart[item].quantity;
        }
        configureProductPanels();
        hideCartModal();
        showCartModal();
        cartDisplay();
    });
}

/*
    Helper functions to display different cart-related user alert messages
*/

function displayOutOfStockMsg(product,qtyDiff,newQty) {
    alert("Unfortunately we do not have enough " + productRealName(product) + " in stock. " +  
        "Your order will be decreased by " + qtyDiff + " to " + newQty);
}

function displayPriceChangeMsg(product,oldPrice,newPrice) {
     alert("Please note the price of " + productRealName(product) + " has been changed from $" + 
           oldPrice + " to $" + newPrice);
}

function displayCartTotal(oldValue, newValue) {
    if (!newValue) {
        alert("Order total comes to " + oldValue);
    } else if (oldValue && newValue) {
        alert("Order total was " + oldValue + " and is now " + newValue);
    } else {
        console.log("Error, invalid inputs");
    }
}

function displayCartEmptyMsg(cartModalTableRef) {
    var newCartModalEmptyMsg = document.createElement("p");
    newCartModalEmptyMsg.innerHTML = "Your cart is currently empty";
    newCartModalEmptyMsg.id=Ids.cartEmptyModalMessage;
    cartModalTableRef.insertAdjacentElement("afterEnd", newCartModalEmptyMsg);
}

/* 
    addToCart(productName) is called when an Add button is clicked. If the selected       
    product is not in your cart, the function adds the product to the cart and initializes 
    its quantity to one. Otherwise, the function increments the product quantity in the cart 
    by one. In both cases, the product quantity in stock decrements by one. The function also 
    resets, inactiveTime. The function returns true if an item was added to the cart, false 
    if not.
*/
function addToCart(productName) {
    var itemAdded = false;
    clearInterval(cartTimer);
    inactiveTime = 300;
    cartTimer = setInterval(function(){ countDown(); }, 1000);

    
    if (cart.hasOwnProperty(productName)) {
        if (products[productName].quantity > 0) {
            cart[productName] += 1;
            products[productName].quantity -= 1;
            itemAdded = true;
        } else {
            alert("Sorry, " + productName + " is all sold out!");
        }
    } else {
        cart[productName] = 1;
        products[productName].quantity -= 1;
        changeRemoveButtonDisplaySetting();
        itemAdded = true;
    }
    cartDisplay();
    return itemAdded;
}

/*
    removeFromCart(productName) is called when a Remove button is clicked.
    If the selected product is not in your cart, the function displays an alert box
    notifying the user of so. If there is only one in stock for the product, then the function
    removes the product from the cart. Otherwise, the function decrements the product quantity 
    by one in the cart and increments the product quantity by 1 in products.In any case, this 
    function also resets the inactivity timer once the remove button is clicked.
*/
function removeFromCart(productName, decrementAmount) {
    var itemRemoved = false;
    clearInterval(cartTimer);
    inactiveTime = 300;
    cartTimer = setInterval(function(){ countDown(); }, 1000);
    
    if ((cart.hasOwnProperty(productName))) {
        if ((cart[productName] - decrementAmount) >= 0) {
            cart[productName] -= decrementAmount;
            products[productName].quantity += decrementAmount;
            itemRemoved = true;
            
            if(cart[productName] == 0) {
                delete cart[productName];
                changeRemoveButtonDisplaySetting();
            }
        } else {
            console.log("Error: attempting to remove more items than are in cart");
        }
    } else {
        alert("You don't have any " + productName + " in your cart!");
    }
    cartDisplay();
    return itemRemoved;
}

/* 
    Function to hide the cart modal when closed
*/
function hideCartModal() {
    var cartModal = document.getElementById(Ids.cartModal);
    cartModal.style.opacity = 0;
    cartModal.style.pointerEvents = "none";
    
    clearInterval(cartTimer);
    inactiveTime = 300;
    cartTimer = setInterval(function(){ countDown(); }, 1000);
}

/* 
    Function to make the cart modal visible and clickable
*/
function displayCartModal() {
    var cartModal = document.getElementById(Ids.cartModal);
    cartModal.style.opacity = 1;
    cartModal.style.pointerEvents = "auto";
}

/*
    Defines the content in cartDisplay
*/
function cartDisplay(){
    var cartDisplayButton = document.getElementById(Ids.cartDisplayButton);
    var cartTotal = 0;
        
    if(isEmptyObject(cart))
        cartDisplayButton.value = "Cart ($0)";
    else{
        for(var prop in cart){
            cartTotal += (products[prop].price)*cart[prop];
        }
        cartDisplayButton.value = "Cart ($" + cartTotal + ")";
    }
}

/*
    This function is tied to the showCartButton. This shows all the items in the cart and
    their respective quantities in a series of alert boxes, with one alert box for every 
    product in the cart. If there are several items in the cart, the alert boxes appear in 
    5 second intervals.
*/
function showCart(){
    if(Object.keys(cart).length == 0 && cart.constructor == Object){
        alert("There is currently nothing in your cart.");
    }
    else{
        var cartTimerVal = 0;
        var length = Object.keys(cart).length;
        var counter = 0;
        for(product in cart){
           alert("Your cart has " + cart[product] + " " + productRealName(product));
           if (counter < (length-1)) {
               sleep(5000);
           }
           counter++;
        }
    }
}

/*
    Function to close the cart modal when escape pressed
*/
function escapeModalClose(e) {
    var keyCode = e.keyCode;
    if (keyCode == 27) {
      hideCartModal();
    }
}

