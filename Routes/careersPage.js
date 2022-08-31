const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");

//Getting all the CAREERS from the db
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM Careers", (err, result) => {
      if (err) throw err;
      res.status(200).json({ results: result });
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
        res.status(200).json({ results: result });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Adding a new career into the db
router.post("/", (req, res) => {
  const {
    idCareers,
    careerTitle,
    careerIndustry,
    careerDescription,
    careerURLImage,
    institutions,
    careerDayInLife,
  } = req.body;

  try {
    connection.query(
      `INSERT INTO Careers (idCareers,careerTitle,careerIndustry,careerDescription,careerURLImage,institutions,careerDayInLife) VALUES ("${idCareers}","${careerTitle}", "${careerIndustry}", "${careerDescription}", "${careerURLImage}", "${institutions}", "${careerDayInLife}")`,
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
    careerTitle,
    careerIndustry,
    careerDescription,
    careerURLImage,
    institutions,
    careerDayInLife,
  } = req.body;
  try {
    connection.query(
      `UPDATE Careers SET careerTitle = "${careerTitle}", careerIndustry = "${careerIndustry}", careerDescription = "${careerDescription}", careerURLImage = "${careerURLImage}", institutions = "${institutions}",careerDayInLife = "${careerDayInLife}" WHERE idCareers=${req.params.id}`,
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
      `DELETE FROM Careers WHERE career_id=${req.params.id}`,
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
