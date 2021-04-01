var express = require("express");
var router = express.Router();
var orgTask = require("../models/org_task");

//find projects
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
/* add new project
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
          msg: "Record already exist",
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
            msg: "success create~",
            result,
          });
        });
    });
});
// delete project
router.post("/del", function (req, res, next) {
  let { orgId } = req.body;
  orgTask
    .destroy({
      where: { orgId },
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
// update project
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
// assign project to user
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
// unassign project from user
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
// find user's current project
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
