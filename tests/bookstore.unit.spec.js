QUnit.module( "bookstore.js unit tests" );

/*QUnit.test("sendRequest should retrieve the products object at the provided url", function( assert ) {

});*/

QUnit.test("configureProductPabnels should add the correct price, name and image url" +
    "to each product panel", function( assert ) {

    products = {
        'KeyboardCombo': {
            price: 1,
            quantity: 120,
            url: 'https://cpen400a.herokuapp.com/images/KeyboardCombo.png'
        },
        'Mice': {
            price: 2,
            quantity: 110,
            url: 'https://cpen400a.herokuapp.com/images/Mice.png'
        },
        'PC1': {
            price: 3,
            quantity: 100,
            url: 'https://cpen400a.herokuapp.com/images/PC1.png'
        },
        'PC2': {
            price: 4,
            quantity: 90,
            url: 'https://cpen400a.herokuapp.com/images/PC2.png'
        },
        'PC3': {
            price: 5,
            quantity: 80,
            url: 'https://cpen400a.herokuapp.com/images/PC3.png'
        },
        'Tent': {
            price: 6,
            quantity: 70,
            url: 'https://cpen400a.herokuapp.com/images/Tent.png'
        },
        'Box1': {
            price: 7,
            quantity: 60,
            url: 'https://cpen400a.herokuapp.com/images/Box1.png'
        },
        'Box2': {
            price: 8,
            quantity: 50,
            url: 'https://cpen400a.herokuapp.com/images/Box2.png'
        },
        'Clothes1': {
            price: 9,
            quantity: 40,
            url: 'https://cpen400a.herokuapp.com/images/Clothes1.png'
        },
        'Clothes2': {
            price: 10,
            quantity: 30,
            url: 'https://cpen400a.herokuapp.com/images/Clothes2.png'
        },
        'Jeans': {
            price: 11,
            quantity: 20,
            url: 'https://cpen400a.herokuapp.com/images/Jeans.png'
        },
        'Keyboard': {
            price: 12,
            quantity: 10,
            url: 'https://cpen400a.herokuapp.com/images/Keyboard.png'
        }
    };

    configureProductPanels();

    var productPanels = document.getElementsByClassName("product-container");

    for (var i = 0; i < productPanels.length; i++) {
        var tempProductName;
        for (var item in products) {
            if (productPanels[i].id === item && products.hasOwnProperty(item)) {
                tempProductName = item.toString();
                break;
            }
        }

        var tempProductImg = productPanels[i].querySelector("img.product");
        var tempProductPrice = productPanels[i].querySelector("div.caption > h5");
        var tempProductLabel = productPanels[i].querySelector("div.caption + h5");

        assert.equal(tempProductImg.src, products[tempProductName].url);
        assert.equal(tempProductPrice.innerHTML, "$" + products[tempProductName].price);
        assert.equal(tempProductLabel.innerHTML, productRealName(tempProductName.toString()));
    }
});


QUnit.test("configureButton should return button that has the given text and classes", function(assert) {
    var testButtonText = "Test Button";
    var testClassArray = ["blue", "green", "short"];
    var testButton = configureButton(testButtonText, testClassArray);
    var testButtonClasses = testButton.classList;

    assert.equal(testButtonClasses.contains(testClassArray[0]), true);
    assert.equal(testButtonClasses.contains(testClassArray[1]), true);
    assert.equal(testButtonClasses.contains(testClassArray[2]), true);
    assert.equal(testButtonClasses.contains("randomClass"), false);
});
