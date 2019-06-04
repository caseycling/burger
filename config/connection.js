//Set up connection to MySQL
var mysql = require("mysql");

//Set up port to process.env.PORT for heroku or default to 3306
var PORT = process.env.PORT || 8080

var connection = mysql.createConnection({
    host: "localhost",
    port: PORT,
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