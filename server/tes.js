const Book = require('../models/books')

module.exports = {

  create: (req, res) => {
    Book
      .create(req.body)
      .then(book => {
        res.status(201).json({
          newBook: book,
          msg: 'New book data has been created'
        })
      })
      .catch(err => {
        res.status(500).json({
          ERROR: err,
          msg: 'Internal Server Error'
        })
      })
  },

  all: (req, res) => {
    Book
      .find({})
      .then(data => {
        if (!data.length) {
          res.status(404).json({
            msg: 'Data not found'
          })
        } else {
          res.status(200).json({
            books: data
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          ERROR: err,
          msg: 'Internal Server Error'
        })
      })
  },

  update: (req, res) => {
    Book
      .findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        if (!data) {
          res.status(404).json({
            msg: `There is no book with id ${req.params.id}`
          })
        } else {
          res.status(201).json({
            book: data,
            msg: `Book with id ${req.params.id} has been updated`
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          ERROR: err,
          msg: 'Internal Server Error'
        })
      })
  },

  delete: (req, res) => {
    Book
      .findByIdAndDelete({ _id: req.params.id })
      .then(() => {
          res.status(200).json({
            msg: `Book with id ${req.params.id} has been deleted`
          })
      })
      .catch(err => {
        res.status(500).json({
          ERROR: err,
          msg: 'Internal Server Error'
        })
      })
  }
}

