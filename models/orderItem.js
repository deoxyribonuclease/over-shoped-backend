const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const OrderItem = sequelize.define('OrderItem', {
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Product',
      key: 'id'
    },
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2)
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});