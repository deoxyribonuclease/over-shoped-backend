const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

const getOrder = async (id) => {
    return await Order.findOne({ where: { id: id }, include: [{ model: OrderItem, required: true, where: { orderId: id } }] });
};

const getOrdersByUser = async (userId) => {
    return await Order.findAll({ where: { userId: userId }, include: [{ model: OrderItem, required: true, include: [Product] }] });
};

const createOrder = async (userId, items, shipping, payment, promocode = null) => {
    let grandTotal = 0;

    const orderItems = await Promise.all(
        items.map(async (item) => {
            const product = await Product.findOne({ where: { id: item.productId } });

            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }

            if (product.stock < item.amount) {
                throw new Error(`Insufficient stock for product: ${product.name}. Available stock: ${product.stock}`);
            }

            const price = product.price * (1 - (product.discountPercentage || 0) / 100);
            const totalPrice = price * item.amount;

            product.stock -= item.amount;
            await product.save();

            grandTotal += totalPrice;

            return {
                productId: product.id,
                amount: item.amount,
                totalPrice,
            };
        })
    );

    const order = await Order.create({
        userId,
        status: 'На розгляді',
        grandTotal,
        shipping,
        payment,
        promocode,
    });

    await OrderItem.bulkCreate(
        orderItems.map((item) => ({
            ...item,
            orderId: order.id,
        }))
    );

    return order;
};

const updateOrder = async (id, updates) => {
    const order = await Order.findOne({ where: { id } });
    if (!order) {
        throw new Error('Order not found');
    }

    await order.update(updates);
    return getOrder(order.id);
};

const deleteOrder = async (id) => {
    const order = await Order.findByPk(id);
    if (order) {
        await OrderItem.destroy({ where: { orderId: id } });

        await order.destroy();
        return true;
    }
    return false;
};

module.exports = { getOrder, getOrdersByUser, createOrder, updateOrder, deleteOrder };