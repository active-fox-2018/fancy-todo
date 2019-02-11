const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3000
// const {OAuth2Client} = require('google-auth-library');
// const CLIENT_ID = "154176578214-08n338hqi0ntf34oe4o4pliiqj1b8an2.apps.googleusercontent.com"
// const client = new OAuth2Client(CLIENT_ID);

require('dotenv').config()
mongoose.connect('mongodb://localhost:27017/fancy-todo', { useNewUrlParser: true })

const todoRoute = require('./routes/route_todo')
const userRoute = require('./routes/route_user')
const indexRoute = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', indexRoute)
app.use('/todo', todoRoute)
app.use('/user', userRoute)

// app.get('/', (req, res) => {
//   res.status(200).json({
//     display: 'Masuk'
//   })
// })

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
