const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const main = require('./routes/index');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/fancy-todo', { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

app.use('/', main);

const port = 3000;
app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});