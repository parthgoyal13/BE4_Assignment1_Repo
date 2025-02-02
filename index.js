const { initializeDatabase } = require("./db/db.connect");
const Book = require("./models/book.model");
initializeDatabase();

const express = require("express");

const app = express();
app.use(express.json());

async function createBook(newBook) {
  try {
    const book = new Book(newBook);
    const saveBook = await book.save();
    return saveBook;
  } catch (error) {
    throw error;
  }
}
app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    res
      .status(201)
      .json({ message: "Book added successfully", book: savedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error adding book: ", error });
  }
});

async function readAllBooks(books) {
  try {
    const allBooks = await Book.find();
    return allBooks;
  } catch (error) {
    console.log("Error occurred in reading all hotels", error);
  }
}

app.get("/books", async (req, res) => {
  try {
    const books = await readAllBooks();
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "No books found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error occured in fetching all books", error });
  }
});

async function readBookByTitle(title) {
  try {
    const bookByTitle = await Book.findOne({ title: title });
    return bookByTitle;
  } catch (error) {
    console.log(error);
  }
}
app.get("/books/:bookTitle", async (req, res) => {
  try {
    const bookTitle = await readBookByTitle(req.params.bookTitle);
    if (bookTitle.length != 0) {
      res.json(bookTitle);
    } else {
      res.status(404).json({ error: "No book found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in fetching book by title" });
  }
});

async function readBookByAuthor(author) {
  try {
    const bookByAuthor = await Book.find({ author: author });
    return bookByAuthor;
  } catch (error) {
    console.log(error);
  }
}
app.get("/book/:bookAuthor", async (req, res) => {
  try {
    const bookAuthor = await readBookByAuthor(req.params.bookAuthor);
    if (bookAuthor.length != 0) {
      res.json(bookAuthor);
    } else {
      res.status(404).json({ error: "No book found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in fetching book by title" });
  }
});

async function readBookByGenre(genre) {
  try {
    const businessBook = await Book.find({ genre: genre });
    return businessBook;
  } catch (error) {
    console.log(error);
  }
}
app.get("/bookgenre/:bookGenre", async (req, res) => {
  try {
    const bookGenre = await readBookByGenre(req.params.bookGenre);
    if (bookGenre.length != 0) {
      res.json(bookGenre);
    } else {
      res.status(404).json({ error: "Noo book found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in fetching business genre book" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

async function readBookByYear(year) {
  try {
    const bookYear = await Book.find({ publishedYear: year });
    return bookYear;
  } catch (error) {
    console.log(error);
  }
}

app.get("/bookYear/:year", async (req, res) => {
  try {
    const bookByYear = await readBookByYear(req.params.year);
    if (bookByYear.length != 0) {
      res.json(bookByYear);
    } else {
      res.status(404).json({ error: "No book found on the given year" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in finding book of year 2012" });
  }
});

async function updateBookRating(bookId, dataToUpdate) {
  try {
    const updatedBookRating = await Book.findByIdAndUpdate(
      bookId,
      dataToUpdate,
      { new: true }
    );
    return updatedBookRating;
  } catch (error) {
    console.log("Error occured in updating book data", error);
  }
}
app.post("/bookUpdate/:bookId", async (req, res) => {
  try {
    const updatedBookRating = await updateBookRating(
      req.params.bookId,
      req.body
    );
    if (updatedBookRating) {
      res.status(200).json({
        message: "Book updated successfully",
        updatedBookRating: updatedBookRating,
      });
    } else {
      res.status(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to updated book rating" });
  }
});

async function updateBookRatingByTitle(bookTitle, dataToUpdate) {
  try {
    const bookRatingByTitle = await Book.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      {
        new: true,
      }
    );
    return bookRatingByTitle;
  } catch (error) {
    console.log("Error occured in updating book data", error);
  }
}

app.post("/bookRatingTitle/:bookTitle", async (req, res) => {
  try {
    const bookRatingTitle = await updateBookRatingByTitle(
      req.params.bookTitle,
      req.body
    );
    if (bookRatingTitle) {
      res.status(200).json({
        message: "book updated successfully",
        bookRatingTitle: bookRatingTitle,
      });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

async function deleteBookById(bookId) {
  try {
    const deleteBook = await Book.findByIdAndDelete(bookId);
    return deleteBook;
  } catch (error) {
    console.log(error);
  }
}
app.delete("/bookdelete/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBookById(req.params.bookId);
    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Book" });
  }
});
