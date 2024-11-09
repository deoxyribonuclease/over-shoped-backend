const e = require('express');
const shopService = require('../services/shopService');

const getShop = async (req, res) => {
    const { id } = req.params;
    try {
        const shop = await shopService.get(id);
        if (shop) {
            res.status(200).json(shop);
        } else {
            res.status(404).json({ error: 'Shop not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to get shop: ${error.message}` });
    }
};

const getShopByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const shop = await shopService.getByUser(userId);
        if (shop) {
            res.status(200).json(shop);
        } else {
            res.status(404).json({ error: 'Shop not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to get shop by user: ${error.message}` });
    }
};

const createShop = async (req, res) => {
    const { name, userId, description, phoneNumber, email } = req.body;
    try {
        const newShop = await shopService.add({
            name,
            userId,
            description,
            phoneNumber,
            email
        });
        res.status(201).json(newShop);
    } catch (error) {
        res.status(500).json({ error: `Failed to create shop: ${error.message}` });
    }
};

const updateShop = async (req, res) => {
    const { id } = req.params;
    const { name, userId, description, phoneNumber, email } = req.body;
    try {
        const updatedShop = await shopService.update(id, { name, userId, description, phoneNumber, email });
        if (updatedShop) {
            res.status(201).json(updatedShop);
        } else {
            res.status(404).json({ error: 'Shop not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to update shop: ${error.message}` });
    }
};

const deleteShop = async (req, res) => {
    const { id } = req.params;
    try {
        if (await shopService.del(id)) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Shop not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete shop: ${error.message}` });
    }
};

module.exports = { getShop, getShopByUser, createShop, updateShop, deleteShop };