const express = require("express");
const morgan = require("morgan");
//const path = require("path");
const { getBook, writeBookToFile } = require('./utils.js');

const app = express();
const port = process.env.PORT || 8080;

/* Express-related functions/calls */

app.use(morgan('dev'));
app.use(express.static('public'));
bookRouter = express.Router();
app.use('/', bookRouter);

bookRouter.get('/:bookTitle', (req, res, next) => {
    let book = getBook(req.params.bookTitle);
    if (book) {
        res.send(book);
    }
    else {
        return res.status(404).send(new Error("Book not found"));
    }
});

bookRouter.post('/:bookTitle', (req, res, next) => {
    let bookTitle = req.params.bookTitle;
    let titleVal = req.query.title.replaceAll('_', ' ');
    let authorVal = req.query.author.replaceAll('_', ' ');

    if (titleVal && authorVal) {
        writeBookToFile(bookTitle, { title: titleVal, author: authorVal });
        res.status(201).send();
    }
    else {
        res.status(400).send("Invalid info");
    }
});

// Server listening
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});