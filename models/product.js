const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
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
    catehory: {
        type: DataTypes.STRING,
        allowNull: true
    },
    images: {
        type: DataTypes.JSON, 
        allowNull: true
    }
  /*  shopId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Shops',
            key: 'id'
        }
    } */
});

// Shop.hasMany(Product, { foreignKey: 'shopId' });
// Product.belongsTo(Shop, { foreignKey: 'shopId' });

module.exports = Product;