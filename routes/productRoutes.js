const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProduct);

router.post('/', productController.createProduct);

router.patch('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

router.get('/:id/images', productController.getProductImages);

module.exports = router;