const jwt = require('jsonwebtoken');

function generateToken(data) {
  const token = jwt.sign(data, process.env.secret)
  return token
}

function verifyToken(token) {
  try {
    let decoded = jwt.verify(token, process.env.secret);
    return decoded
  }
  catch (err) {
    throw new Error
  }

}

module.exports = { generateToken, verifyToken }