const express = require('express');
const router = express.Router();
const privateController = require('../controllers/privateController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/home', authMiddleware, privateController.home);

module.exports = router;
