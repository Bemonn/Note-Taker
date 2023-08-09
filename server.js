const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

//Static Middleware
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});