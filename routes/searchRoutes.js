const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/categories', searchController.getAllCategories);

router.get('/properties/:categoryId', searchController.getAllProperties);

router.get('/contains/:searchText', searchController.getProductsByText);

router.get('/', searchController.getProductsFilters);

module.exports = router;