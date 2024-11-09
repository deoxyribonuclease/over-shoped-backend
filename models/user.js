const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Покупець'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image : {
        type: DataTypes.BLOB('long'),
        allowNull: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING
});

module.exports = User;
