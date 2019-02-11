const bcrypt = require('bcryptjs')

class Password {
    static encrypt(password) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        return hash
    }

    static decrypt(password, hash) {
        return bcrypt.compareSync(password, hash); // true
    }

}

module.exports = Password