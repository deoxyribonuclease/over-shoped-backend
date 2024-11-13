const { Sequelize } = require('sequelize');
const Product = require('../models/product');
const ProductProperty = require('../models/productProperty');

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
    const { shopId, categoryId, name, description, price, discountPercentage, images } = productData;
    return await Product.create({
        shopId,
        categoryId,
        name,
        description,
        price,
        discountPercentage,
        images
    });
};

const update = async (id, productData) => {
    const { shopId, categoryId, name, description, price, discountPercentage, stock, category, images, rating } = productData;
    const product = await Product.findByPk(id);
    if (product) {
        product.categoryId = categoryId || product.categoryId;
        product.shopId = shopId || product.shopId;
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.discountPercentage = discountPercentage || product.discountPercentage;
        product.stock = stock || product.stock;
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

const getProperties = async (id) => {
    return await ProductProperty.findAll({ where: { productId: id } });
};

const getProperty = async (productId, propertyId) => {
    return await ProductProperty.findOne({ where: { id: propertyId, productId: productId } });
}

const addProperty = async (formData) => {
    const { categoryId, productId, name, content } = formData;
    return await ProductProperty.create({
        categoryId,
        productId,
        name,
        content,
    });
}

const updateProperty = async (productId, propertyId, formData) => {
    const { categoryId, name, content } = formData;
    const property = await ProductProperty.findOne({ where: { productId: productId, id: propertyId } });
    if (property) {
        property.categoryId = categoryId || property.categoryId;
        property.productId = productId || property.productId;
        property.name = name || property.name;
        property.content = content || property.content;
        await property.save();
        return property;
    }
    return null;
}

const delProperty = async (productId, propertyId) => {
    const property = await ProductProperty.findOne({ where: { productId: productId, id: propertyId } });
    if (property) {
        await property.destroy();
        return true;
    }
    return false;
}

module.exports = {
    getAllPaginated,
    get,
    add,
    update,
    del,
    getImages,
    getProperties,
    getProperty,
    addProperty,
    updateProperty,
    delProperty
};