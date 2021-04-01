var Sequelize = require("sequelize");
var db = require("./index");

const user_role = db.define(
  "user_role",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "autoIncrement id",
    },
    uid: {
      type: Sequelize.INTEGER(11),
      comment: "user ID"
    },
    role_id: {
      type: Sequelize.INTEGER(11),
      comment: "role ID"
    },
  },
  {
    freezeTableName: true,
  }
);
user_role.sync({ alter: true });
module.exports = user_role;
