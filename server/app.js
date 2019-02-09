const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoose_crud', {useNewUrlParser:true})

const todoRouter = require('./routers/todo')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors())

app.use('/todos/',todoRouter)


app.listen(port, ()=> {
    console.log(`listening to port ${port}`)
})