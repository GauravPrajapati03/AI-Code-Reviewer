const express = require('express')
const router = express.Router();
const getResponse = require('../controllers/ai.controller')


router.post('/get-review', getResponse);


module.exports = router;