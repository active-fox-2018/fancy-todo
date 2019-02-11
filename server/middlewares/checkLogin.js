const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  verifyLogin: (req, res, next) => {
    console.log(req.headers);
    try {
      const decoded = jwt.verify(req.headers.token, process.env.SECRET);
      User
      .findOne({ email: decoded.token.email })
      .then((result) => {
          if (result) {
            req.user = result;
            next();
          }
        })
        .catch((err => {
          res.status(500).json({ message: err });
        }))
    } catch (error) {
      res.status(401).json({ message: 'Please Login first!' });
    }

  }
}