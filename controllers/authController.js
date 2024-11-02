const User = require('../models/user');
const authService = require('../services/authService')

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await authService.register(email, password);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).send(`Server error: ${error.message}`);
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    console.log(email);
    const token = await authService.login(email, password);
    console.log(token);
    if (token) {
        res.status(200).json(token);
    }
    else {
        res.status(500).send({ messag: "Pu-pu-puuu" });
    }
}

async function getUser(req, res) {
    try {
        // Fetch user data based on the user ID from the token
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = { registerUser, loginUser, getUser };