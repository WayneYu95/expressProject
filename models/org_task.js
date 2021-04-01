var Sequelize = require("sequelize");
var db = require("./index");

const org_task = db.define("org_task", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    comment: "autoIncrement id",
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    comment: '0:incomplete，1：complete'
  },
  orgId: {
    type: Sequelize.INTEGER,
  },
  taskId: {
    type: Sequelize.INTEGER,
  },
});
org_task.sync({ alter: true });
module.exports = org_task;
