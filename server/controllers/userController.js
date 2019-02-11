const axios = require('axios');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

class UserController {

  static signin(req, res) {
    axios.get(`https://graph.facebook.com/debug_token?input_token=${req.body.token}&access_token=${process.env.app_id}`)
      .then(({ data }) => {
        if (data.data.error) {
          res.status(500).json({
            msg: `Your account session has expired. Do sign in again`
          })
        } else {
          return User
                  .findOne({
                    email: req.body.email
                  })
                  .then(data => {
                    if (data) {
                      const jwtToken = jwt.sign({
                        name: req.body.name,
                        email: req.body.email
                      }, process.env.jwt_secret);
                      res.status(200).json(jwtToken);
                    } else {
                      return User
                              .create({
                                name: req.body.name,
                                email: req.body.email,
                                password: process.env.password
                              })
                              .then(data => {
                                const jwtToken = jwt.sign({
                                  name: req.body.name,
                                  email: req.body.email
                                }, process.env.jwt_secret);
                                
                                res.status(201).json(jwtToken);
                              })
                    }
                  })
        }
      })
      .catch(err => {
        res.status(500).json({ err: err.message });
      })
  }

  static verify(req, res) {
    jwt.verify(req.body.token, process.env.jwt_secret, function(err, decoded) {
      if (err) {
        res.status(500).json({ err: err.message })
      } else {
        // console.log(decoded);
        User
          .findOne({
            email: decoded.email
          })
          .then(data => {
            if (!data) {
              res.status(404).json({
                msg: `Sign in is required`
              });
            } else {
              res.json();
            }
          })
          .catch(err => {
            res.status(500).json({ err: err.message });
          })
      }
    });
  }

}

module.exports = UserController;