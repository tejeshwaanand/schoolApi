const connectDB = require('../config/db'); // Import the database connection

// Function to fetch a list of schools based on the provided latitude and longitude
exports.listSchool = async (req, res) => {
    try {
        // Extract query parameters from the request
        const { longitude, latitude, page = 1, limit = 10 } = req.query;

        // Convert latitude and longitude to float values
        const lati = parseFloat(latitude);
        const longi = parseFloat(longitude);

        // Check if latitude and longitude values are valid
        if (!lati || !longi) {
            res.status(412).json({
                success: false,
                message: "No data found", // Send an error response if coordinates are missing
            });
            return;
        }

        // Convert page and limit to integers
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const offset = (parsedPage - 1) * parsedLimit; // Calculate offset for pagination

        // Validate pagination inputs
        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage < 1 || parsedLimit < 1) {
            res.status(400).json({
                success: false,
                message: "Invalid pagination parameters", // Error response for invalid pagination inputs
            });
            return;
        }

        // SQL query to find the closest schools based on latitude and longitude
        const query = `
            SELECT *, 
                   POWER(latitude - ${lati}, 2) + POWER(longitude - ${longi}, 2) AS dis 
            FROM schools 
            ORDER BY dis 
            LIMIT ${parsedLimit} 
            OFFSET ${offset};
        `;

        // Execute the query
        connectDB.query(query, (err, rows) => {
            if (err) {
                console.log(err); // Log the error for debugging
                res.status(501).json({
                    success: false,
                    data: "Internal server error",
                    message: err.message, // Send error response if query execution fails
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: rows, // Send retrieved school data
                    message: "Data retrieved successfully",
                });
            }
        });

    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message,
        });
    }
};
