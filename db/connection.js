const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HitTheGrounds", {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
}).then(() => console.log("Connected to MongoDB"));

module.exports = { mongoose };    