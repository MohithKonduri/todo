const DAILY_QUEST_POOL = {
    Common: [
        { description: 'Read for 15 minutes', rarity: 'Common', expReward: 10, pointReward: 5 },
        { description: 'Do 10 minutes of stretching', rarity: 'Common', expReward: 10, pointReward: 5 },
        { description: 'Tidy up your workspace', rarity: 'Common', expReward: 15, pointReward: 5 },
        { description: 'Review yesterday\'s notes', rarity: 'Common', expReward: 20, pointReward: 10 },
        { description: 'Drink 8 glasses of water', rarity: 'Common', expReward: 5, pointReward: 5 },
    ],
    Uncommon: [
        { description: 'Study for a 1-hour block without distractions', rarity: 'Uncommon', expReward: 30, pointReward: 15 },
        { description: 'Complete 3 Common Quests', rarity: 'Uncommon', expReward: 25, pointReward: 20 },
        { description: 'Go for a 30-minute walk or run', rarity: 'Uncommon', expReward: 35, pointReward: 15 },
        { description: 'Plan your tasks for tomorrow', rarity: 'Uncommon', expReward: 20, pointReward: 10 },
    ],
    Rare: [
        { description: 'Finish a chapter of a textbook', rarity: 'Rare', expReward: 75, pointReward: 40 },
        { description: 'Complete all other daily quests', rarity: 'Rare', expReward: 100, pointReward: 50 },
        { description: 'Help someone with their studies for 30 minutes', rarity: 'Rare', expReward: 60, pointReward: 30 },
    ]
};

const INSTANT_QUEST_POOL = [
     { description: 'Instant Dungeon: Do 20 push-ups in the next 10 minutes!', rarity: 'Instant', expReward: 50, pointReward: 25 },
     { description: 'Instant Dungeon: Write 100 words on any topic in the next 15 minutes!', rarity: 'Instant', expReward: 60, pointReward: 30 },
     { description: 'Instant Dungeon: Meditate for 5 minutes right now!', rarity: 'Instant', expReward: 40, pointReward: 20 },
];

module.exports = { DAILY_QUEST_POOL, INSTANT_QUEST_POOL };