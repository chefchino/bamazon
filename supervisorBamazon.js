var mysql = require("mysql");
var inquire = require("inquirer");
var cTable = require('console.table');

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
    inquire.prompt(
        {
            name: "menu",
            type: "list",
            choices: ["View Product Sales By Department", "Create new Department"],
            message: "What do you want to do?"
        })
        .then(function (answer) {
            switch(answer.menu) {
                case "View Product Sales By Department":
                    viewSales();
                    break;
                case "Create new Department":
                    create();
                    break;
                default:
                    console.log("Try Again");
                    afterConnection();
            }
        })
}
function viewSales() {
    // var query = "SELECT products.department, departments.department_name, products.product_sales FROM products INNER JOIN departments ON (product.department = departments.department_name AND products.product_sales = departments.product_sales) WHERE (departments.department = ? AND products.department = ?"
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        // for (var i = 0; i < res.length; i++) {
            console.table(res)
        // }
        afterConnection();
    })
}