const bcrypt = require('bcrypt')
 
function compareHash (pass, hash) {
  return bcrypt.compare(pass, hash)
}


module.exports = compareHash