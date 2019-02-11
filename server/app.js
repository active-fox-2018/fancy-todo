
require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const cors = require('cors')

const todoRoutes = require('./routes/todo')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true})

app.use('/', todoRoutes);

app.listen(port, () => {
  console.log(`listening to port --- 3000`)
})

