import express from "express";
import Book from "../models/bookModel.js";
const router = express.Router();

//route to fetch all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).send({
      message: "we couldn't find any book",
    });
  }
});

//route to create new book
router.post("/new", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all required fields: title, author, publishYear",
      });
    } else {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };

      const book = new Book(newBook);

      await book.save();
      return res.json({
        message: "Book created successfully",
        book: book,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to update

router.put("/update/:id", async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        message: "the book you are looking to update doesn't exist",
      });
    } else {
      book.title = req.body.title;
      book.author = req.body.author;
      book.publishYear = req.body.publishYear;
      await book.save();
      return res.status(200).json({
        message: "the book is updated succesfully",
        book: book,
      });
    }
  } catch (error) {
    console.error("error", error);
  }
});

// route to delete
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log("id", req.params.id);
    let result = await Book.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully", result });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
