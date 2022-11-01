const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "../employees.sqlite",
});

module.exports = { db };
