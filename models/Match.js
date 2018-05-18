const {mongoose} = require("../db/connection");

var Match = mongoose.model('Match', new mongoose.Schema({
    status: Boolean,
    won: Boolean
}));

module.exports = {Match};