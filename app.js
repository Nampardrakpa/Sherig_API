const express = require('express');
const bodyParser = require('body-parser');
const threadRoutes = require('./threadRoutes');
const threadController = require('./threadController');
require('dotenv').config(); // Load environment variables

// Create an Express application
const cors = require('cors');
const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount thread routes
app.use('/', threadRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the OpenAI Thread API');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});