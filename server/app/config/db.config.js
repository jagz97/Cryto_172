module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "new_password",
    DB: "174testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };