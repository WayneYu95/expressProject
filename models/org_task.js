var Sequelize = require("sequelize");
var db = require("./index");

const org_task = db.define("org_task", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    comment: "自增id",
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    comment: '0:未完成，1：完成'
  },
  orgId: {
    type: Sequelize.INTEGER,
  },
  taskId: {
    type: Sequelize.INTEGER,
  },
});
// 同步-- 检查表的状态并修正
org_task.sync({ alter: true });
module.exports = org_task;
