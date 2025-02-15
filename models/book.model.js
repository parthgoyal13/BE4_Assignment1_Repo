const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    enum: [
      "Non-Fiction",
      "Business",
      "Autobiography",
      "Fiction",
      "Historical",
      "Romance",
      "Fantasy",
      "Mystery",
      "Thriller",
      "Self-help",
    ],
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  summary: {
    type: String,
    required: true,
  },
  coverImageUrl: {
    type: String,
    required: true,
  },
});
const BookModel = mongoose.model("BookModel", bookSchema);
module.exports = BookModel;
