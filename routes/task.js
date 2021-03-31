var express = require("express");
var router = express.Router();
var task = require("../models/task");

//查询所有的任务
router.post("/page", function (req, res, next) {
  task.findAll().then((data) => {
    res.json({
      code: 200,
      data,
      login: req.session.roleId,
    });
  });
});
// 新增任务
router.post("/add", function (req, res, next) {
  let { taskName, remark } = req.body;
  task
    .findOne({
      where: {
        taskName,
      },
    })
    .then((reulst) => {
      if (reulst == null) {
        task.create({ taskName, remark }).then((reulst) => {
          res.json({
            code: 200,
            msg: "创建成功~",
            data: reulst,
          });
        });
      } else {
        res.json({
          code: 200,
          msg: "已存在该任务名",
        });
      }
    });
});
// 删除任务
router.post("/del", function (req, res, next) {
  let { id } = req.body;
  task
    .destroy({
      where: { id },
    })
    .then((reulst) => {
      if (reulst) {
        res.json({
          msg: "删除成功~",
          code: 200,
        });
      } else {
        res.json({
          msg: "该记录不存在",
          code: 200,
        });
      }
    });
});
// 修改任务
router.post("/upd", function (req, res, next) {
  let { taskName, id, remark = undefined, status = undefined } = req.body;
  task
    .update(
      { taskName, remark, status },
      {
        where: { id },
      }
    )
    .then((result) => {
      if (result != 0) {
        res.json({
          code: 200,
          msg: "更新成功",
          result,
        });
      } else {
        res.json({
          code: 200,
          msg: "查无此纪录",
          result,
        });
      }
    });
});
// 修改任务状态任务
router.post("/upd", function (req, res, next) {
  let { taskName, id, remark = undefined, status = undefined } = req.body;
  task
    .update(
      { taskName, remark, status },
      {
        where: { id },
      }
    )
    .then((result) => {
      if (result != 0) {
        res.json({
          code: 200,
          msg: "更新成功",
          result,
        });
      } else {
        res.json({
          code: 200,
          msg: "查无此纪录",
          result,
        });
      }
    });
});
module.exports = router;
