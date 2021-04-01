var Sequelize = require("sequelize");
var db = require("./index");
const user = db.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "autoIncrement id",
    },
    username: {
      type: Sequelize.STRING,
    },
    pwd: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    roleId: {
      type: Sequelize.INTEGER(1),
      defaultStatus: 2,
    },
    status: {
      type: Sequelize.INTEGER,
      defaultStatus: 1,
    },
    remak: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);
user.sync({ alter: true });
module.exports = user;
