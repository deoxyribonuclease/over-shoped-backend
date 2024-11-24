const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Favorite = sequelize.define('Favorite', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    }
}, {
    timestamps: false, 
    indexes: [
        {
            unique: true,
            fields: ['userId', 'productId'],
        },
    ],
});

module.exports = Favorite;
