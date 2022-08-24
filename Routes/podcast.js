const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");

//Getting all Podcasts for the Podcast Tab in DB
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM Podcasts", (err, result) => {
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
      `SELECT * FROM Podcasts WHERE idPodcasts=${req.params.id}`,
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

//Adding a new Podcast into the db
router.post("/", (req, res) => {
  const {
    idPodcasts,
    podcastTitle,
    podcastLink,
  } = req.body;

  try {
    connection.query(
      `INSERT INTO Podcasts (idPodcasts, podcastTitle, podcastLink) VALUES ("${idPodcasts}","${podcastTitle}", "${podcastLink}")`,
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
  const { podcastTitle, podcastLink } = req.body;
  try {
    connection.query(
      `UPDATE Podcasts SET podcastTitle = "${podcastTitle}", podcastLink = "${podcastLink}" WHERE idPodcasts=${req.params.id}`,
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
      `DELETE FROM Podcasts WHERE idPodcasts=${req.params.id}`,
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
