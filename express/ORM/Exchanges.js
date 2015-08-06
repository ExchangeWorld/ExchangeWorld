var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `exchanges`
var Exchanges = sequelize.define('exchanges', {
    eid: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // Smaller gid puts here
    gid1: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    // Larger gid puts here
    gid2: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    // Same as status in `Goods`
    // 1 means completed, and 0 means not
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Exchanges;
