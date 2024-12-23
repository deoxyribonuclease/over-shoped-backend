const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
    shopId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Shops',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    discountPercentage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'id'
        },
        allowNull: true,
        onDelete: 'SET NULL',
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true
    },
    rating: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0
    }
});

module.exports = Product;