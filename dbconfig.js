const Sequelize = require("sequelize");
const config = require('./database/config/config.json');
const sequelize = new Sequelize(config.test);

module.exports = sequelize;
