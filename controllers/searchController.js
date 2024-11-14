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
    const { shopId, categoryId, properties, priceRange, ratingRange } = req.body;
    try {
        const products = await searchService.getProductsByFilters(shopId, categoryId, properties, priceRange, ratingRange);

        if (products && products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: 'No products with such parameters' });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const getProductsByText = async (req, res) => {
    const { searchText } = req.params;
    try {
        const products = await searchService.getProductsByText(searchText);

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