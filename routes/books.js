var express = require('express');
var router = express.Router();
var Book = require("../models").Book;


/* GET books from the database. */
router.get('/', function(req, res, next) {
    Book.findAll({order: [["title", "ASC"]]}).then(function(books){
      res.render("index", {books});
    }).catch(function(error){
        res.send(500, error);
     });
  });

/* Create a new book entry. */
router.get('/new', function(req, res, next) {
    res.render("new-book", {book: Book.build()});
  });


/*  Posts a new book to the database */
router.post('/', function(req, res, next) {
    Book.create(req.body).then(function(book) {
      console.log(req.body)
      res.redirect("/books");
    }).catch(function(error){
        if(error.name === "SequelizeValidationError") {
          res.render("new-book", {book: Book.build(req.body), errors: error.errors})
        } else {
          throw error;
        }
    }).catch(function(error){
        res.send(500, error);
     });
  ;});


/* Shows book detail form */



  module.exports = router;