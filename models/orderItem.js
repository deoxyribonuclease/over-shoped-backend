const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const OrderItem = sequelize.define('OrderItem', {
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Order',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Product',
      key: 'id'
    },
    onDelete: 'CASCADE'
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

module.exports = OrderItem;