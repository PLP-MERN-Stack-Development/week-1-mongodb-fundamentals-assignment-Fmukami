// queries.js
// Run each section in MongoDB Shell or mongosh

// Task 2: Basic CRUD Operations

// 1. Find all books in a specific genre (e.g., "Technology")
db.books.find({ genre: "Technology" });

// 2. Find books published after a certain year (e.g., after 2015)
db.books.find({ published_year: { $gt: 2015 } });

// 3. Find books by a specific author (e.g., "John Doe")
db.books.find({ author: "John Doe" });

// 4. Update the price of a specific book (e.g., "The Art of MongoDB" to $35.99)
db.books.updateOne({ title: "The Art of MongoDB" }, { $set: { price: 35.99 } });

// 5. Delete a book by its title (e.g., "Mystery of the Nile")
db.books.deleteOne({ title: "Mystery of the Nile" });


// Task 3: Advanced Queries

// a) Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// b) Use projection to return only the title, author, and price fields
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// c) Sort books by price ascending
db.books.find().sort({ price: 1 });

// d) Sort books by price descending
db.books.find().sort({ price: -1 });

// e) Pagination: limit and skip (e.g., page 2, 5 books per page)
db.books.find().skip(5).limit(5);


// Task 4: Aggregation Pipeline

// a) Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } }
]);

// b) Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", books: { $sum: 1 } } },
  { $sort: { books: -1 } },
  { $limit: 1 }
]);

// c) Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: { $concat: [
        { $toString: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] } ] } },
        "0s"
      ] },
      count: { $sum: 1 }
    }
  }
]);


// Task 5: Indexing

// a) Create an index on the title field
db.books.createIndex({ title: 1 });

// b) Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// c) Use explain() to demonstrate index performance
db.books.find({ title: "JavaScript Mastery" }).explain("executionStats");
db.books.find({ author: "John Doe", published_year: 2023 }).explain("executionStats");
