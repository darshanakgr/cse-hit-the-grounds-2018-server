const {mongoose} = require("../db/connection");

var Match = mongoose.model('Match', new mongoose.Schema({
    status: {
        type: Boolean,
        default: true
    },
    won: {
        type: Boolean,
        default: false
    },
    umpires: Array,
    name: String
}));

module.exports = {Match};