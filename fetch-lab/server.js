"use strict";

const express = require('express');
const app = express();

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse JSON request bodies (needed for POST)
app.use(express.json());

// ---- Your endpoints go below this line ----

// B.1: Simple GET endpoint
app.get('/hello', (req, res) => {
  res.type('text').send('Hello from the server!');
});

// B.2: JSON response (current time)
app.get('/api/time', (req, res) => {
  res.json({
    currentTime: new Date().toISOString(),
    message: "Current server time"
  });
});

// B.3: Route parameters
app.get('/api/greet/:name', (req, res) => {
  const name = req.params.name;

  res.json({
    greeting: `Hello, ${name}! Welcome to the API.`
  });
});

// B.4: Query parameters with error handling
app.get('/api/math', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const operation = req.query.operation;

  if (!operation || !['add', 'subtract', 'multiply', 'divide'].includes(operation)) {
    return res.status(400).json({
      error: "Invalid or missing operation. Use: add, subtract, multiply, divide"
    });
  }

  if (operation === 'divide' && b === 0) {
    return res.status(400).json({
      error: "Cannot divide by zero"
    });
  }

  let result;

  if (operation === 'add') {
    result = a + b;
  } else if (operation === 'subtract') {
    result = a - b;
  } else if (operation === 'multiply') {
    result = a * b;
  } else if (operation === 'divide') {
    result = a / b;
  }

  res.json({
    a: a,
    b: b,
    operation: operation,
    result: result
  });
});

// B.5: Simulating a slow API
app.get('/api/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      message: "Sorry for the wait!",
      delayMs: 3000
    });
  }, 3000);
});

// B.6: Simulating a flaky API
app.get('/api/unreliable', (req, res) => {
  const rand = Math.random();

  if (rand < 0.5) {
    res.status(500).json({
      error: "Server had a bad day. Try again!"
    });
  } else {
    res.json({
      message: "Lucky! It worked this time.",
      luckyNumber: Math.floor(Math.random() * 100)
    });
  }
});

// B.7: Message board (GET + POST)

let messages = [
  { id: 1, text: "Welcome to the message board!", author: "Admin" },
];
let nextId = 2;

// GET all messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// POST new message
app.post('/api/messages', (req, res) => {
  const text = req.body.text;
  const author = req.body.author;

  if (!text || !author) {
    return res.status(400).json({
      error: "text and author are required"
    });
  }

  const newMessage = {
    id: nextId,
    text: text,
    author: author
  };

  messages.push(newMessage);
  nextId++;

  res.status(201).json(newMessage);
});

// ---- Your endpoints go above this line ----

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});