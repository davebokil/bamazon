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


// Function to handle purchasing. 
var start = function() {

    // When app is run, the most up to date stock of products is displayed:
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        console.log("\n")
        console.log("==========================")
        console.log("Current Products in Stock:")
        console.log("==========================")
        for (var i = 0; i < results.length; i++) {
            console.log(
                results[i].product_name + "\n" + " | " + "Product ID: " + results[i].item_id + "\n" + " | " + "Department Name: " + results[i].department_name + "\n" + " | " + "Price: " + "$" + results[i].price + "\n" + " | " + "Quantity: " + results[i].stock_quantity + "\n"
            );
        }

        // Store the most up to date stock results in an object variable
        var stock = results

        // Ask the customer the product ID and quantity of items they would like to purchase.
        inquirer.prompt([{
                type: 'input',
                name: 'idPick',
                message: 'Enter the ID of the product you would like to purchase'
            }, {
                type: 'input',
                name: 'quantity',
                message: 'How many units would you like to purchase?'
            }])
            .then(function(answers) {
                // store answers in variables
                var userItem = "";
                var userNumberItems = answers.quantity;
                for (var i = 0; i < stock.length; i++) {
                    if (answers.idPick == stock[i].item_id) {
                        userItem = stock[i]
                        // console.log(userItem)
                    }
                }
                // If user wants more quantity than is available, notify, and then restart the app.
                if (answers.quantity > userItem.stock_quantity) {
                    console.log("\n" + "We currently dont have that many in stock. Please check back later. " + "Redirecting you to the storefront:")
                    start();

                // Confirm the Purchase:    
                } else {
                    inquirer.prompt([{
                        type: 'confirm',
                        name: 'purchaseConfirm',
                        message: "You would like to purchase " + "(" + answers.quantity + ") " + "of " + "(" + userItem.product_name + ")" + ". " + "Please confirm:"
                    }]).then(function(answer) {
                        
                        // If user confirms, update the SQL stock quantity, show total of purchase, then redirect to the storefront.
                        if (answer.purchaseConfirm == true) {
                            connection.query("UPDATE products SET ? WHERE ?", [{
                              stock_quantity: userItem.stock_quantity - userNumberItems
                            }, {
                              item_id: userItem.item_id
                            }], function(error) {
                              if (error) throw error;
                              // show the customer the total cost of their purchase.
                              console.log("\n" + "Your total is $" + (userItem.price * userNumberItems))
                              console.log("\n"  +'Congratulations on your purchase. Your item(s) are being processed. Please come back soon!' + "\n"  + "Redirecting to the storefront:")
                            start();
                            });        

                        // If user does not confirm purchase, send them back to the storefront.    
                        } else {
                            console.log("\n"  + "Looks like you changed your mind. Re-directing to the storefront:" + "\n")
                            start()
                        }
                    })
                }
            });
    });
};

// Run the App
start() 
