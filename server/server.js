const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

global.__basedir = __dirname;

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  cookieSession({
    name: "crypto-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: false,
    sameSite: 'strict'
  })
);


const db = require("./app/models");
db.sequelize.sync({force: true})
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });




// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Cryptoid application." });
});


require("./app/routes/users.routes")(app);
require("./app/routes/crypto.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});