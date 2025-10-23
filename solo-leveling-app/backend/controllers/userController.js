const User = require('../models/User');

exports.upgradeStat = async (req, res) => {
    const { stat } = req.body;
    const validStats = ['strength', 'intelligence', 'discipline', 'spirit'];

    if (!validStats.includes(stat)) {
        return res.status(400).json({ msg: 'Invalid stat.' });
    }

    try {
        const user = await User.findById(req.user.id);

        if (user.statPoints < 1) {
            return res.status(400).json({ msg: 'Not enough stat points.' });
        }

        user.statPoints -= 1;
        user.stats[stat] += 1;

        await user.save();
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error upgrading stat.');
    }
};