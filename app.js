const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


app.listen(process.env.PORT || 3000, () => {
    db.MongoConnect.connect().then(res => console.log("DB connected"));
    console.log("Server running on port 3000");
});