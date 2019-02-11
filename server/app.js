const createError = require('http-errors');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const route = require('./route')
const port = 3000

const app = express()
app.use(cors())

const url = 'mongodb://localhost:27017/Fancy-Todo'
mongoose.connect(url, { useNewUrlParser: true })
.then(() => {console.log("connected")},
  err => {console.log("err",err);}
);

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', route)

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
    next(createError(404));
  });

app.listen(port, ()=> {
    console.log(`application running on port ${port}`)
})