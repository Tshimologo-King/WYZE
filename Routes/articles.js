const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");
const adminControl = require("../public/controllers/admin");

//Getting all Articles in DB
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM Article", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Getting all Articles by id
router.get("/:id", (req, res) => {
  try {
    connection.query(
      `SELECT * FROM Post where idArticle=${req.params.id}`,
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

//Adding a new Article into the db
router.post("/", (req, res) => {
  return adminControl.addArticles(req, res);
});

//Edit and Update by id
router.put("/:id", (req, res) => {
  return adminControl.editArticle(req, res);
});

//Delete product using id
router.delete("/:id", (req, res) => {
  return adminControl.deleteArticle(req, res);
});

module.exports = router;
