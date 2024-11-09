const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Favorite = sequelize.define('Favorite', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        primaryKey: true,
        onDelete: 'CASCADE',
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'id'
        },
        primaryKey: true,
        onDelete: 'CASCADE',
    }
});

module.exports = Favorite;