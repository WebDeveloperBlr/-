const Sequilize = require('sequelize');

let db = {
  host: process.env.MYSQL_HOST || "localhost",
  name: process.env.MYSQL_DATABASE || "auto-crm",
  username: "root",
  password: ""
};
const sequilize = new Sequilize(db.name, db.username, db.password, {
  host: db.host,
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
module.exports = {
  connection: sequilize
};
