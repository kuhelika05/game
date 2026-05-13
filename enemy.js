function createEnemy(playerLevel) {
    return {
        hp: 50 * playerLevel,
        damage: 10 * playerLevel,
        level: playerLevel
    };
}

module.exports = createEnemy;
