const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);

router.route('/:id')
    .get(categoryController.addCategory)
    .post(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = router;
