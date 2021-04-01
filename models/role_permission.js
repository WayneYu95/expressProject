var Sequelize = require("sequelize");
var db = require("./index");

const role_permission = db.define(
  "role_permission",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "autoIncrement id",
    },
    role_id: {
      type: Sequelize.INTEGER(11),
    },
    status: {
      type: Sequelize.INTEGER(1),
      defaultValue: 1,
    },
    permission_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
role_permission.sync({ alter: true });
module.exports = role_permission;
