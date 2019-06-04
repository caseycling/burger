//Use express 
var express = require("express")
var router = express.Router();

//Import the model to use database functions for interaction with mysql
var burger = require("../models/burger")

//Routes

//Root route will get all burgers in the burgers table
router.get("/", function(req, res) {

})

//This route will add burgers to the database
router.post("/api/bugers", function(req, res) {

})

//This route will change devoured value after user clicks the devour button
router.put("/api/burgers/:id", function(req, res) {

}) 

//Export routes via router
module.exports = router