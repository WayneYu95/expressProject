var express = require("express");
var router = express.Router();
var userOrg = require("../models/user_org");

// find all relation between user and org
router.post("/page", function (req, res, next) {
  let roleId = req.session.roleId;
  if (roleId == 1) {
    userOrg.findAll().then((result) => {
      res.json({
        code: 200,
        data: result,
        roleId,
      });
    });
  } else {
    let userId = req.session.userId;
    userOrg
      .findAll({
        where: {
          userId,
        },
      })
      .then((result) => {
        res.json({ code: 200, data: result, roleId });
      })
      .catch((err) => {
        res.json(err);
      });
  }
});
// add record
router.post("/add", function (req, res, next) {
  let { userId, orgId } = req.body;
  userOrg
    .findOne({
      where: {
        orgId,
        userId,
      },
    })
    .then((result) => {
      if (result !== null) {
        res.json({
          code: 200,
          msg: "This record already exist",
        });
      } else {
        userOrg
          .create({
            userId,
            orgId,
          })
          .then((result) => {
            res.json({
              code: 200,
              msg: "success create~",
              result,
            });
          });
      }
    }).catch(err => res.json(err))
});

// delete record, remove user from org
router.post("/del", function (req, res, next) {
  let { userId, orgId } = req.body;
  userOrg
    .destroy({
      where: { userId, orgId },
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
// update record
router.post("/upd", function (req, res, next) {
  let { userId, orgId, id } = req.body;
  userOrg
    .update(
      { orgId, userId },
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
