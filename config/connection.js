//Set up connection to MySQL
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "$3ndNudes",
    database: "burgers_db",
});

//Fire connection
connection.connect(function(err) {
    if(err) {
        console.log("error connecting: " + err.stack);
        return
    }
    console.log(connection)
    console.log("connected as id " + connection.threadId)
})

//Export connection for use in ORM
module.exports = connection;