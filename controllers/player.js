const {Player} = require("../models/Player");

const addPlayer = (teamId, name) => {
    return new Player({teamId, name}).save();
};

module.exports = {
    addPlayer
}
