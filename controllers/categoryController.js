const categoryService = require('../services/categoryService');

const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
};

const addCategory = async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim().length === 0) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        const newCategory = await categoryService.addCategory({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add category', error: error.message });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim().length === 0) {
        return res.status(400).json({ message: 'New category name is required' });
    }

    try {
        const updated = await categoryService.updateCategoryName(id, name);
        if (updated[0] === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await categoryService.removeCategory(id);
        if (deleted === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};

module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
};
