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
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});
function afterConnection() {
    // connection.query("SELECT * FROM products", function(err, res) {
    //     if (err) throw err;
    inquire
        .prompt(
            {
                name: "menu",
                type: "list",
                choices: ["View Product for Sale", "View Low Inventory",
                    "Add to Inventory", "Add New Product"],
                message: "Please select from the list below."
            })
        .then(function (answer) {
            switch (answer.menu) {
                case "View Product for Sale":
                    viewProduct();
                    break;
                case "View Low Inventory":
                    viewLow();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                default:
                    console.log("Wrong answer buddy!");
                    afterConnection();
            }
        })
}
function viewProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        afterConnection();
    })
}

function viewLow() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var chosenItem = [];

        for (var i = 0; i < res.length; i++) {
            if (res[i].in_stock <= 5) {
                chosenItem.push(res[i]);
            }
        }
        console.log("chosenItem", chosenItem);
        afterConnection()

    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res)
        inquire
            .prompt(
                [{
                    name: "item",
                    type: "input",
                    message: "Please enter item_id?"
                },
                {
                    name: "add",
                    type: "input",
                    message: "How many?"
                }
                ])
            .then(function (answer) {
                var chosenItem = [];

                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === parseInt(answer.item)) {
                        console.log("I'm IN")
                        chosenItem = res[i];
                        console.log("chosenItem", chosenItem);
                    }
                }
                upDate();
                function upDate() {
                    chosenItem.in_stock = chosenItem.in_stock + parseInt(answer.add);
                }
                connection.query(" UPDATE products SET ? WHERE ?",
                    [{ in_stock: chosenItem.in_stock },
                    { item_id: chosenItem.item_id }],
                    function (err) {
                        if (err) throw err;
                    })
                console.log("You added some stuff!" + "\nThere are " + chosenItem.in_stock + " " + chosenItem.product + " left.")
                afterConnection();


                // if (chosenItem.in_stock >= 0) {

            })

    })
}

function addProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquire.prompt([
            {
                name: "item",
                type: "input",
                message: "What new product are you adding?"
            },
            {
                name: "amount",
                tpye: "How many are you adding?"
            },
            {
                name: "dept",
                type: "input",
                message: " Which department are you adding to?"
            },
            {
                name: "price",
                type: "input",
                message: "How much is it?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
            .then(function(answer) {
                connection.query(
                    "INSERT INTO products SET ?",
                    {
                        product: answer.item,
                        department: answer.dept,
                        price: answer.price,
                        in_stock: answer.amount
                    },
                    function (err) {
                        if (err) throw err 
                            console.log("You added " + answer.item + " to the inventory.");
                            afterConnection();
                        })
                    })
            })
    
}
