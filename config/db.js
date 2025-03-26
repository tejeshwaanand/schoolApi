const mysql = require('mysql2'); // Import MySQL2 package
require("dotenv").config(); // Load environment variables from .env file

// Create a connection to the MySQL database
const connectDB = mysql.createConnection({
    host: process.env.DB_HOST,     // Database host (e.g., localhost or remote server)
    user: process.env.DB_USER,     // Database username
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME, // Name of the database
    port: process.env.PORT,        // Database port (default for MySQL is 3306)
});

// Connect to the database
connectDB.connect((err) => {
    if (err) {
        console.log("Connection failed", err); // Log error if connection fails
    } else {
        console.log("Connected to MySQL database"); // Success message
    }
});

module.exports = connectDB; // Export the database connection
