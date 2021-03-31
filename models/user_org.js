var Sequelize = require("sequelize");
var db = require("./index");
const user_org = db.define(
  "user_org",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "自增id",
    },
    userId: {
      type: Sequelize.STRING,
    },
    orgId: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);
user_org.sync({alert: true});
module.exports = user_org