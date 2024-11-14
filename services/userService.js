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
    const { email, password, role, name, surname, image, verified, address, phone } = userData;
    return await User.create({
        email,
        password,
        role,
        name,
        surname,
        image,
        verified,
        address,
        phone
    });
};

const update = async (id, userData) => {
    const { email, password, role, name, surname, image, verified, address, phone } = userData;
    const user = await User.findByPk(id);
    if (user) {
        user.email = email || user.email;
        user.password = password || user.password;
        user.role = role || user.role;
        user.name = name || user.name;
        user.surname = surname || user.surname;
        user.verified = verified || user.verified;
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
