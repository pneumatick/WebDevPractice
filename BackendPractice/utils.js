const fs = require("fs");

const booksFile = "books.json";

function getBook(title) {
    let data = fs.readFileSync(booksFile);
    let books = JSON.parse(data);
    return books[title];
}

function writeBookToFile(title, book) {
    let data = fs.readFileSync(booksFile);
    let books = JSON.parse(data);
    books[title] = book;
    fs.writeFileSync('books.json', JSON.stringify(books));
    console.log(`Book added: ${book.title} by ${book.author}`);
}

module.exports = { getBook, writeBookToFile };