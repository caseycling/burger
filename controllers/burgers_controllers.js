//Use express 
var express = require("express")
var router = express.Router();

//Import the model to use database functions for interaction with mysql
var burger = require("../models/burger")

//Routes

//Root route will get all burgers in the burgers table
router.get("/", function (req, res) {
    burger.all(function (data) {
        var burgObj = {
            //"burgers" keyword here will be used to pass data to index.handlebars
            burgers: data
        }
        console.log(burgObj)
        //Send (or render) the burgObj to index
        res.render("index", burgObj)
    })
})

//This route will add burgers to the database
router.post("/burgers", function (req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
            req.body.burgName, 0
        ], function (result) {
            res.json({ d: result.insertId })
        })
})

//This route will change devoured value after user clicks the devour button
router.put("/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id

    console.log("Burger eaten:", condition)
    //Change status of burger to devoured
    burger.update({
        devoured: 1
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end()
        }
    })
})

//Export routes via router
module.exports = router