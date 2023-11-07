const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util'); //maybe can delete...// 
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Express App...//
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true }));

app.use(express.json());

app.use(express.static('./public'));

//HTML and API routes...// 
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', function(req, res) {
    readFileAsync('./db/db.json', 'utf8').then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

app.post('/api/notes', function(req, res) {
    const note = req.body;
    readFileAsync('./db/db.json', 'utf8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync('./db/db.json', JSON.stringify(notes))
        res.json(note);
    })
});

//Listening//
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
//Fix POST server. Get request to save html file, and possbily fix the buttons? // 