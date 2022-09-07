const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");
const adminControl = require("../public/controllers/admin");

//Getting all Podcasts in DB
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

//Getting all podcasts by id
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
  return adminControl.addPodcasts(req, res);
});

//Edit and Update by id
router.put("/:id", (req, res) => {
  return adminControl.editPodcasts(req, res);
});

//Delete product using id
router.delete("/:id", (req, res) => {
  return adminControl.deletePodcasts(req, res);
});

module.exports = router;
