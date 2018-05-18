const {mongoose} = require("../db/connection");

var Player = mongoose.model('Player', new mongoose.Schema({
    name: String,
    teamId: String
}));

module.exports = {Player};