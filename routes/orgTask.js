var express = require("express");
var router = express.Router();
var orgTask = require("../models/org_task");

//查一个组织的任务
router.post("/page", function (req, res, next) {
  let { orgId } = req.body;
  orgTask
    .findAll({
      where: {
        orgId,
      },
    })
    .then((data) => {
      res.json({
        code: 200,
        data,
      });
    });
});
/* 新增组织和任务
  orgId, taskId
*/
router.post("/add", function (req, res, next) {
  let { orgId, taskId } = req.body;
  orgTask
    .findAll({
      where: {
        orgId,
        taskId,
      },
    })
    .then((result) => {
      if (result == null) {
        res.json({
          code: 200,
          msg: "已有记录",
          result,
        });
      }
      orgTask
        .create({
          orgId,
          taskId,
        })
        .then((result) => {
          res.json({
            code: 200,
            msg: "创建成功~",
            result,
          });
        });
    });
});
// 删除组织和任务 -- 根据组织ID
router.post("/del", function (req, res, next) {
  let { orgId } = req.body;
  orgTask
    .destroy({
      where: { orgId },
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
// 修改 根据ID
router.post("/upd", function (req, res, next) {
  let { orgId, taskId, id } = req.body;
  orgTask
    .update(
      { orgId, taskId },
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
// 为用户分配任务  --- 必须任务在组织内
router.post("/userAddTask", function (req, res, next) {
  let { userId, taskId, orgId } = req.body;
  orgTask
    .update(
      {
        userId,
      },
      {
        where: {
          taskId,
          orgId,
        },
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
// 取消任务负责人
router.post("/userDelTask", function (req, res, next) {
  let { userId, taskId, orgId } = req.body;
  orgTask
    .update(
      {
        userId: null,
      },
      {
        where: {
          taskId,
          orgId,
          userId,
        },
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
// 查询当前用户的组织
router.post("/userOrg", function (req, res, next) {
  orgTask
    .findOne({
      where: {
        userId: req.session.userId,
      },
    })
    .then((data) => {
      res.json({
        code: 200,
        data,
        msg: req.session.userId
      });
    });
});

module.exports = router;
