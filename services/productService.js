const { Sequelize } = require('sequelize');
const Product = require('../models/product');

const getAllPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    return await Product.findAndCountAll({
        offset,
        limit,
    });
};

const get = async (id) => {
    return await Product.findByPk(id);
};

const add = async (productData) => {
    const { name, description, price, discountPercentage, images } = productData;
    return await Product.create({
        name,
        description,
        price,
        discountPercentage,
        images
    });
};

const update = async (id, productData) => {
    const { name, description, price, discountPercentage, stock, category, images, rating } = productData;
    const product = await Product.findByPk(id);
    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.discountPercentage = discountPercentage || product.discountPercentage;
        product.stock = stock || product.stock;
        product.category = category || product.category;
        product.images = images || product.images;
        product.rating = rating || product.rating;
        await product.save();
        return product;
    }
    return null;
};

const del = async (id) => {
    const product = await Product.findByPk(id);
    if (product) {
        await product.destroy();
        return true;
    }
    return false;
};

const getImages = async (id) => {
    const product = await Product.findByPk(id);
    if (product) {
        return product.images;
    }
    return null;
};

module.exports = { getAllPaginated, get, add, update, del, getImages }