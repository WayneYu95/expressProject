var Sequelize = require("sequelize");
var db = require("./index");

const permission = db.define(
  "permission",
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      comment: "autoIncrement id",
    },
    title: {
      type: Sequelize.STRING(50),
    },
    action: {
      type: Sequelize.STRING(64),
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    remark: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
permission.sync({ alter: true });
module.exports = permission;
