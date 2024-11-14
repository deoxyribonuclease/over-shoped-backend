const { Sequelize } = require('sequelize');
const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve users: ${error.message}` });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.get(id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to get user: ${error.message}` });
    }
};

const createUser = async (req, res) => {
    const { email, password, role, name, surname, verified, address, phone } = req.body;
    const image = req.file ? req.file.buffer : null;
    try {
        const newUser = await userService.add({
            name,
            surname,
            role,
            email,
            password,
            address,
            phone,
            verified,
            image
        });
        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            res.status(500).json({ error: `User already exists: ${error.message}` });
        } else {
            res.status(500).json({ error: `Server error: ${error.message}` });
        }
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, role, name, surname, verified, address, phone } = req.body;
    const image = req.file ? req.file.buffer : null;
    try {
        const updatedUser = await userService.update(id, { email, password, role, name, surname, verified, address, phone, image });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to update user because ${error.message}` });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (await userService.del(id)) {
            res.status(204).json();
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete user: ${error.message}` })
    }
};

const getUserImage = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.get(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.set('Content-Type', 'image/jpeg');
            res.send(user.image);
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve image: ${error.message}` });
    }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser, getUserImage };