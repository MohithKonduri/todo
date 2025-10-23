const express = require('express');
const router = express.Router();
const { getShopItems, buyItem, equipTitle } = require('../controllers/shopController');
const auth = require('../middleware/authMiddleware');

// @route   GET api/shop
// @desc    Get all items from the shop
// @access  Public
router.get('/', getShopItems);

// @route   POST api/shop/buy
// @desc    Buy an item from the shop
// @access  Private
router.post('/buy', auth, buyItem);

// @route   POST api/shop/equip
// @desc    Equip a title from inventory
// @access  Private
router.post('/equip', auth, equipTitle);



module.exports = router;
