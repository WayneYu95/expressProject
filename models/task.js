var Sequelize = require("sequelize");
var db = require("./index");

const task = db.define("task", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    comment: "autoIncrement id",
  },
  taskName: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 0,
  },
  remark: {
    type: Sequelize.STRING,
  },
});
task.sync({ alter: true });
module.exports = task;
