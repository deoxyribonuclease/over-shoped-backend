const Shop = require('../models/shop');

const getAll = async () => {
  return await Shop.findAll();  
};

const get = async (id) => {
    return await Shop.findByPk(id);
};

const getByUser = async (userId) => {
    return await Shop.findOne({ where: { userId: userId } });
};

const add = async (shopData) => {
    const { name, userId, description, phoneNumber, email } = shopData;
    return await Shop.create({ name, userId, description, phoneNumber, email });
}

const update = async (id, shopData) => {
    const { name, userId, description, phoneNumber, email } = shopData;
    const shop = await Shop.findByPk(id);
    if (shop) {
        shop.name = name || shop.name;
        shop.userId = userId || shop.userId;
        shop.description = description || shop.description;
        shop.phoneNumber = phoneNumber || shop.phoneNumber;
        shop.email = email || shop.email;
        return await shop.save();
    }
    return null;
};

const del = async (id) => {
    const shop = await Shop.findByPk(id);
    if (await shop.destroy()) {
        return true;
    }
    return false;
};

module.exports = { getAll, get, getByUser, add, update, del };