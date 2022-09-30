const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");
const adminControl = require("../public/controllers/admin");

//Getting all the CAREERS from the db
router.get("/", (req, res) => {
  try {
    let sql = "SELECT * FROM Careers";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Getting all the careers by id
router.get("/:id", (req, res) => {
  try {
    connection.query(
      `SELECT * FROM Careers WHERE idCareers=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Adding a new career into the db
router.post("/", (req, res) => {
  return adminControl.addCareers(req, res);
});

//Edit and Update by id
router.put("/:id", (req, res) => {
  return adminControl.editCareers(req, res);
});

//Delete product using id
router.delete("/:id", (req, res) => {
  return adminControl.deleteCareers(req, res);
});

module.exports = router;
