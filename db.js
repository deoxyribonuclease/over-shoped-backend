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

// Product has one shop and many categories
Product.belongsTo(Shop, { foreignKey: 'shopId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.hasMany(ProductProperty, { foreignKey: 'productId' });

// In Category model file
Category.hasMany(Product, { foreignKey: 'categoryId' });

// In ProductProperty model file
ProductProperty.belongsTo(Product, { foreignKey: 'productId' });
ProductProperty.belongsTo(Category, { foreignKey: 'categoryId' });

// Shop (One) to Product (Many)
Shop.hasMany(Product, { foreignKey: 'productId' });
Product.belongsTo(Shop, { foreignKey: 'shopId' });

// User (One) to Shop (One)
User.hasOne(Shop, { foreignKey: 'shopId' });
Shop.belongsTo(User, { foreignKey: 'userId' });

// User (Many) to Product (Many) through Favorite
User.belongsToMany(Favorite, { through: 'Favorite', foreignKey: 'userId' });
Product.belongsToMany(Favorite, { through: 'Favorite', foreignKey: 'productId' });

//// User (One) to Order (Many)
// User.hasMany(Order);
// Order.belongsTo(User)