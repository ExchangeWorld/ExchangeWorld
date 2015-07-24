var Sequelize = require('sequelize');
var sequelize = require('../orm');

// Define the schema for table `goods`
var Goods = sequelize.define('goods', {
    gid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    gname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photoPath: {
        type: Sequelize.STRING,
        allowNull: true
    },
    categories: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    want: {
        type: Sequelize.STRING,
        allowNull: false
    },
    posX: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    posY: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    ownerID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Goods;
