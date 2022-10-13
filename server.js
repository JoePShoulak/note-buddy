const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();
const PORT = process.env.port || 3001;

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
    let maxID = oldData.map(d => parseInt(d.id)).pop();
    
    let newNote = req.body;
    newNote["id"] = maxID + 1;

    return fs.writeFileSync("./db/db.json", JSON.stringify([...oldData, newNote]));
});

app.delete('/api/notes/:id', (req, res) => {
    console.log("(API) DELETE Notes called.");

    let oldData = JSON.parse(fs.readFileSync("./db/db.json"));
    let newData = oldData.filter(d => d.id != req.params.id)

    return fs.writeFileSync("./db/db.json", JSON.stringify(newData));
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
