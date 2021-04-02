// Load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Load mongoose
const mongoose = require("mongoose");

require("./book")
const Book = mongoose.model("Book")

//Connect
mongoose.connect("mongodb+srv://admin:admin@lab3.uxvq8.mongodb.net/Lab03?authSource=admin&replicaSet=atlas-l7cxlf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", () => {
    console.log("Database Books Service is connected!");
});

app.get('/', (req, res) => {
res.send("This is the books service");
})

// Create func
app.post("/book", (req, res) => {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }

    // Create a new Book
    var book = new Book(newBook)

    book.save().then(() => {
        console.log("New book created!")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send("A new book created with success!")
})

app.get("/books", (req, res) => {
    Book.find().then((books) => {
        res.json(books)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {

        if(book){
            // Book data
            res.json(book)
        }else{
            res.sendStatus(404);
        }

    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.delete("/book/:id", (req, res) => {

    Book.findOneAndRemove(req.params.id).then(() => {
        res.send("Book removed with success!")
    }).catch(err => {
        if(err){
            throw err;
        }
    })

})

app.listen(4545, () => {
console.log("Up and running! -- This is our Books service");
})