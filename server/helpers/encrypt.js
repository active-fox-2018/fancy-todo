const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


module.exports = {
  encrypt: (params) => {
    return bcrypt.hashSync(params, salt);
  },
  decrypt: (params, params1) => {
    return bcrypt.compareSync(params, params1);
  }
}