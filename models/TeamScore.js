const {mongoose} = require("../db/connection");

var TeamScore = mongoose.model('TeamScore', new mongoose.Schema({
    matchId: {
        type: String,
        required: true
    },
    teamId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    wicket: {
        type: Number,
        default: 0
    },
    wide: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    overs: {
        type: String,
        default: '0.0'
    }
}));

module.exports = {TeamScore};