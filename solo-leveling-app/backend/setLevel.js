const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI);

const setLevel = async () => {
    try {
        const user = await User.findOne({ username: 'testuser' });
        if (user) {
            user.level = 15;
            user.exp = 0;
            user.expToNextLevel = 100;
            await user.save();
            console.log('User level set to 15');
        } else {
            console.log('User not found');
        }
    } catch (err) {
        console.error(err);
    }
    process.exit();
};

setLevel();
