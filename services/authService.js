const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require("nodemailer");
const userService = require('../services/userService')
const { jwtSecret, email, pass } = require('../config');

const register = async (email, password, name) => {
  try {
    const user = await userService.getByEmail(email);
    if (user) {
      return { error: 'User already exists' };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    await userService.add({ email: email, password: passwordHashed, name: name});

    return { message: 'User registered successfully' };
  } catch (error) {
    return { error: `Server error: ${error.message}` };
  }
};

const login = async (email, password) => {
  try {
    const user = await userService.getByEmail(email);
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: 'Wrong password' }
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    return { token };
  } catch (error) {
    return { error: `Server error: ${error.message}` };
  }
};

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: email,
        pass: pass,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = { register, login, sendEmail };
