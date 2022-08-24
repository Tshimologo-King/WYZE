const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");

//Getting all Saved items for the User Profile Tab in DB
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM Saved", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Getting all Saved Items by id
router.get("/:id", (req, res) => {
  try {
    connection.query(
      `SELECT * FROM Saved where idSaved=${req.params.id}`,
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

//Adding a new Saved Items into the db
router.post("/", (req, res) => {
  const {
    idSaved,
    idPosts,
    idArticles,
    idPodcasts,
    idCareers,
  } = req.body;

  try {
    connection.query(
      `INSERT INTO Saved (idSaved, idPosts, idArticles, idPodcasts, idCareers) VALUES ("${idSaved}","${idPosts}", "${idArticles}", "${idPodcasts}", "${idCareers}")`,
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
  const { idPosts, idArticles, idPodcasts, idCareers } =
    req.body;
  try {
    connection.query(
      `UPDATE Saved SET idPosts = "${idPosts}", idArticles = "${idArticles}", idPodcasts = "${idPodcasts}", idCareers = "${idCareers}" WHERE idSaved=${req.params.id}`,
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
      `DELETE FROM Saved WHERE idSaved=${req.params.id}`,
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
