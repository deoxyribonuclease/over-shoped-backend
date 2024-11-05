const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './shop.db'
});

module.exports = sequelize;

const Product = require('./models/product');
const Shop = require('./models/shop');
const User = require('./models/user');

// Shop (One) to Product (Many)
Shop.hasMany(Product);
Product.belongsTo(Shop);

// User (One) to Shop (One)
User.hasOne(Shop);
Shop.belongsTo(User);

// User (One) to Order (Many)
// User.hasMany(Order);
// Order.belongsTo(User)