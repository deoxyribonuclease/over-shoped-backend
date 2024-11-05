const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Favorite = sequelize.define('Favorite', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: id
        }
    },
    productId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Product',
            key: id
        }
    }
}); 

Favorite.belongsTo('User', { foreignKey: 'shopId' });
User.hasMany('Favorite', { foreignKey: 'shopId' });

module.exports = Favorite;