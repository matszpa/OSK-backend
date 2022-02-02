const express = require("express");
const app = express();
const sequelize = require("./dbconfig");
app.use("/", (req, res) => {
  res.send("elo");
});

sequelize.sync();
app.listen(3000, () => console.log("Działa"));
