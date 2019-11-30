var mysql = require("mysql");
var inquire = require("inquirer");
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

        console.log(res);
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
                    var sum = chosenItem.price * parseInt(answer.amount);
                    var sales = sum + chosenItem.product_sales;
                    chosenItem.in_stock = chosenItem.in_stock - parseInt(answer.amount)
                    connection.query("UPDATE products SET ? WHERE ?",
                                      [{in_stock: chosenItem.in_stock},
                                        {item_id: chosenItem.item_id},
                                         {product_sales: sales}],
                                      function(err) {
                                          if (err) throw err;
                                      })
                    console.log("You made a purchase!" + "\nThere are " + chosenItem.in_stock + " " + chosenItem.product + " left.")
                    console.log("Your total is $" + sum);
                    buyStuff();
                    
                }else{
                    console.log("Insufficient Quantity");
                    buyStuff();
                }
            
            
            })
        })
    }