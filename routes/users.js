var express = require("express");
var router = express.Router();
var user = require("../models/user");
var session = require("express-session");

// login
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
          msg: "success login~",
        });
      } else {
        res.send("Incorrect username or password");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
// logout
router.get("/logout", function (req, res, next) {
  delete req.session.user;
  res.json({
    code: 200,
    msg: "success logout~",
  });
});

router.get("/page", function (req, res, next) {
  console.log("if login", req.session.user);
  user
    .findAll({
      limit: 10,
      offset: 0 * 10,
    })
    .then((data) => {
      console.log("data", data);
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
// add new user
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
              msg: "success create~",
              data: reulst,
            });
          });
      } else {
        res.json({
          code: 200,
          msg: "username already exist",
        });
      }
    });
});
// delete user
router.post("/del", function (req, res, next) {
  let { id } = req.body;
  if (!id) {
    res.json({
      msg: "Please input ID",
    });
  }
  user
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
// update user
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
