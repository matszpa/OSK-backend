const express = require("express");
const app = express();
const sequelize = require("./dbconfig");
const dotenv = require("dotenv").config();
const http = require("http");
const userRouter = require("./routes/user.routes");
app.use(express.json());

app.use("/", userRouter);
const server = http.createServer(app);
const port = process.env.PORT || 3000;
sequelize.sync();
server.listen(port, () => console.log(`Server running on port ${port}`));
