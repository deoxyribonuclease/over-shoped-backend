const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 16;

    try {
        const result = await productService.getAllPaginated(page, limit);
        res.status(200).json({
            totalItems: result.count,
            products: result.rows,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page,
        });
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
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, discountPercentage, images } = req.body;
    try {
        const newProduct = await productService.add({
            name,
            description,
            price,
            discountPercentage,
            images
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, discountPercentage, images } = req.body;
    try {
        const updatedProduct = await productService.update(id, {
            name,
            description,
            price,
            discountPercentage,
            images
        });
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to update product: ${error.message}` });
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
        res.status(500).json({ error: `Failed to delete product: ${error.message}` });
    }
};

const getProductImages = async (req, res) => {
    const { id } = req.params;
    try {
        const images = await productService.getImages(id);
        if (images) {
            res.set('Content-Type', 'image/jpeg');
            res.status(200).json(images);
        } else {
            res.status(404).json({ error: 'Images not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve product images: ${error.message}` });
    }
};

const getAllPropertiesProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const properties = await productService.getProperties(productId);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve product properties: ${error.message}` });
    }
};

const getProductProperty = async (req, res) => {
    const { productId, propertyId } = req.params;
    try {
        const property = await productService.getProperty(productId, propertyId);
        if (property) {
            res.status(200).json(property);
        } else {
            res.status(404).json({ error: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve product property: ${error.message}` });
    }
};

const createProductProperty = async (req, res) => {
    try {
        const newProperty = await productService.addProperty(req.body);
        res.status(200).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: `Failed to create new product property: ${error.message}` });
    }
};

const updateProductProperty = async (req, res) => {
    const { productId, propertyId } = req.params;
    try {
        const updatedProperty = await productService.updateProperty(productId, propertyId, req.body);
        if (updatedProperty) {
            res.status(200).json(updatedProperty);
        } else {
            res.status(404).json({ error: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to update product property: ${error.message}` });
    }
};

const deleteProductProperty = async (req, res) => {
    const { productId, propertyId } = req.params;
    try {
        if (await productService.delProperty(productId, propertyId)) {
            res.status(200).json();
        } else {
            res.status(404).json({ error: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete product property: ${error.message}` });
    }
};

module.exports = {
    getAllProducts,
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProductImages, 
    getAllPropertiesProduct, 
    getProductProperty,
    createProductProperty,
    updateProductProperty,
    deleteProductProperty
};