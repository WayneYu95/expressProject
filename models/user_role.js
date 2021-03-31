var Sequelize = require("sequelize");
var db = require("./index");

const user_role = db.define(
  "user_role",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "自增id",
    },
    uid: {
      type: Sequelize.INTEGER(11),
      comment: "用户ID"
    },
    role_id: {
      type: Sequelize.INTEGER(11),
      comment: "角色ID"
    },
  },
  {
    freezeTableName: true,
  }
);
user_role.sync({ alter: true });
module.exports = user_role;
