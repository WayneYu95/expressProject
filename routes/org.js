var express = require("express");
var router = express.Router();
var org = require("../models/org");

//find all organization
router.post("/page", function (req, res, next) {
  org.findAll().then((data) => {
    res.json({
      code: 200,
      data,
    });
  });
});
// create new organization
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
              msg: "success create~",
              data: reulst,
            });
          });
      } else {
        res.json({
          code: 200,
          msg: "organization already exist",
        });
      }
    });
});
// delete organization
router.post("/del", function (req, res, next) {
  let { id } = req.body;
  org
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
// update organization
router.post("/upd", function (req, res, next) {
  let { orgName, id } = req.body;
  console.log("parameters",orgName, id);
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
