const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");

//Getting all Subscriptions in DB
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM subscriptions", (err, result) => {
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
      `SELECT * FROM Subscriptions where idsubscriptions=${req.params.id}`,
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
  const { idsubscriptions, status, NoOfSubscriptions, startOfSubscription, endOfSubscription, paymentMethod} = req.body;

  try {
    connection.query(
      `INSERT INTO subscriptions (idsubscriptions, status, NoOfSubscriptions, startOfSubscription, endOfSubscription, paymentMethod ) VALUES ("${idsubscriptions}","${status}", "${NoOfSubscriptions}", "${startOfSubscription}", "${endOfSubscription}", "${paymentMethod}")`,
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

//Delete product using id
router.delete("/:id", (req, res) => {
  try {
    connection.query(
      `DELETE FROM Subscriptions WHERE idsubscriptions=${req.params.id}`,
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

module.exports = router;
