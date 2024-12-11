const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/user/:userId', orderController.getOrdersByUserId);

router.route('/:id')
    .get(orderController.getOrderById)
    .post(orderController.updateOrderById)
    .delete(orderController.deleteOrderById);

module.exports = router;