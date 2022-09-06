const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");

//Getting all posts for the Articles Tab in DB
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

//Getting all posts by id
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
  const { idArticle, articleHeading, articleDescription, author } =
    req.body;
  try {
    connection.query(
      `INSERT INTO Article (idArticle, articleHeading, articleDescription, author) VALUES ("${idArticle}","${articleHeading}", "${articleDescription}", "${author}")`,
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

//Edit and Update by id
router.put("/:id", (req, res) => {
  const {
    articleHeading,
    articleDescription,
    author
  } = req.body;
  try {
    connection.query(
      `UPDATE Article SET articleHeading = "${articleHeading}", articleDescription = "${articleDescription}", author = "${author}" WHERE idArticle=${req.params.id}`,
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
      `DELETE FROM Article WHERE idArticle=${req.params.id}`,
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
