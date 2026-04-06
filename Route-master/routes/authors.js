const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Authors route working");
});

let authors = [
  { id: 1, name: "J.K. Rowling" },
  { id: 2, name: "Paulo Coelho" }
];

// GET all authors
router.get("/", (req, res) => {
  res.json(authors);
});

// GET single author
router.get("/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  res.json(author || { message: "Author not found" });
});

// POST add author
router.post("/", (req, res) => {
  const newAuthor = {
    id: authors.length + 1,
    name: req.body.name
  };
  authors.push(newAuthor);
  res.json(newAuthor);
});

// PUT update author
router.put("/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (author) {
    author.name = req.body.name;
    res.json(author);
  } else {
    res.json({ message: "Author not found" });
  }
});

// DELETE author
router.delete("/:id", (req, res) => {
  authors = authors.filter(a => a.id != req.params.id);
  res.json({ message: "Author deleted" });
});

module.exports = router;
