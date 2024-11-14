const { Sequelize } = require("sequelize");
const User = require("../models/user");

const getAll = async () => {
    return await User.findAll();
};

const get = async (id) => {
    return await User.findByPk(id);
};

const getByEmail = async (email) => {
    return await User.findOne({ where: { email: email } });
};

const add = async (userData) => {
    const { name, surname, email, password, address, phone, image} = userData;
    return await User.create({
        name,
        surname,
        email,
        password,
        address,
        phone,
        image,
    });
};

const update = async (id, userData) => {
    const { name, email, password, address, phone, image } = userData;
    const user = await User.findByPk(id);
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        user.address = address || user.address;
        user.phone = phone || user.phone;

        if (image !== null) {
            user.image = image;
        }

        await user.save();
        return user;
    }
    return null;
};

const del = async (id) => {
    const user = await User.findByPk(id);
    if (user) {
        await user.destroy();
        return true;
    }
    return false;
};

module.exports = { getAll, get, add, update, del, getByEmail };
