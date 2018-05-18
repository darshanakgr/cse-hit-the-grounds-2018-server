const {Player} = require("../models/Player");

const addPlayer = (teamId, name) => {
    return new Player({teamId, name}).save();
};

const removePlayer = (playerId) => {
    return Player.findByIdAndRemove(playerId);
};

module.exports = {
    addPlayer,
    removePlayer
}
