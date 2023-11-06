const express = require('express');
const path = require('path');

//Express App//
const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true }));

app.use(express.json());

app.use(express.static('./Develop/public'));

//HTML// 
app.get('/notes', function(req, res) {
    res.sendFile(path.join(_dirname, './Develop/public/notes.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(_dirname, './Develop/public/index.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(_dirname, './Develop/public/index.html'));
});

//Listening//
app.listen(PORT, function() {
    console.log("App listening on PORT..." + PORT);
});