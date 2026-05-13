const groups = {
    team1: []
};

function joinGroup(playerId, groupName) {
    groups[groupName].push(playerId);
}
