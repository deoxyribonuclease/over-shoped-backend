const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

const getOrder = async (id) => {
    return await Order.findOne({ where: { id: id }, include: [{ model: OrderItem, required: true, where: { orderId: id } }] });
};

const getOrdersByUser = async (userId) => {
    return await Order.findAll({ where: { userId: userId }, include: [{ model: OrderItem, required: true, include: [Product] }] });
};

const createOrder = async (params) => {

};

const updateOrder = async (params) => {

};

const deleteOrder = async (params) => {

};

module.exports = { getOrder, getOrderByUser, createOrder, updateOrder, deleteOrder };