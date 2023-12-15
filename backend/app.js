const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./app/config/db.config.js");

db.sequelize.sync({force: false});

app.listen(3000);