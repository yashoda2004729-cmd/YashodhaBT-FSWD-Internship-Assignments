const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Books route working");
});

// Dummy data
let books = [
  { id: 1, title: "Harry Potter" },
  { id: 2, title: "The Alchemist" }
];

// GET all books
router.get("/", (req, res) => {
  res.json(books);
});

// GET single book
router.get("/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  res.json(book || { message: "Book not found" });
});

// POST add book
router.post("/", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title
  };
  books.push(newBook);
  res.json(newBook);
});

// PUT update book
router.put("/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (book) {
    book.title = req.body.title;
    res.json(book);
  } else {
    res.json({ message: "Book not found" });
  }
});

// DELETE book
router.delete("/:id", (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: "Book deleted" });
});

module.exports = router;