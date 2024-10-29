const express = require('express');
const app = express();

// Define a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// Specify the port and start the server
const port = process.env.PORT || 3000; // Use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
