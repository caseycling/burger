//Import express
var express = require("express")

var PORT = process.env.PORT || 8080

var app = express();

//serve static content for the app from the "public" directory
app.use(express.static("public"))

//Parse application body
//This translates the request and response data into JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set Handlebars
var exphbs = require("express-handlebars");

//Tell express that the semantic template engine to handlebars
//Any file ending in "handlebars" will be process by exphbs with a default layout of main
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
//Set the view engine to handlebars
app.set("view engine", "handlebars")

//Import routes
var routes = require("./controllers/burgers_controllers")

//Use routes
app.use(routes)


//Start our server to begin listening to client requests
app.listen(PORT, function() {
    //Server-side log to tell us when server has started
    console.log("Server listening on: http://localhost:" + PORT)
})