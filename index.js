const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require('./db.js')

db.once('open', () => console.log('Connection to MongoDB successful'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/a/u', require('./modules/urlshortener/url.js'))
app.use('/u', require('./modules/urlshortener/redirect.js'));

app.use('/a/p', require('./modules/pastebin/paste.js'))
app.use('/p', require('./modules/pastebin/redirect.js'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./html/index.html"));
});

app.get('/:page', (req, res) => {
    let fpath = "./html/" + req.params.page + ".html";
    if (fs.existsSync(fpath)) {
        res.sendFile(path.join(__dirname, fpath));
    } else {
        res.send("Page not found.");
    }
});

app.get('/d/:file', (req, res) => {
    let fpath = "./content/" + req.params.file;
    if (fs.existsSync(fpath)) {
        res.download(path.join(__dirname, fpath));
    } else {
        res.send("File not found.");
    }
})

app.listen(3030, () => console.log("Listening on port 3030"));``