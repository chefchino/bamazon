var mysql = require("mysql");
var inquire = require("inquirer");
var cTable = require('console.table');
// var nodeRed = require("node-red-node-ui-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Snoogins1!",
    database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});
function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        console.table(res);
        // }
        buyStuff();

    });
}
function buyStuff() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquire
        .prompt([
            {
            name:"id",
            type: "input",
            message: "Please enter the ID number of the product you wish to buy."
        },
        {
            name:"amount",
            type: "input",
            message: "How many do you want?"
        }
        ])
        .then(function(answer) {
            var chosenItem;

            for(var i = 0; i < res.length; i ++) {
                if (res[i].item_id === parseInt(answer.id)) {
                    chosenItem = res[i];
                    console.log("chosenItem",chosenItem);
                }
            }
                
            if (chosenItem.in_stock >= parseInt(answer.amount)) {
                // var sum = chosenItem.price * parseInt(answer.amount);
                chosenItem.product_sales = chosenItem.product_sales + (chosenItem.price * parseInt(answer.amount));
                chosenItem.in_stock = chosenItem.in_stock - parseInt(answer.amount);
                    connection.query("UPDATE products SET ? WHERE ?",
                    [{in_stock: chosenItem.in_stock,
                        product_sales: chosenItem.product_sales},
                        {item_id: chosenItem.item_id}],
                        function(err) {
                            if (err) throw err;
                        })
                        console.log("You made a purchase!" + "\nThere are " + chosenItem.in_stock + " " + chosenItem.product + " left.")
                        // console.log("Your total is $" + sum);
                        console.log("chosen1: " + chosenItem.product_sales),
                    buyStuff();
                    
                }else{
                    console.log("Insufficient Quantity");
                    buyStuff();
                }
            
            
            })
        })
    }
    // function update() {
    //     console.log("updating product list...");
    //     var query = connection.query(
    //         "UPDATE products SET ? WHERE ?",
    //         [
    //             {
    //                 in_stock: chosenItem.in_stock
    //             },
    //             {
    //                 item_id: chosenItem.item_id
    //             },
    //             {
    //                 product_sales: chosenItem.product_sales
    //             }
    //         ],
    //         function(err, res) {
    //             if (err) throw err;
    //         }
    //     );
    //     console.log(query.sql);
    // }