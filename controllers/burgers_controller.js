var express = require("express");
var router = express.Router();

//Database model
var burger = require("../models/burger.js");

// Get all burgers
router.get("/", function(req, res) {
  burger.selectAll(function(data) {

    var dataObject = {
      burgers: data
    };
    res.render("index", dataObject);
  });
});

// Add New Burger 
router.post("/api/burgers", function(req, res) {
  burger.insertOne(["burger_name", "devoured"], [
    req.body.burger_name, false
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

// Devour burger (update devoured boolean value)
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
