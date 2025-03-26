const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes'); // Import school routes
require('dotenv').config(); // Load environment variables from .env file

const PORT = 5000; // Define the port number

// Middleware to parse incoming JSON requests
app.use(express.json());

// Root route to check if the server is running
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Use the school routes for API endpoints related to schools
app.use('/api/schools', schoolRoutes);

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
