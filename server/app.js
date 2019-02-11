const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/db_todoList', {useNewUrlParser:true})

const todoRouter = require('./routers/todo')
const userRouter = require('./routers/user')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors())

app.use('/todos/',todoRouter)
app.use('/users/',userRouter)


app.listen(port, ()=> {
    console.log(`listening to port ${port}`)
})