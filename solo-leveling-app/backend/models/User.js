const mongoose = require('mongoose');

// Schema for items in the inventory
const ItemSchema = new mongoose.Schema({
    itemId: { type: String, required: true }, // Added to match shop items
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['title', 'effect', 'potion'] }, // 'title', 'effect', or other types
    tier: { type: String, required: true, enum: ['e', 'd', 'c', 'b', 'a', 's', 'n'] },
    description: { type: String, default: '' },
    style: { type: String } // For effects, to be used on the frontend
}); // Subdocuments get an _id by default, which we'll use

// Schema for equipped effects
const EquippedEffectSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., 'Fire Aura'
    style: { type: String, required: true } // e.g., 'fire' for CSS class or effect logic
}, { _id: false });

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    level: { type: Number, default: 1 },
    exp: { type: Number, default: 0 },
    expToNextLevel: { type: Number, default: 100 },
    points: { type: Number, default: 0 },
    dailyScore: { type: Number, default: 0 },
    inventory: [ItemSchema], // Use the new ItemSchema for inventory
    equippedTitle: { type: String, default: '' },
    equippedEffects: [EquippedEffectSchema], // Use the new EquippedEffectSchema
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    streak: { type: Number, default: 0 },
    stats: { type: Object, default: { strength: 1, intelligence: 1, discipline: 1, vitality: 1 } },
    lastLogin: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
