const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const Review = sequelize.define('Review', {
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Product',
            key: 'id'
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
            allowNull: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
});