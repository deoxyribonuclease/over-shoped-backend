const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const Category = require('../models/category');
const ProductProperty = require('../models/productProperty');
const Product = require('../models/product');
const Shop = require('../models/shop');

const getCategories = async () => {
    return await Category.findAll();
};

const getCategoryProperties = async (categoryId) => {
    const properties = await ProductProperty.findAll({
        where: { categoryId },
        attributes: ['name', 'content'],
    });

    const propertyMap = {};
    properties.forEach(property => {
        const name = property.name;
        const content = property.content;

        if (!propertyMap[name]) {
            propertyMap[name] = new Set();
        }
        propertyMap[name].add(content);
    });

    const result = Object.keys(propertyMap).map(name => ({
        name,
        values: Array.from(propertyMap[name]),
    }));

    return result;
};

const getProductsByFilters = async (shopId, categoryId, properties, priceRange, ratingRange) => {
    const whereConditions = {
        ...(priceRange && (priceRange.min !== null || priceRange.max !== null) && {
            price: {
                ...(priceRange.min !== null ? { [Op.gte]: priceRange.min } : {}),
                ...(priceRange.max !== null ? { [Op.lte]: priceRange.max } : {}),
            },
        }),
        ...(ratingRange && (ratingRange.min !== null || ratingRange.max !== null) && {
            rating: {
                ...(ratingRange.min !== null ? { [Op.gte]: ratingRange.min } : {}),
                ...(ratingRange.max !== null ? { [Op.lte]: ratingRange.max } : {}),
            },
        }),
    };

    const propertyConditions = properties.map(prop => ({
        name: prop.name,
        content: { [Op.in]: prop.values },
    }));

    const query = {
        where: whereConditions,
        include: [
            {
                model: Shop,
                required: true,
                where: shopId ? { id: shopId } : {},
            },
            {
                model: Category,
                required: true,
                where: categoryId ? { id: categoryId } : {},
            },
            {
                model: ProductProperty,
                required: propertyConditions.length > 0,
                where: {
                    [Op.and]: propertyConditions,
                },
            },
        ],
    };

    return await Product.findAll(query);
};

const getProductsByText = async (searchText) => {
    return await Product.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.like]: `%${searchText}%` } },
                { description: { [Op.like]: `%${searchText}%` } }
            ]
        }
    });
};

module.exports = { getCategories, getCategoryProperties, getProductsByFilters, getProductsByText };