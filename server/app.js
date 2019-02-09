require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fancy_todo', { useNewUrlParser: true });
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
const indexRouter = require('./routes/index')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/', indexRouter)

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})