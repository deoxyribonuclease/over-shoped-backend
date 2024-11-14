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

const getProductsByFilters = async (shopIds, categoryId, properties, priceRange, ratingRange, page, pageSize, orderBy) => {
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

    const propertyConditions = properties
        ? properties.map(prop => ({
            name: prop.name,
            content: { [Op.in]: prop.values },
        }))
        : [];

    let order;
    switch (orderBy) {
        case 'price_asc':
            order = [['price', 'ASC']];
            break;
        case 'price_desc':
            order = [['price', 'DESC']];
            break;
        case 'rating_asc':
            order = [['rating', 'ASC']];
            break;
        case 'rating_desc':
            order = [['rating', 'DESC']];
            break;
        default:
            order = [['price', 'ASC']];
            break;
    }

    const query = {
        where: whereConditions,
        include: [
            {
                model: Shop,
                required: true,
                where: shopIds && shopIds.ids !== null ? { id: { [Op.in]: shopIds.ids } } : {},
            },
            {
                model: Category,
                required: true,
                where: categoryId ? { id: categoryId } : {},
            },
            ...(propertyConditions.length > 0 ? [{
                model: ProductProperty,
                required: true,
                where: { [Op.and]: propertyConditions },
            }] : []),
        ],
        limit: pageSize,
        offset: (page - 1) * pageSize,
        order
    };

    return await Product.findAndCountAll(query);
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