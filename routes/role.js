var express = require("express");
var router = express.Router();
var role = require("../models/role");

// 分页查询角色
router.post("/page", (req, res, next) => {
  role
    .findAll({
      limit: 10,
      offset: 0 * 10,
    })
    .then((data) => {
      res.json({
        code: 200,
        msg: "查询成功~",
        list: [...data],
      });
    });
});
// 新增角色
router.post("/add", function (req, res, next) {
  let { roleName, status, remark } = req.body;
  role
    .findOne({
      where: {
        roleName,
      },
    })
    .then((reulst) => {
      if (reulst == null) {
        role
          .create({
            roleName,
            status,
            remark,
          })
          .then((reulst) => {
            res.json({
              code: 200,
              msg: "创建成功~",
              data: reulst,
            });
          });
      } else {
        res.json({
          code: 200,
          msg: "已存在该角色",
        });
      }
    });
});
// 删除角色
router.post("/del", function (req, res, next) {
  let { id } = req.body;
  if (!id) {
    res.json({
      msg: "请传ID",
    });
  }
  role
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
    })
    .catch((err) => {
      res.json({
        err,
      });
    });
});
// 更新用户
router.post("/upd", function (req, res, next) {
  let { id, roleName, status, remark } = req.body;
  role
    .findOne({
      where: {
        id,
      },
    })
    .then((reulst) => {
      if (reulst != null) {
        role
          .upsert({
            roleName,
            status,
            remark,
          })
          .then((reulst) => {
            res.json({
              code: 200,
              msg: "修改成功~",
              data: reulst,
            });
          });
      } else {
        res.json({
          msg: "请传入正确的ID",
          code: 200,
        });
      }
    })
    .catch((err) => {
      res.json({
        err,
        code: 500,
      });
    });
});
module.exports = router;
