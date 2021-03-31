const Sequelize = require("sequelize");
const sequelize = new Sequelize("rbacsystem", "root", "201766", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
module.exports = sequelize;
