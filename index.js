const express = require("express");
const app = express();
const sequelize = require("./dbconfig");
const dotenv = require("dotenv").config();
const cors = require("cors");
var bodyParser = require("body-parser");
const http = require("http");
const userRouter = require("./routes/user.route");
const questionRouter = require("./routes/question.route");
const categoryRouter = require("./routes/category.route");

const formData = require('express-form-data');
const formidable = require('express-formidable');
// app.use(formidable());
// app.use(formData.parse());

const fileUpload = require("express-fileupload");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: "*"}));
app.use(fileUpload());

app.use(cors({origin: "*"}));
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

app.use("/", userRouter);
app.use("/", questionRouter);
app.use("/", categoryRouter);

const server = http.createServer(app);
const port = process.env.PORT || 3000;
sequelize.sync();
app.listen(port, () => console.log(`Server running on port ${port}`));
