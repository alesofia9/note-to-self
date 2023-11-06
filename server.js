const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Express App//
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true }));

app.use(express.json());

app.use(express.static('./Develop/public'));

//HTML// 
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

//May get rid off later.//
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

//Listening//
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

app.get('/api/notes', function(req, res) {
    readFileAsync('./Develop/db/db.json', 'utf8').then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

app.post('/api/notes', function(req, res) {
    const note = req.body;
    readFileAsync('./Develop/db/db.json', 'utf8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync('./Develop/db/db.json', JSON.stringify(notes))
        res.json(note);
    })
});

//Fix POST server. Get request to save html file, and possbily fix the buttons? // 