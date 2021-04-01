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

// use session middleware
app.use(
  session({
    secret: "secret", // signature of related cookie
    resave: true,
    saveUninitialized: false, // if save related conversation
    cookie: {
      maxAge: 1000 * 60 * 3, // setup session time(unit ms)
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

// intercept --- use user ID
app.use((req, res, next) => {
  let action = req.originalUrl;
  console.log("action", action);
  // 公开路由 -- 不需要登录
  if (action == "/" || action == "/users/login" || action == "/users/logout") {
    next();
  } else {
    let roleId = req.session.roleId;
    if (!roleId) {
      res.json({
        code: 200,
        msg: "login expire",
        role: roleId,
        action,
      });
    } else {
      permissionRole
        .findAll({
          attributes: ["permission_id"],
          where: {
            role_id: roleId,
            status: 1,
          },
        })
        .then((apiList) => {
          console.log("intercept", apiList);
          apiList = apiList.map((item) => item.permission_id);
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
                  msg: "no permission",
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
