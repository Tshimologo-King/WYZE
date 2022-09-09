const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");
const userControl = require("../public/controllers/user")

//Getting all Subscriptions in DB
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM subscribers", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Getting all Subscriptions of users by id
router.get("/:id", (req, res) => {
  try {
    connection.query(
      `SELECT * FROM subscribers where idsubscriber=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Adding a new Subscriber into the db
router.post("/", (req, res) => {
  return userControl.addSubscription(req, res);
});

//Delete product using id
router.delete("/:id", (req, res) => {
  return userControl.cancelSubscription(req, res);
});

module.exports = router;
