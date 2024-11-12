const express = require('express');
const multer = require('multer');
const router = express.Router();

const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/middleware');

const upload = multer();

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUser);

router.patch('/:id', upload.single('image'), userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get('/:id/image', userController.getUserImage);
// router.get('/:id/image', verifyToken, userController.getUserImage);

router.post('/', upload.single('image'), userController.createUser);

router.get('/email/:email', (req, res) => {
    const { email } = req.params;
    res.send(`this user get by email: ${email}`);
});

module.exports = router;