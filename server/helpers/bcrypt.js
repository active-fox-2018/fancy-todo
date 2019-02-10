const bcrypt = require('bcrypt')

function comparePW(inputPassword, userPassword){
  return bcrypt.compareSync(inputPassword, userPassword)
}

function hashPW(user){
  var salt = bcrypt.genSaltSync(6)
  var hash = bcrypt.hashSync(user.password, salt)

  return hash
}

module.exports = {comparePW, hashPW}