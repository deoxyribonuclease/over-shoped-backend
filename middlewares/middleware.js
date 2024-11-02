const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = verifyToken;