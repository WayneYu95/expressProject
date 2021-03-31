var express = require("express");
var router = express.Router();
var user = require("../models/user");
var session = require("express-session");

// 登录
router.post("/login", function (req, res, next) {
  console.log(req.query, "query");
  console.log(req.body, "body");
  let { username, pwd } = req.body;

  user
    .findOne({
      where: { pwd, username },
    })
    .then((modelReuslt) => {
      if (modelReuslt !== null) {
        if (!req.body) return res.sendStatus(400);
        req.session.roleId = modelReuslt.roleId;
        req.session.userId = modelReuslt.id;
        res.json({
          success: true,
          code: 200,
          data: {
            modelReuslt,
          },
          userId: req.session.userId,
          roleId: req.session.roleId,
          msg: "登录成功~",
        });
      } else {
        res.send("账户或密码不正确");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
// 注销
router.get("/logout", function (req, res, next) {
  delete req.session.user;
  res.json({
    code: 200,
    msg: "注销成功~",
  });
});
// 分页查询 默认一页十条，第1页
router.get("/page", function (req, res, next) {
  console.log("是否有登录", req.session.user);
  user
    .findAll({
      limit: 10, //每页10条
      offset: 0 * 10, //第x页*每页个数
    })
    .then((data) => {
      console.log("数据", data);
      res.json({
        code: 200,
        data,
        login: req.session.roleId || false,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});
// 新增用户
router.post("/add", function (req, res, next) {
  let { username, pwd, status, remark = null, roleId } = req.body;
  user
    .findOne({
      where: {
        username,
      },
    })
    .then((reulst) => {
      if (reulst == null) {
        user
          .create({
            username,
            pwd,
            status,
            remark,
            roleId,
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
          msg: "已存在该用户名",
        });
      }
    });
});
// 删除用户
router.post("/del", function (req, res, next) {
  let { id } = req.body;
  if (!id) {
    res.json({
      msg: "请传ID",
    });
  }
  user
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
  let { username, pwd, status, remark, roleId } = req.body;
  user
    .update(
      { pwd, status, remark, roleId },
      {
        where: { username },
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
// // 测试
// router.post("/test", function(req, res, next){
//   // a = Sequelize.query("SELECT * FROM `user`")
//   res.json('a')
// })

module.exports = router;
