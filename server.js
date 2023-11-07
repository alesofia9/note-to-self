const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8000;
const app = express();
const fs = require('fs');
const allNotes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML & API routes...//
app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNewNote(body, Notesarray) {
    const newNote = body;
    if (!Array.isArray(Notesarray))
        Notesarray = [];
    
    if (Notesarray.length === 0)
        Notesarray.push(0);

    body.id = Notesarray[0];
    Notesarray[0]++;

    Notesarray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(Notesarray, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});

function deleteNote(id, Notesarray) {
    for (let i = 0; i < Notesarray.length; i++) {
        let note = Notesarray[i];

        if (note.id == id) {
            Notesarray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(Notesarray, null, 2)
            );

            break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);