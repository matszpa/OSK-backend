const Sequelize = require("sequelize");
require('dotenv').config();
var config = require('./database/config/config.json');
const sequelize = new Sequelize(config.development);

module.exports = sequelize;
