var express = require("express");
var router = express.Router();
var task = require("../models/task");

//find all tasks
router.post("/page", function (req, res, next) {
  task.findAll().then((data) => {
    res.json({
      code: 200,
      data,
      login: req.session.roleId,
    });
  });
});
// add new task
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
            msg: "success create~",
            data: reulst,
          });
        });
      } else {
        res.json({
          code: 200,
          msg: "task already exist",
        });
      }
    });
});
// delete task
router.post("/del", function (req, res, next) {
  let { id } = req.body;
  task
    .destroy({
      where: { id },
    })
    .then((reulst) => {
      if (reulst) {
        res.json({
          msg: "success delete~",
          code: 200,
        });
      } else {
        res.json({
          msg: "Record not found",
          code: 200,
        });
      }
    });
});
// update task
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
          msg: "success update",
          result,
        });
      } else {
        res.json({
          code: 200,
          msg: "Record not found",
          result,
        });
      }
    });
});
// update task status
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
          msg: "success update",
          result,
        });
      } else {
        res.json({
          code: 200,
          msg: "Record not found",
          result,
        });
      }
    });
});
module.exports = router;
