const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db");
const dotenv = require("dotenv");
const index = require("./Route/index");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/broker", index.stockBrokerRoute);
// app.use("/stock", index.categoryRoute);
// app.use("/product", index_1.productRoute);

app.listen(process.env.PORT || 3000, () => {
    db.MongoConnect.connect().then(res => console.log("DB connected"));
    console.log("Server running on port 3000");
});