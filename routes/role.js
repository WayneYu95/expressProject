var express = require("express");
var router = express.Router();
var role = require("../models/role");

// find all role
router.post("/page", (req, res, next) => {
  role
    .findAll({
      limit: 10,
      offset: 0 * 10,
    })
    .then((data) => {
      res.json({
        code: 200,
        msg: "success find~",
        list: [...data],
      });
    });
});
// add role
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
              msg: "success create~",
              data: reulst,
            });
          });
      } else {
        res.json({
          code: 200,
          msg: "role already exist",
        });
      }
    });
});
// delete role
router.post("/del", function (req, res, next) {
  let { id } = req.body;
  if (!id) {
    res.json({
      msg: "Please input ID",
    });
  }
  role
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
              msg: "success update~",
              data: reulst,
            });
          });
      } else {
        res.json({
          msg: "please input correct ID",
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
