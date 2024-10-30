const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUser);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get('/email/:email', (req, res) => {
    const { email } = req.params;
    res.send(`this user get by email: ${email}`);
});

module.exports = router;