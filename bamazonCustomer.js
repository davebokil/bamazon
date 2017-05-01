// Bamazon
// by Dave Bokil
// Rutgers Coding Bootcamp Week 12 Assignment
// =================================================================
// Welcome to Bamazon, an app that will take in orders from customers and deplete stock from the store's inventory. 
// =================================================================

// Require Packages to use with this app
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "Bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
});

// This function will start when app is first run. It serves to a) Show the current product stock, and b) prompt the user to pick a product to purchase

var start = function() {
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        console.log("==========================")
        console.log("Current Products in Stock:")
        console.log("==========================")
        for (var i = 0; i < results.length; i++) {
            console.log(
                "Product ID: " + results[i].item_id + "\n" + " | " + "Product: " + results[i].product_name + "\n" + " | " + "Department Name: " + results[i].department_name + "\n" + " | " + "Price: " + "$" + results[i].price + "\n" + " | " + "Quantity: " + results[i].stock_quantity + "\n"
            );
        }
    });
    // The app should then prompt users with two messages.
    // The first should ask them the ID of the product they would like to buy.
    // The second message should ask how many units of the product they would like to buy.
    connection.end();
};


start()
