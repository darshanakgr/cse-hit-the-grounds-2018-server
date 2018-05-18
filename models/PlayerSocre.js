const {mongoose} = require("../db/connection");

var PlayerScore = mongoose.model('PlayerScore', new mongoose.Schema({
    matchId: String,
    teamId: Number,
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