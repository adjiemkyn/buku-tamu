// api/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const guestsRoute = require('./routes/guest');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/guest', guestsRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
