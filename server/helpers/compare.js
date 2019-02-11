const bcrypt = require('bcrypt');

function checkPassword(passBody, passUser) {
  return bcrypt.compareSync(passBody, passUser)
}

module.exports = checkPassword