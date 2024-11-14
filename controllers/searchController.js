const searchService = require('../services/searchService');

const getAllCategories = async (req, res) => {
    try {
        const categories = await searchService.getCategories();
        if (categories) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({ error: 'Table is empty' });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const getAllProperties = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await searchService.getCategoryProperties(categoryId);
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: 'No properties' })
        }
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const getProductsFilters = async (req, res) => {
    let { shopIds, categoryId, properties, priceRange, ratingRange } = req.query;
   
    shopIds = shopIds ? JSON.parse(shopIds) : undefined;
    properties = properties ? JSON.parse(properties) : undefined;
    priceRange = priceRange ? JSON.parse(priceRange) : undefined;
    ratingRange = ratingRange ? JSON.parse(ratingRange) : undefined;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 16;
    const orderBy = req.query.orderBy || 'price_asc';
    try {
        const products = await searchService.getProductsByFilters(shopIds, categoryId, properties, priceRange, ratingRange, page, pageSize, orderBy);

        if (products && products.rows.length > 0) {
            res.status(200).json({
                totalItems: products.count,
                products: products.rows,
                totalPages: Math.ceil(products.count / pageSize),
                currentPage: page
            });
        } else {
            res.status(404).json({ error: 'No products with such parameters' });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};


const getProductsByText = async (req, res) => {
    const { searchText } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 16;
    try {
        const products = await searchService.getProductsByText(searchText, page, pageSize);

        if (products && products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: 'No products with such parameters' });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    } 
};

module.exports = { getAllCategories, getAllProperties, getProductsFilters, getProductsByText };