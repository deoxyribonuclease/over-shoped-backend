const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const Review = sequelize.define('Review', {
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'id'
        },
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

module.exports = Review;