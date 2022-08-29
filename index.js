//Used to set up a server
const express = require("express");

//Used to prevent errors when working locally
const cors = require("cors");

//Initialize express as an app variable
const app = express();
//add routes
const users = require("./Routes/users");
const careers = require("./Routes/careersPage");
const posts = require("./Routes/posts");
const podcasts = require("./Routes/podcast");
const article = require("./Routes/articles");
const saved = require("./Routes/saved");
const subscriptions = require("./Routes/subscriptions");

//Set The Port
app.set("port", process.env.PORT || 3000);

//Enable the server to handle JSON requests
app.use(express.json());

//Import from HTML
app.use(express.static("Public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "public/index.html");
});

//use routes
app.use("/users", users);
app.use("/careers", careers);
app.use("/posts", posts);
app.use("/podcasts", podcasts);
app.use("/articles", article);
app.use("/saved", saved);
app.use("/subscriptions", subscriptions);

//Dont let local development give errors
app.use(
  cors({
    origin: ["http://192.168.8.102:8080/", "http://localhost:8080"],
    credentials: true,
  })
);
const PORT = process.env.PORT || 3000;

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on prt ${PORT}`);
  console.log("Press Ctrl+C to exit server");
  credentials: "include";
});
