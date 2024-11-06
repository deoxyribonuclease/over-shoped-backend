const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'На розгляді',
    },
    grandTotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    shipping: {
        type: DataTypes.STRING
    },
    payment: {
        type: DataTypes.STRING
    },
    promocode: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
