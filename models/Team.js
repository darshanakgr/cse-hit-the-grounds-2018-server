const {mongoose} = require("../db/connection");

var Team = mongoose.model('Team', new mongoose.Schema({
    name: String,
    companyName: String,
    won: {
        type: Number,
        default: 0
    },
    lost: {
        type: Number,
        default: 0
    },
    nr: {
        type: Number,
        default: 0
    }
}));

module.exports = {Team};