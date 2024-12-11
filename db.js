const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './shop.db'
});

module.exports = sequelize;

const Product = require('./models/product');
const Shop = require('./models/shop');
const User = require('./models/user');
const Favorite = require('./models/favorite');
const Category = require('./models/category');
const ProductProperty = require('./models/productProperty');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');

Product.belongsTo(Shop, { foreignKey: 'shopId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.hasMany(ProductProperty, { foreignKey: 'productId' });

Category.hasMany(Product, { foreignKey: 'productId' });

ProductProperty.belongsTo(Product, { foreignKey: 'productId' });
ProductProperty.belongsTo(Category, { foreignKey: 'categoryId' });

Shop.hasMany(Product, { foreignKey: 'productId' });
Product.belongsTo(Shop, { foreignKey: 'shopId' });

User.hasOne(Shop, { foreignKey: 'shopId' });
Shop.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Product, { through: Favorite, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Favorite, foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });