const bcrypt = require("bcryptjs");
const connection = require("../../library/database_connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//ADD NEW CAREERS, EDIT CAREERS + DELETE
async function addCareers(req, res){
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
}

async function editCareers(req, res) {
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
    }


async function deleteCareers(req, res) {
    
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
}

//ADD NEW POSTS, EDIT POSTS + DELETE
async function addPosts(req, res) {
        const { postDescription, postTitle, author } = req.body;
        try {
          connection.query(
            `INSERT INTO Posts ( postDescription, postTitle, author) VALUES ( "${postDescription}", "${postTitle}", "${author}")`,
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

async function editPosts(req, res) {
        const { postTitle, postDescription, author } = req.body;
        
        try {
          connection.query(
            `UPDATE Posts SET postTitle = "${postTitle}}", postDescription = "${postDescription}", author="${author}" WHERE idPosts=${req.params.id}`,
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


async function deletePosts(req, res) {
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
}

//ADD NEW PODCAST, EDIT + DELETE PODCASTS
async function addPodcasts(req, res) {
        const { idPodcasts, podcastTitle, podcastLink, podTranscript } = req.body;

        try {
        connection.query(
            `INSERT INTO Podcasts (idPodcasts, podcastTitle, podcastLink, podTranscript) VALUES ("${idPodcasts}","${podcastTitle}", "${podcastLink}", "${podTranscript}")`,
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


async function editPodcasts(req, res) {
        const { podcastTitle, podcastLink, podTranscript } = req.body;
        try {
          connection.query(
            `UPDATE Podcasts SET podcastTitle = "${podcastTitle}", podcastLink = "${podcastLink}", podTranscript = "${podTranscript}" WHERE idPodcasts=${req.params.id}`,
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


async function deletePodcasts(req, res) {
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
    }


//ADD NEW ARTICLES, EDIT + DELETE ARTICLES
async function addArticles(req, res) {
        const { idArticle, articleHeading, articleDescription, author } = req.body;
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
    }


async function editArticle(req, res) {
        const { articleHeading, articleDescription, author } = req.body;
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
    }


async function deleteArticle(req, res) {
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
    }


module.exports = {
    addCareers, editCareers, deleteCareers, addPosts, editPosts, deletePosts, addArticles, editArticle, deleteArticle, addPodcasts, editPodcasts, deletePodcasts
};