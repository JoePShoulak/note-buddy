const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.port || 3001;

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile('notes.html'));

app.listen(PORT, () =>
  console.log(`Serving static asset routes at http://localhost:${PORT}`)
);
