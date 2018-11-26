var express = require('express');
var app = express();
var router = express.Router();
var Book = require("../models").Book;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

/* GET /books - Shows the full list of books */
router.get('/', function(req, res, next) {
    Book.findAll({order: [["title", "ASC"]]}).then(function(books){
      res.render("index", {books});
    }).catch(function(error){
        res.send(500, error);
     });
  });

/* GET /books/new - Shows the create new book form. */
router.get('/new', function(req, res, next) {
    res.render("new-book", {book: Book.build()});
  });


/*  POST /books/new - Posts a new book to the database */
router.post('/', function(req, res, next) {
    Book.create(req.body).then(function(book) {
      res.redirect('books/' + book.id);
    }).catch(function(error){
        if(error.name === "SequelizeValidationError") {
          res.render("new-book", {book: Book.build(req.body), errors: error.errors, title: "New Book"})
        } else {
          throw error;
        }
    }).catch(function(error){
        res.send(500, error);
     });
  });


/* GET /books/:id - Shows book detail form */
router.get("/:id", function(req, res, next){
    Book.findByPk(req.params.id).then(function(book){
      if(book) {
        res.render("update-book", {book: book, title: book.title});      
      } else {
        res.send(404);
      }
    }).catch(function(error){
        res.send(500, error);
     });
  });

  /* POST /books/:id - Updates book info in the database */
  router.post("/:id", function(req, res, next){
    console.log(req.params.id)
    Book.findById(req.params.id).then(function(book){
      if(book) {
        return book.update(req.body);
      } else {
        res.send(404);
      }
    }).then(function(book){
      res.redirect("/books/" + book.id);        
    }).catch(function(error){
        if(error.name === "SequelizeValidationError") {
          var book = Book.build(req.body);
          book.id = req.params.id;
          res.render("books/edit", {book: book, errors: error.errors})
        } else {
          throw error;
        }

    }).catch(function(error){
        res.send(500, error);
     });
  });

  module.exports = router;