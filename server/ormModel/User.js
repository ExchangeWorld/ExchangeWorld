var Sequelize = require('sequelize');
var sequelize = require('../orm');

// Define the schema of table `user`
var User = sequelize.define('user', {
    uid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fb_id: {
        type: Sequelize.STRING(128),
        allowNull: true,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photoPath: {
        type: Sequelize.STRING,
        allowNull: true
    },
    exchangeTable: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    followerTable: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    seekerTable: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = User;
