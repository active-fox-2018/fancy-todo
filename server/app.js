require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const ListsRoute = require('./routes/lists-task')
const UsersRoute = require('./routes/users')
const verifyUser = require('./middlewares/verify-user')

const app = express()
const port = 3000

app.locals.verifyUser = verifyUser
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/Orderly', { useCreateIndex: true, useNewUrlParser: true })
    .then(() => {
        console.log('connected to database')
    })
    .catch(err => {
        console.log(err)
    })

app.use('/users', UsersRoute)
app.use(verifyUser)
app.use('/lists', ListsRoute)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
// process.on('unhandledRejection', (reason, p) => {
//     console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
//     // application specific logging, throwing an error, or other logic here
//   });