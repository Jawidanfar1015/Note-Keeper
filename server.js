// importing dependecies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { json } = require('express');
const { notStrictEqual } = require('assert');

// setting promises and variables for reading and writing file
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// setting up server
const app = express();
// assigning port for the server
const PORT = process.env.PORT || 3334;

// Static Middleware, using json and urlencoded true
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET request for api route
app.get('/api/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf-8').then((data) =>{
        const notes = [].concat(JSON.parse(data));
        res.json(notes);
    })
});

// POST request for api route
app.post('/api/notes', (req, res) => {
    const note = req.body;
    readFileAsync('./db/db.json', 'utf-8').then((data) => {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes;    
    }).then(( (notes) => {
        writeFileAsync('./db/db.json', JSON.stringify(notes))
        res.json(note);
    }))
});

// DELETE request for api route
app.delete('/api/notes/:id', (req, res) => {
    const idToBeDeleted = parseInt(req.params.id);
    readFileAsync('./db/db.json', 'utf-8').then( (data) => {
        const notes = [].concat(JSON.parse(data));
        const newNotesData = [];
        for (let i=0; i<notes.length; i++){
            if (idToBeDeleted !== notes[i].id){
                newNotesData.push(notes[i]);
            }
        }
        return newNotesData;
    }).then( (notes) => {
        writeFileAsync('./db/db.json', JSON.stringify(notes))
        res.send('Saved succesfully!!!');
    })
});

// GET request for HTML routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Get Request for fall back entries
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// listening to the port 
app.listen(PORT, () => {
    console.log(`App listening on Port: ${PORT}`);
});