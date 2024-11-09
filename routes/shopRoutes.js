const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shopController');

router.get('/user/:userId', shopController.getShopByUser);

router.post('/', shopController.createShop)

router.route('/:id')
    .get(shopController.getShop)
    .patch(shopController.updateShop)
    .delete(shopController.deleteShop);

module.exports = router;