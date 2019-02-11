const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken');
const { decrypt } = require('../helpers/encrypt');

module.exports = {
  gLogin: (req, res) => {
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.CLIENT_ID
    })
      .then((ticket) => {
        const payload = ticket.getPayload();
        return User
          .findOne({ email: payload.email })
          .then((user) => {
            if (user) {
              return user;
            } else {
              return User
                .create({
                  full_name: payload.name,
                  email: payload.email,
                  password: payload.sub,
                  avatar: payload.picture
                })
            }
          });
      })
      .then((token) => {
        let getToken = jwt.sign({ token }, process.env.SECRET);
        res.status(201).json(getToken);
      })
      .catch((err) => {
        res.status(500).json(err);
      })
  },
  createUser: (req, res) => {
    User
      .create({
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        avatar: 'https://profile.actionsprout.com/default.jpeg'
      })
      .then((user) => {
        // console.log(user);
        res.status(201).json({ user, message: 'You have been successfully register' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  login: (req, res) => {
    User
      .findOne({ email: req.body.email })
      .then((result) => {
        if (result) {
          const decryptPW = decrypt(req.body.password, result.password);
          if (decryptPW) {
            let getToken = jwt.sign({ result }, process.env.SECRET);
            res.status(200).json(getToken);
          } else {
            res.status(404).json({ message: 'Wrong Password!' });
          }
        } else {
          res.status(404).json({ message: 'Wrong Email!' });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}