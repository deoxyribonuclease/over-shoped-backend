const { Sequelize } = require('sequelize');
const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productService.get(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, discountPercetnage, images } = req.body;
    try {
        const newProduct = await productService.add({
            name,
            description,
            price,
            discountPercetnage,
            images
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, discountPercetnage, images} = req.body;
    try {
        const updatedProduct = await productService.update(id, {
            name,
            description,
            price,
            discountPercetnage,
            images
        });
        if (updateProduct) {
            res.status(200).json(updateProduct);
        } else {
            res.status(404).json({ error: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to update user: ${error.message}` });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if (await productService.del(id)) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
     } catch (error) {
            res.status(500).json({ error: `Failed to delete user: ${error.message}` });
        }
};

const getProductImages = async (req, res) => {
    const { id } = req.params;
    try {
        const images = await productService.getProductImages(id);
        if (images) {
            res.set('Content-Type', 'images/jpeg');
            res.status(200).json(images);
        } else {
            res.status(404).json({ error: 'Images not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve product images: ${error.message}` });
    }
};

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductImages };