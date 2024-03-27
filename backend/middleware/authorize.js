// middleware/authorize.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorize = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json("Authorization denied");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json("Token is not valid");
    }
};

module.exports = authorize;
