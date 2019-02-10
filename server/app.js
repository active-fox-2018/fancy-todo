const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cors = require('cors')
mongoose.connect('mongodb://localhost:27017/fancytodo', {useNewUrlParser: true});

const userRoutes = require('./routes/user')
app.use(express.urlencoded({extended : true}))
app.use(express.json())



app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.use('/', userRoutes)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected');
  
});

app.listen(port, function(){
    console.log('listen to port ', port);
})