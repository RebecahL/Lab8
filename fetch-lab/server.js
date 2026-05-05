"use strict";

const express = require('express');
const app = express();

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse JSON request bodies (needed for POST)
app.use(express.json());

// ---- Your endpoints go below this line ----
app.get('/hello', (req, res) => {
  res.type('text').send('Hello from the server!');
});


// ---- Your endpoints go above this line ----

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});