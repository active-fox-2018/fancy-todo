const bcrypt = require('bcryptjs')

module.exports = {
  hashGenerator: function(password) {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)
    return hash
  },

  compare:function(input, password) {
    var result = bcrypt.compareSync(input, password); 
    return result
  }
}