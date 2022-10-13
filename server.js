const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();
const PORT = process.env.port || 3001;

app.use(express.static('public'));

app.get('/api/notes', (req, res) => 
    res.json(JSON.parse(fs.readFileSync("./db/db.json")))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Serving static asset routes at http://localhost:${PORT}`)
);
