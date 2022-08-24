const express = require("express");
const router = express.Router();
const connection = require("../library/database_connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Get all users
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM Users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//Get users by ID
router.get("/:id", (req, res) => {
  try {
    connection.query(
      `SELECT * FROM Users WHERE idUsers='${req.params.id}'`,
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

//ADDING A NEW USER
router.post("/", (req, res) => {
  const {
    idUsers,
    userName,
    userEmail,
    userPassword,
    userAddress,
    userImage,
    userRole,
  } = req.body;
  try {
    connection.query(
      `INSERT INTO Users (idUsers,userName,userEmail,userPassword,userAddress,userImage,userRole) VALUES ("${idUsers}","${userName}", "${userEmail}", "${userPassword}", "${userAddress}", "${userImage}", "${userRole}")`,
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

//Updating a user
// router.put("/:id", (req, res) => {
//   const {
//     userName,
//     userEmail,
//     userPassword,
//     userAddress,
//     userImage,
//     userRole,
//   } = req.body;
//   try {
//     connection.query(
//       `UPDATE Users
//        SET  userName = "${userName}", userEmail = "${userEmail}", userPassword = "${userPassword}", userAddress = "${userAddress}", userImage = "${userImage}", userRole = "${userRole}"
//        WHERE idUsers='${req.params.id}'`,
//       (err, result) => {
//         if (err) throw err;
//         res.send(result);
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });
// Update user
router.put("/update-user/:id", (req, res) => {
  try {
    let sql = "SELECT * FROM Users WHERE ?";
    let user = {
      idUsers: req.params.id,
    };
    connection.query(sql, user, (err, result) => {
      if (err) throw err;
      if (result.length !== 0) {
        let updateSql = `UPDATE Users SET ? WHERE idUsers = ${req.params.id}`;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.userPassword, salt);
        let updateUser = {
          userName: req.body.userName,
          userEmail: req.body.userEmail,
          userPassword: hash,
          userAddress: req.body.userAddress,
          userImage: req.body.userImage,
          userRole: req.body.userRole,
        };
        connection.query(updateSql, updateUser, (err, updated) => {
          if (err) throw err;
          console.log(updated);
          res.send("Successfully Updated");
        });
      } else {
        res.send("User not found");
      }
    });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM users WHERE user_id='${req.params.id}'`,
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

//Register Route
//The Route where Encryption starts
router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO Users SET ?";
    const {
      userName,
      userEmail,
      userPassword,
      userAddress,
      userImage,
      userRole,
    } = req.body;

    //Start of Hashing/Encryption
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);

    let user = {
      userName,
      userEmail,
      //Sending these values to be stored within the table
      userPassword: hash,
      userAddress,
      userImage,
      userRole,
    };

    connection.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`User ${(user.userName, user.userEmail)} created Successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});

//Login
router.post("/login", (req, res) => {
  try {
    let sql = "SELECT * FROM Users WHERE ?";
    let user = {
      userEmail: req.body.userEmail,
    };
    connection.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        //Decryption
        //Accepts the password stored in the db and the password given by the user(req.body)
        const isMatch = await bcrypt.compare(
          req.body.userPassword,
          result[0].userPassword
        );

        //If the password does not match
        if (!isMatch) {
          res.send("Password is Incorrect");
        } else {
          const payload = {
            user: {
              idUsers: result[0].idUsers,
              userName: result[0].userName,
              userEmail: result[0].userEmail,
              userAddress: result[0].userAddress,
              userImage: result[0].userImage,
              userRole: result[0].userRole,
            },
          };
          //Creating a token and setting an expiry date
          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//Verify
router.get("/user/verify", (req, res) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (err, decodedToken) => {
    if (err) {
      res.status(401).json({
        msg: "Unauthorized Access!",
      });
    } else {
      res.status(200);
      res.send(decodedToken);
    }
  });
});

const middleware = require("../middleware/authentication");

router.get("/", middleware, (req, res) => {
  try {
    let sql = "SELECT * FROM Users";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// Importing the dependencies
const nodemailer = require("nodemailer");

router.post("/forgot-psw", (req, res) => {
  try {
    let sql = "SELECT * FROM Users WHERE ?";
    let user = {
      userEmail: req.body.userEmail,
    };
    connection.query(sql, user, (err, result) => {
      if (err) throw err;
      if (result === 0) {
        res.status(400), res.send("Email not found");
      } else {
        // Allows me to connect to the given email account || Your Email
        const transporter = nodemailer.createTransport({
          host: process.env.MAILERHOST,
          port: process.env.MAILERPORT,
          auth: {
            user: process.env.MAILERUSER,
            pass: process.env.MAILERPASS,
          },
        });

        // How the email should be sent out
        var mailData = {
          from: process.env.MAILERUSER,
          // Sending to the person who requested
          to: result[0].email,

          subject: "Password Reset",
          html: `<div>
            <h3>Hi ${result[0].full_name},</h3>
            <br>
            <h4>Click link below to reset your password</h4>

            <a href="https://user-images.githubusercontent.com/4998145/52377595-605e4400-2a33-11e9-80f1-c9f61b163c6a.png">
              Click Here to Reset Password
              user_id = ${result[0].user_id}
            </a>

            <br>
            <p>For any queries feel free to contact us...</p>
            <div>
              Email: ${process.env.MAILERUSER}
              <br>
              Tel: If needed you can add this
            <div>
          </div>`,
        };

        // Check if email can be sent
        // Check password and email given in .env file
        transporter.verify((error, success) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email valid! ", success);
          }
        });

        transporter.sendMail(mailData, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            res.send("Please Check your email", result[0].user_id);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// Rest Password Route

router.put("reset-psw/:id", (req, res) => {
  let sql = "SELECT * FROM Users WHERE ?";
  let user = {
    idUsers: req.params.id,
  };
  connection.query(sql, user, (err, result) => {
    if (err) throw err;
    if (result === 0) {
      res.status(400), res.send("User not found");
    } else {
      let newPassword = `UPDATE Users SET ? WHERE idUsers ='${req.params.id}'`;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const updatedPassword = {
        userName: result[0].userName,
        userEmail: result[0].userEmail,
        userAddress: result[0].userAddress,
        userRole: result[0].userRole,
        userImage: result[0].userImage,

        // Only thing im changing in table
        password: hash,
      };

      connection.query(newPassword, updatedPassword, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Password Updated please login");
      });
    }
  });
});

module.exports = router;
