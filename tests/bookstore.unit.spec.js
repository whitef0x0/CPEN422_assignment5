QUnit.module( "bookstore.js unit tests" );

QUnit.test("configureButton should create a button", function( assert ) {
    document.getElementById("cartModal").style.opacity = 0;
    document.getElementById("cartModal").style.pointerEvents = "none";

    assert.equal(configureButton("NewButton1", ["new-button"]).innerHTML, "NewButton1");
    assert.deepEqual(configureButton("NewButton1", ["new-button"]).classList[0], "new-button");
});

QUnit.test("isEmptyObject should return true for empty object", function( assert ) {
    var obj = {};
    assert.equal(isEmptyObject(obj), true);
});

QUnit.test("isEmptyObject should return false for a non-empty object", function( assert ) {
    var obj = { "Tent": 1 };
    assert.equal(isEmptyObject(obj), false);
});

QUnit.test("insertProductPurchaseButtons should add Add/Remove buttons for valid product", function( assert ) {
    //@BEFORE
    var oldCart = cart;
    var oldProducts = products;
    cart = { "Tent": 1 };
    products = { "Tent": {price: 20} };
    configureProductPanels();

    insertProductPurchaseButtons();
    self.equal(document.querySelector('.addBtn').innerHTML, "Add");
    self.equal(document.querySelector('.removeBtn').innerHTML, "Remove");

    //@AFTER
    $('.addBtn').remove();
    $('.removeBtn').remove();
    $('.product-container').remove();

    cart = oldCart;
    products = oldProducts;
});