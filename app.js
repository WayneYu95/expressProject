var createError = require("http-errors");
var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var roleRouter = require("./routes/role");
var orgRouter = require("./routes/org");
var taskRouter = require("./routes/task");
var orgTaskRouter = require("./routes/orgTask");
var userOrgRouter = require("./routes/userOrg")
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 使用 session 中间件
app.use(
  session({
    secret: "secret", // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
      maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// model
var role = require("./models/role");
var promission = require("./models/permission");
var permissionRole = require("./models/role_permission");
var org = require("./models/org");
var task = require("./models/task");
var org_task = require("./models/org_task");
var user_org = require("./models/user_org");

app.use("/", indexRouter);

// 拦截 --- 通过角色ID，获取权限表。
app.use((req, res, next) => {
  let action = req.originalUrl;
  console.log("action", action);
  // 公开路由 -- 不需要登录
  if (action == "/" || action == "/users/login" || action == "/users/logout") {
    next();
  } else {
    let roleId = req.session.roleId;
    // 1为经理，所有放权
    //  else if (roleId == 1) {
    //   next();
    // }
    if (!roleId) {
      res.json({
        code: 200,
        msg: "登录过期",
        role: roleId,
        action,
      });
    } else {
      // 通过角色获取权限列表;
      permissionRole
        .findAll({
          attributes: ["permission_id"],
          where: {
            role_id: roleId,
            status: 1,
          },
        })
        .then((apiList) => {
          console.log("接口拦截", apiList);
          apiList = apiList.map((item) => item.permission_id);
          // 通过权限列表获取，权限路由
          promission
            .findAll({
              attributes: ["action"],
              where: {
                id: apiList,
              },
            })
            .then((result) => {
              result = result.map((item) => item.action);
              if (result.some((item) => item == action)) {
                next();
              } else {
                res.json({
                  code: 200,
                  msg: "无权限",
                  result,
                });
              }
            });
        });
    }
  }
});
app.use("/users", usersRouter);
app.use("/role", roleRouter);
app.use("/org", orgRouter);
app.use("/task", taskRouter);
app.use("/orgTask", orgTaskRouter);
app.use("/userOrg", userOrgRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
