// files.models.js

const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Data = sequelize.define('Data', {
        dataId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        encryptedData: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        encryptionAlgorithm: {
            type: Sequelize.STRING,
            allowNull: true

        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users', // References the Users table
              key: 'userId',
            },
          },
    });

    return Data;
};
