const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addFriend, listFriends, removeFriend } = require('../controllers/friendController');

router.post('/', auth, addFriend); // body: { username }
router.get('/', auth, listFriends);
router.delete('/:friendId', auth, removeFriend);

module.exports = router;
