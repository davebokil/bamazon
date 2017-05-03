// Bamazon Manager
// by Dave Bokil
// Rutgers Coding Bootcamp Week 12 Assignment
// =================================================================
// Welcome to manager mode. Here you can perform the following tasks related to the bamazon storefront:
// * View Products for Sale
// * View Low Inventory
// * Add to Inventory
// * Add New Product
// =================================================================

// Require Packages to use with this app
var mysql = require("mysql");
var inquirer = require("inquirer");


// MySQL Connection
// ===========================================================================================
// Create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // username
    user: "root",

    // password
    password: "",
    database: "Bamazon"
});

// Connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
});


// Main Menu Function
// ===========================================================================================
let mainMenu = function() {

    inquirer.prompt([{
        type: 'list',
        name: 'mainMenu',
        message: 'Welcome to manager mode. What do you want to do?',
        choices: [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product',
            'Quit'
        ]
    }, ]).then(function(answers) {
        if (answers.mainMenu === "View Products for Sale") {
            viewProducts()
        } else if (answers.mainMenu === "View Low Inventory") {
            viewLowInventory()
        } else if (answers.mainMenu === "Add to Inventory") {
            addInventory()
        } else if (answers.mainMenu === "Add New Product") {
            addNewProduct()
        } else if (answers.mainMenu === "Quit") {
        	connection.end();
        }
    });
}

// Run this function on app load.
mainMenu()
    

// Function to View Products for Sale
// * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
// ===========================================================================================
let viewProducts = function() {
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        console.log("\n")
        console.log("=======================================")
        console.log("Here are the current products in stock:")
        console.log("=======================================")
        for (var i = 0; i < results.length; i++) {
            console.log(
                results[i].product_name + "\n" + " | " + "Product ID: " + results[i].item_id + "\n" + " | " + "Department Name: " + results[i].department_name + "\n" + " | " + "Price: " + "$" + results[i].price + "\n" + " | " + "Quantity: " + results[i].stock_quantity + "\n"
            );
        }
        inquirer.prompt([{
            name: "nextAction",
            type: "confirm",
            message: "Would you like to return to the main menu?"
        }]).then(function(answer) {
            if (answer.nextAction === true) {
                mainMenu()
            } else {
            	console.log("Quitting Application. Goodbye.")
                connection.end();
            }
        })
    });
}

// Function to View Low Inventory
// * If a manager selects `View Low Inventory`, then it should list all items with a inventory count lower than five.
// ===========================================================================================
let viewLowInventory = function() {
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        console.log("\n")
        console.log("=======================================")
        console.log("Attention! These products are low in stock:")
        console.log("=======================================")
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity <= 100) {
                console.log(
                    results[i].product_name + "\n" + " | " + "Product ID: " + results[i].item_id + "\n" + " | " + "Department Name: " + results[i].department_name + "\n" + " | " + "Price: " + "$" + results[i].price + "\n" + " | " + "Quantity: " + results[i].stock_quantity + "\n"
                );
            }
        }
        inquirer.prompt([{
            name: "nextAction",
            type: "confirm",
            message: "Would you like to return to the main menu?"
        }]).then(function(answer) {
            if (answer.nextAction === true) {
                mainMenu()
            } else {
                console.log("Quitting Application. Goodbye.")
                connection.end();
            }
        })
    });
}


// Function to Add to Inventory
// * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// ===========================================================================================
let addInventory = function() {
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        console.log("\n")
        console.log("=======================================")
        console.log("Here is the current stock:")
        console.log("=======================================")
        for (var i = 0; i < results.length; i++) {
            console.log(
                results[i].product_name + "\n" + " | " + "Product ID: " + results[i].item_id + "\n" + " | " + "Department Name: " + results[i].department_name + "\n" + " | " + "Price: " + "$" + results[i].price + "\n" + " | " + "Quantity: " + results[i].stock_quantity + "\n"
            );
        }
        inquirer.prompt([{
            type: 'input',
            name: 'idPick',
            message: 'Enter the ID of the product you would like to add to:'
        }, {
            type: 'input',
            name: 'quantity',
            message: 'How many units would you like to add?'
        }]).then(function(answer) {
            var item = "";
            var numberOf = answer.quantity;
            for (var i = 0; i < results.length; i++) {
                if (answer.idPick == results[i].item_id) {
                    item = results[i]
                }
            }

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: item.stock_quantity + parseInt(numberOf)
            }, {
                item_id: item.item_id
            }], function(error) {
                if (error) throw error;
                console.log("\n" + "Success, " + item.product_name + " has been updated to have a total of (" + (item.stock_quantity + parseInt(numberOf)) + ") units")
                inquirer.prompt([{
                    name: "nextAction",
                    type: "confirm",
                    message: "Would you like to return to the main menu?"
                }]).then(function(answer) {
                    if (answer.nextAction === true) {
                        mainMenu()
                    } else {
                        console.log("Quitting Application. Goodbye.")
                        connection.end();
                    }
                })
            });
        })
    });
}


// Function to Add New Product
// * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
// ===========================================================================================
let addNewProduct = function() {
    inquirer.prompt([{
        name: "product",
        type: "input",
        message: "What is the name of the product?"
    }, {
        name: "department",
        type: "input",
        message: "What department does this item belong to?"
    }, {
        name: "price",
        type: "input",
        message: "What is the unit price of this item?"
    }, {
        name: "stock",
        type: "input",
        message: "How many units are currently in stock?"
    }]).then(function(answers) {
        connection.query("INSERT INTO products SET ?", {
            product_name: answers.product,
            department_name: answers.department,
            price: answers.price,
            stock_quantity: parseInt(answers.stock)
        }, function(error, res) {
            if (error) throw error;
            console.log("Success! Database has been updated.")
            inquirer.prompt([{
                name: "nextAction",
                type: "confirm",
                message: "Would you like to return to the main menu?"
            }]).then(function(answer) {
                if (answer.nextAction === true) {
                    mainMenu()
                } else {
                    console.log("Quitting Application. Goodbye.")
                    connection.end();
                }
            })
        });
    })
}
