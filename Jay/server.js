const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const actor_routes = require("./app/routes/actor.routes");
const user_routes = require("./app/routes/user.routes");
const movie_routes = require("./app/routes/movie.routes");
require("dotenv").config();


var corsOptions = {
  origin: "http://localhost:8081"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Node Application" });
// });


app.use(actor_routes);
app.use(user_routes);
app.use(movie_routes);

// set port, listen for requests
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});