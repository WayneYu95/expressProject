var Sequelize = require("sequelize");
var db = require("./index");

const role = db.define(
  "role",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "autoIncrement id",
    },
    roleName: {
      type: Sequelize.STRING,
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
role.sync({ alter: true });
module.exports = role;
