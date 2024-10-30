const sequelize = require('../db');
const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users'});
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to get user'});
    }
}

const createUser = async (req, res) => {
    const { name, email, password, address, phone } = req.body;
    try {
        const newUser = await User.create({ name, email, password, address, phone });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, address, phone } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.email = email || user.email;
            await user.save();
            user.name = name || user.name;
            user.password = password || user.password;
            user.address = address || user.address;
            user.phone = phone || user.phone;
            await user.save();
            res.status(204).json(user);
        }
        else {
            res.status(404).json({error: 'User not found'});
        }

    } catch (error) {
        res.status(500).json({error: `Failed to update user because ${error}`});
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(204).json();
        }
        else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to delete user'})
    }
};

module.exports = {getAllUsers, getUser, createUser, updateUser, deleteUser};