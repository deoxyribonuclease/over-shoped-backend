const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', productController.test);

module.exports = router;