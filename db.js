const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './shop.db' // SQLite file location
});

module.exports = sequelize;
