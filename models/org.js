var Sequelize = require("sequelize");
var db = require("./index");

const org = db.define(
  "org",
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      comment: "autoIncrement id",
    },
    orgName: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
org.sync({ alter: true });
module.exports = org;
