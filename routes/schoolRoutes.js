const express = require('express');
const {addSchool} = require('../controllers/addSchool')
const {listSchool} = require('../controllers/listSchool')
const router = express.Router();
 router.post('/addschool',addSchool);
 router.get('/listschool',listSchool);

module.exports = router;