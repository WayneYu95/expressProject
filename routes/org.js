var express = require("express");
var router = express.Router();
var org = require("../models/org");

//查询所有的组织
router.post("/page", function (req, res, next) {
  org.findAll().then((data) => {
    res.json({
      code: 200,
      data,
    });
  });
});
// 新增组织
router.post("/add", function (req, res, next) {
  let { orgName } = req.body;
  org
    .findOne({
      where: {
        orgName,
      },
    })
    .then((reulst) => {
      if (reulst == null) {
        org
          .create({
            orgName,
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
          msg: "已存在该组织",
        });
      }
    });
});
// 删除组织
router.post("/del", function (req, res, next) {
  let { id } = req.body;
  org
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
// 修改组织
router.post("/upd", function (req, res, next) {
  let { orgName, id } = req.body;
  console.log("参数是",orgName, id);
  org
    .update(
      { orgName },
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
