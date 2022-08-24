const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");

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
    try{
        connection.query(`SELECT * FROM Post where idPosts=${req.params.id}`,
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

//Adding a new post into the db
router.post("/", (req, res) => {
    const {
        idPosts,
        userName,
        postDescription,
        postURL, 
        postDate,
        idUsers,
    } = req.body;

    const post_Date = new Date().toISOString().slice(0, 19).replace("T", " ");
    try {
        connection.query(`INSERT INTO Posts (idPosts, userName, idUsers, postDescription, postURL, postDate) VALUES ("${idPosts}","${userName}", "${postDescription}", "${postURL}", "${postDate}", "${idUsers}")`,
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

//Edit and Update by id
router.put("/:id", (req, res) => {
  const {
    userName,
    postDescription,
    postURL,
    postDate,
    idUsers,
  } = req.body;
  try {
    connection.query(
      `UPDATE Posts SET userName = "${userName}", postDescription = "${postDescription}", postURL = "${postURL}", postDate = "${postDate}", idUsers = "${idUsers}" WHERE idPosts=${req.params.id}`,
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
      `DELETE FROM Posts WHERE idPosts=${req.params.id}`,
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
