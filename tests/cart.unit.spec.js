QUnit.module( "cart.js unit tests" );
QUnit.test("displayCartModal should work", function( assert ) {
    document.getElementById("cartModal").style.opacity = 0;
    document.getElementById("cartModal").style.pointerEvents = "none";

    displayCartModal();
    assert.equal(document.getElementById("cartModal").style.opacity, 1);
    assert.equal(document.getElementById("cartModal").style.pointerEvents, "auto");

    document.getElementById("cartModal").style.opacity = 0;
    document.getElementById("cartModal").style.pointerEvents = "none";
});

QUnit.test("hideCartModal should work", function( assert ) {
    document.getElementById("cartModal").style.opacity = 1;
    document.getElementById("cartModal").style.pointerEvents = "auto";

    hideCartModal();
    assert.equal(document.getElementById("cartModal").style.opacity, 0);
    assert.equal(document.getElementById("cartModal").style.pointerEvents, "none");
});

QUnit.test("escapeModalClose should close modal if key is escape", function( assert ) {
    document.getElementById("cartModal").style.opacity = 1;
    document.getElementById("cartModal").style.pointerEvents = "auto";

    escapeModalClose({ keyCode: 27});
    assert.equal(document.getElementById("cartModal").style.opacity, 0);
    assert.equal(document.getElementById("cartModal").style.pointerEvents, "none");

    document.getElementById("cartModal").style.opacity = 0;
    document.getElementById("cartModal").style.pointerEvents = "none";
});

QUnit.test("escapeModalClose should NOT close modal if key is NOT escape", function( assert ) {
    document.getElementById("cartModal").style.opacity = 1;
    document.getElementById("cartModal").style.pointerEvents = "auto";

    escapeModalClose({ keyCode: 30});
    assert.notEqual(document.getElementById("cartModal").style.opacity, 0);
    assert.notEqual(document.getElementById("cartModal").style.pointerEvents, "none");

    document.getElementById("cartModal").style.opacity = 0;
    document.getElementById("cartModal").style.pointerEvents = "none";
});

QUnit.test("escapeModalClose should NOT close modal if key is NOT escape", function( assert ) {
    document.getElementById("cartModal").style.opacity = 1;
    document.getElementById("cartModal").style.pointerEvents = "auto";

    escapeModalClose({ keyCode: 30});
    assert.notEqual(document.getElementById("cartModal").style.opacity, 0);
    assert.notEqual(document.getElementById("cartModal").style.pointerEvents, "none");

    document.getElementById("cartModal").style.opacity = 0;
    document.getElementById("cartModal").style.pointerEvents = "none";
});

QUnit.test("showCart should trigger alert if cart is empty", function( assert ) {
    //@BEFORE
    var oldCart = cart;
    cart = {};

    //override alert
    var _old_alert = window.alert;
    var alertRan = false;
    var lastAlertMessage = '';
    window.alert = function(msg) {
        alertRan = true;
        lastAlertMessage = msg;
    };

    showCart();
    assert.ok(alertRan);
    assert.equal(lastAlertMessage, "There is currently nothing in your cart.");

    //@AFTER
    cart = oldCart;
    window.alert = _old_alert;
});

QUnit.test("showCart should trigger cart reminder alert after 5000ms if cart contains more than 1 item", function( assert ) {
    //@BEFORE
    var oldCart = cart;
    cart = { "Tent": 1, "PC3": 2 };

    //override window.alert
    var _old_alert = window.alert;
    var alertRan = false;
    var lastAlertMessage = '';
    window.alert = function(msg) {
        alertRan = true;
        lastAlertMessage = msg;
    };

    //override window.sleep
    var _old_sleep = window.sleep;
    var sleepRan = false;
    var sleepDuration = 0;
    window.sleep = function(ms) {
        console.log("running window.sleep");
        sleepRan = true;
        sleepDuration = ms;
    };

    showCart();
    assert.ok(alertRan);
    assert.equal(lastAlertMessage, "Your cart has 2 Computer Tower");
    assert.ok(sleepRan);
    assert.ok(sleepDuration, 5000);

    //@AFTER
    cart = oldCart;
    window.alert = _old_alert;
    window.sleep = _old_sleep;
});

QUnit.test("showCart should trigger cart reminder alert after 0s if cart contains 1 item", function( assert ) {
    //@BEFORE
    var oldCart = cart;
    cart = { "Tent": 1 };

    //override window.alert
    var _old_alert = window.alert;
    var alertRan = false;
    var lastAlertMessage = '';
    window.alert = function(msg) {
        alertRan = true;
        lastAlertMessage = msg;
    };

    //override window.sleep
    var _old_sleep = window.sleep;
    var sleepRan = false;
    var sleepDuration = 0;
    window.sleep = function(ms) {
        sleepRan = true;
        sleepDuration = ms;
    };

    showCart();
    assert.ok(alertRan);
    assert.equal(lastAlertMessage, "Your cart has 1 Tent");
    assert.notOk(sleepRan);
    assert.equal(sleepDuration, 0);

    //@AFTER
    cart = oldCart;
    window.alert = _old_alert;
    window.sleep = _old_sleep;
});


QUnit.test("cartDisplay should set cart value to $0 if cart is empty", function( assert ) {
    //@BEFORE
    var oldCart = cart;
    cart = {};

    cartDisplay();
    assert.equal(document.getElementById("cartDisplayButton").value, "Cart ($0)");

    //@AFTER
    cart = oldCart;
});

QUnit.test("cartDisplay should set cart value to value of cart if cart is not empty", function( assert ) {
    //@BEFORE
    var oldCart = cart;
    var oldProducts = products;
    cart = { "Tent": 1 };
    products = { "Tent": {price: 20} };

    cartDisplay();
    assert.equal(document.getElementById("cartDisplayButton").value, "Cart ($20)");

    //@AFTER
    cart = oldCart;
    products = oldProducts;
});


QUnit.test("addToCart should add a valid product to the cart", function( assert ) {
    //@BEFORE
    var oldCart = cart;
    var oldProducts = products;
    cart = {};
    products = { "Tent": {price: 20} };

    addToCart("Tent");
    assert.equal(cart["Tent"], 1);

    //@AFTER
    cart = oldCart;
    products = oldProducts;
});
QUnit.test("addToCart not should add an invalid product to the cart", function( assert ) {
    //@BEFORE
    var oldCart = cart;
    var oldProducts = products;
    cart = {};
    products = {};
    try {
        addToCart("Tent");
    } catch(err) {
        assert.equal(err, "TypeError: Cannot read property 'quantity' of undefined");
    }


    //@AFTER
    cart = oldCart;
    products = oldProducts;
});
QUnit.test("removeFromCart should remove an valid product from the cart", function( assert ) {
    //@BEFORE
    var oldCart = cart;
    var oldProducts = products;
    cart = { "Tent": 1 };
    products = { "Tent": {price: 20} };

    removeFromCart("Tent", 1);
    assert.equal(cart.hasOwnProperty("Tent"), false);

    //@AFTER
    cart = oldCart;
    products = oldProducts;
});