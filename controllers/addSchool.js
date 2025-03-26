const connectDB = require('../config/db'); // Import the database connection

// Function to add a new school to the database
exports.addSchool = async (req, res) => {
    try {
        // Extract data from request body
        const { name, address, latitude, longitude } = req.body;

        // Validate required fields
        if (!name || !address || !latitude || !longitude) {
            res.status(412).json({
                success: false,
                message: "Data is incomplete", // Send error response if any field is missing
            });
            return;
        }

        // SQL query to insert the new school into the database
        connectDB.query(
            `INSERT INTO schools (name, address, latitude, longitude) 
             VALUES ('${name}', '${address}', ${latitude}, ${longitude});`, 
            (err, rows, fields) => {
                if (err) {
                    // Handle database errors
                    res.status(501).json({
                        success: false,
                        data: "Internal server error",
                        message: err.message,
                    });
                } else {
                    // Send success response if insertion is successful
                    res.status(200).json({
                        success: true,
                        message: "Data successfully inserted",
                    });
                }
            }
        );

    } catch (error) {
        console.log(error); // Log error for debugging
        res.status(501).json({
            success: false,
            data: "Internal server error",
            message: error.message,
        });
    }
};
