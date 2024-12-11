const Category = require('../models/category');

const getAllCategories = async () => {
    return await Category.findAll();
};

const addCategory = async (categoryData) => {
    return await Category.create(categoryData);
};

const updateCategoryName = async (id, newName) => {
    return await Category.update({ name: newName }, { where: { id } });
};

const removeCategory = async (id) => {
    return await Category.destroy({ where: { id } });
};

module.exports = {
    getAllCategories,
    addCategory,
    updateCategoryName,
    removeCategory,
};