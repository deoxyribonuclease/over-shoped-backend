const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProduct);

router.post('/', productController.createProduct);

router.patch('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

router.get('/:id/images', productController.getProductImages);

router.get('/properties/:productId', productController.getAllPropertiesProduct);
router.post('/properties/', productController.createProductProperty);

router.route('/property/:propertyId')
    .get(productController.getProductPropertyById)
    .post(productController.updateProductPropertyById)
    .delete(productController.deleteProductPropertyById);

router.route('/properties/:productId/:propertyId')
    .get(productController.getProductProperty)
    .patch(productController.updateProductProperty)
    .delete(productController.deleteProductProperty);

module.exports = router;