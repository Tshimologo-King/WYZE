const bcrypt = require("bcryptjs");
const connection = require("../../library/database_connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//ADD SUSBSCRIPTION USER
async function addSubscription(req, res) {
  const { idSubscriptions, status, userName, userEmail } = req.body;
  try {
    connection.query(
      `INSERT INTO subscribers(status, userName, userEmail) VALUES ("${status}", "${userName}", "${userEmail}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

//DELETE SUBSCRIPTION
async function cancelSubscription(req, res) {
  try {
    connection.query(
      `DELETE FROM subscribers WHERE idsubscriber=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

module.exports = {
  addSubscription,
  cancelSubscription,
};
