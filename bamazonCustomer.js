var mysql = require("mysql");
var inquire = require("inquirer");

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
        // for (var i = 0; i < res.length; i++){
        // console.log(res[i].item_id + "\nProduct " + res[i].product + "\nDepartment: " +
        // res[i].department + "\nPrice: " + res[i].price + "\nOn-Hand: " + res[i].in_stock); 
        // // "\n----------------------------------------\n");
        console.log(res);
        // }
        buyStuff();
        // connection.end()
    });
}
function buyStuff() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquire
        .prompt({
            name:"id",
            type: "input",
            message: "Please enter the ID number of the product you wish to buy."
        },
        {
            name:"amount",
            type: "input",
            message: "How many do you want?"
        })
        .then(function(answer) {
            var chosenItem;
            for(var i = 0; i < res.length; i ++) {
                if (res[i].item_id === answer.id) {
                    chosenItem = res[i];
                }
            }
            // if(answer.amount <= res[i].in_stock){
                
                // }
                console.log({chosenItem});
            })
        })
        }