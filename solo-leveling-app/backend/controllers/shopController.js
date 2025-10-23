const User = require('../models/User');
const { SHOP_ITEMS } = require('../gameData/shopItems');

// Get all items available in the shop
exports.getShopItems = async (req, res) => {
    try {
        res.json(SHOP_ITEMS);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Buy an item from the shop
exports.buyItem = async (req, res) => {
    const { itemId } = req.body;

    try {
        const user = await User.findById(req.user.id);
        const itemToBuy = SHOP_ITEMS.find(item => item.itemId === itemId);

        // --- VALIDATION ---
        if (!itemToBuy) {
            return res.status(404).json({ msg: 'Item not found in shop.' });
        }
        // Check level requirement
        if (user.level < itemToBuy.requiredLevel) {
            return res.status(400).json({ msg: `Your level (${user.level}) is too low to buy this item. Required level: ${itemToBuy.requiredLevel}.` });
        }
        if (user.points < itemToBuy.price) {
            return res.status(400).json({ msg: 'Not enough points.' });
        }
        const alreadyOwned = user.inventory.some(item => item.itemId === itemId);
        if (alreadyOwned) {
            return res.status(400).json({ msg: 'You already own this item.' });
        }

        // --- PROCESS PURCHASE ---
        user.points -= itemToBuy.price;
        user.inventory.push({
            itemId: itemToBuy.itemId,
            name: itemToBuy.name,
            type: itemToBuy.type.toLowerCase(),
            tier: itemToBuy.rank.toLowerCase(),
            description: itemToBuy.description,
            style: itemToBuy.effects ? itemToBuy.effects.join(' ') : '' // Map effects array to style string
        });

        await user.save();

        res.json({
            msg: `Successfully purchased ${itemToBuy.name}!`,
            user: await User.findById(req.user.id).select('-password'),
            itemName: itemToBuy.name
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error buying item.');
    }
};

// Equip a title from inventory
exports.equipTitle = async (req, res) => {
    const { itemId } = req.body;

    try {
        const user = await User.findById(req.user.id);
        const itemToEquip = user.inventory.find(item => item.itemId === itemId);

        // --- VALIDATION ---
        if (!itemToEquip || itemToEquip.type !== 'title') {
            return res.status(400).json({ msg: 'You do not own this title.' });
        }

        const titleDetails = SHOP_ITEMS.find(item => item.itemId === itemId);
        if (!titleDetails) {
            return res.status(404).json({ msg: 'Title details not found.' });
        }

        // --- EQUIP TITLE ---
        user.equippedTitle = titleDetails.name;
        await user.save();

        res.json({
            msg: `Title equipped: ${titleDetails.name}`,
            user: await User.findById(req.user.id).select('-password')
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error equipping title.');
    }
};






