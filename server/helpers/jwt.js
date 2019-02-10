require('dotenv').config()
const jwt = require('jsonwebtoken')

function jwtSign (payload){
  try{
    return jwt.sign(payload, process.env.JWT_SECRET)
  } catch (error){
    throw error
  }
}

function jwtVerify(token){
  try{
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error){
    throw error
  }
}

module.exports = {jwtSign, jwtVerify}