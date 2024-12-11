const User = require("../models/user");
const authService = require("../services/authService");

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const result = await authService.register(email, password, name);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(`Server error: ${error.message}`);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const token = await authService.login(email, password);
  console.log(token);
  if (token) {
    res.status(200).json(token);
  } else {
    res.status(500).json({ message: "Pu-pu-puuu" });
  }
};

module.exports = { registerUser, loginUser };