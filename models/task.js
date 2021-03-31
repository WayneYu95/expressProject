var Sequelize = require("sequelize");
var db = require("./index");

const task = db.define("task", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    comment: "自增id",
  },
  taskName: {
    type: Sequelize.STRING,
  },
  // 0未完成 ，1完成
  status: {
    type: Sequelize.STRING,
    defaultValue: 0,
  },
  remark: {
    type: Sequelize.STRING,
  },
});
// 同步-- 检查表的状态并修正
task.sync({ alter: true });
module.exports = task;
