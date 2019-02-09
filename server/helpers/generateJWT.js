const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
    const token = jwt.sign({ 
        name: user.full_name,
        email: user.email   
    }, process.env.JWT_SECRET);
    return token
}

module.exports = generateToken