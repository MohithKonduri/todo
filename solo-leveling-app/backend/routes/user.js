const express = require('express');
const router = express.Router();
const { upgradeStat } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/upgrade-stat', authMiddleware, upgradeStat);

module.exports = router;