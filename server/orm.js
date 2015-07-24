var Sequelize = require('sequelize');

// Export a orm model with some config
var sequelize = new Sequelize('exchangeworld', 'root', '12241224', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 1688,
        min: 0,
        idle: 3000
    },

    define: {
        timestamps: false,
    }
});

module.exports = sequelize;
