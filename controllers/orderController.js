const orderService = require('../services/orderService');

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderService.getOrder(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json('Order not found');
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to get order by id: ${error.message}` });
    }
};

const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await orderService.getOrdersByUser(userId);
        if (orders && orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).json('User\'s orders not found');
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve orders by userId: ${error.message}` });
    }
};

const createOrder = async (req, res) => {
    const { } = req.body;
    try {
        const newOrder = await orderService.createOrder();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: `Failed to create new order: ${error.message}` });
    }
};

const updateOrderById = async (req, res) => {
    const { id } = req.params;
    const { } = req.body;
    try {
        const updatedOrder = await orderService.updateOrder(id);
        if (updatedOrder) {
            res.status(200).json(order);
        } else {
            res.status(404).json('Order not found');
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to update order: ${error.message}` });
    }
};

const deleteOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        if (await orderService.deleteOrder(id)) {
            res.status(204).json();
        } else {
            res.status(404).json('Order not found');
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete order: ${error.message}` });
    }
};

module.exports = { getOrderById, getOrdersByUserId, createOrder, updateOrderById, deleteOrderById };