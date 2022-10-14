const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 80

/* == MIDDLEWARE == */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* == API ROUTES == */
app.get('/api/notes', (req, res) => {
    console.log("(API) GET Notes called.");

    return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});

app.post('/api/notes', (req, res) => {
    console.log("(API) POST Notes called.");

    let oldData = JSON.parse(fs.readFileSync("./db/db.json"));
    let maxID = oldData.length != [] ? oldData.map(d => parseInt(d.id)).pop() : 1;
    
    let newNote = req.body;
    newNote["id"] = maxID + 1;

    fs.writeFileSync("./db/db.json", JSON.stringify([...oldData, newNote]));
    return res.redirect('./public/notes.html')
});

app.delete('/api/notes/:id', (req, res) => {
    console.log("(API) DELETE Notes called.");

    let oldData = JSON.parse(fs.readFileSync("./db/db.json"));
    let newData = oldData.filter(d => d.id != req.params.id)

    fs.writeFileSync("./db/db.json", JSON.stringify(newData));
    return res.redirect('./public/notes.html')
});

/* == HTML ROUTES == */
app.get('/notes', (req, res) => {
    console.log("(HTML) GET Notes called.");

    return res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    console.log("(HTML) GET * route. Rendering index.html");

    return res.sendFile(path.join(__dirname, './public/index.html'))
});

/* == LISTEN == */
app.listen(PORT, () =>
  console.log(`Serving static asset routes at http://localhost:${PORT}`)
);
