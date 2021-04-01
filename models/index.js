const Sequelize = require("sequelize");
const sequelize = new Sequelize("rbacsystem", "root", "82564372Yu!", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
module.exports = sequelize;
