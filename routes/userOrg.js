var express = require("express");
var router = express.Router();
var userOrg = require("../models/user_org");

// 查找全部用户和组织的关系
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
    // 只能看到自己在的组织
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
// 用户权限 -- 邀请用户加入组织 必须是当前用户的组织
// 1.查询可加入的
// 2.
// 添加记录
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
          msg: "该记录已存在",
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
              msg: "创建成功~",
              result,
            });
          });
      }
    }).catch(err => res.json(err))
});

// 删除该记录   把用户踢出组织
router.post("/del", function (req, res, next) {
  let { userId, orgId } = req.body;
  userOrg
    .destroy({
      where: { userId, orgId },
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
