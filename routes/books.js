var express = require('express');
var router = express.Router();
var Book = require("../models").Book;


/* GET books from the database. */
router.get('/', function(req, res, next) {
    Book.findAll({order: [["title", "ASC"]]}).then(function(books){
      res.render("index", {books: books});
    }).catch(function(error){
        res.send(500, error);
     });
  });

/* Create a new book entry. */
router.get('/books/new', function(req, res, next) {
    res.render("/books/new", {book: Book.build()});
  });



  module.exports = router;