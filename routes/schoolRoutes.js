const express = require('express'); // Import Express framework
const { addSchool } = require('../controllers/addSchool'); // Import the addSchool controller function
const { listSchool } = require('../controllers/listSchool'); // Import the listSchool controller function

const router = express.Router(); // Create a new router instance

// Route to add a new school (POST request)
router.post('/addschool', addSchool);

// Route to list schools based on location (GET request)
router.get('/listschool', listSchool);

module.exports = router; // Export the router to be used in the main server file
