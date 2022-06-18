// importing dependecies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { json } = require('express');
const { notStrictEqual } = require('assert');

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