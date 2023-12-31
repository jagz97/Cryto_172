const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require("./users.models.js")(sequelize, Sequelize);
db.data = require("./data.models.js")(sequelize, Sequelize);

const User = db.users;
const Data = db.data;


User.hasMany(Data, { foreignKey: 'userId', as: 'data' });
Data.belongsTo(User, { foreignKey: 'userId' });





module.exports = db;