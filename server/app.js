const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000
const indexRoute = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/', indexRoute)

//connect to mongodb
mongoose.connect('mongodb://localhost/todo-fancy-dev', {useNewUrlParser:true}, (error) => {
  if(error) { console.log("error connecting to mongo", err)}
})

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})


