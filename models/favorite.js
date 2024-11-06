const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Favorite = sequelize.define('Favorite', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    productId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Product',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
}); 

module.exports = Favorite;