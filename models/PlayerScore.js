const {mongoose} = require("../db/connection");

var PlayerScore = mongoose.model('PlayerScore', new mongoose.Schema({
    matchId: String,
    teamId: String,
    playerId: String,
    score: {
        type: Number,
        default: 0
    },
    overs: {
        type: Number,
        default: 0
    },
    wickets: {
        type: Number,
        default: 0
    }
}));

module.exports = {PlayerScore};