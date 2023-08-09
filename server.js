const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

const PORT = process.env.PORT || 3000;

//Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static Middleware
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = { ...req.body, id: uuidv4() };

    // Read the current notes from db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);

        // Add the new note to the list
        notes.push(newNote);

        // Write the updated list of notes back to db.json
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});