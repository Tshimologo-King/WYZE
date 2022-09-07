const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");
const adminControl = require("../public/controllers/admin");

//Getting all posts for the Community Tab in DB
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM Posts", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Getting all posts by id
router.get("/:id", (req, res) => {
  try {
    connection.query(
      `SELECT * FROM Post where idPosts=${req.params.id}`,
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

//Adding a new post into the db // push update
router.post("/", (req, res) => {
  return adminControl.addPosts(req, res);
});

//Edit and Update by id
router.put("/:id", (req, res) => {
  return adminControl.editPosts(req, res);
});

//Delete product using id
router.delete("/:id", (req, res) => {
  return adminControl.deletePosts(req, res);
});

module.exports = router;
