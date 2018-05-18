const express = require('express');
const httpServer = require('http')
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const {mongoose} = require("../db/connection");

const app = express();
const server = httpServer.createServer(app);

const io = socketIO(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

io.on('connection', (socket) => {
    console.log("Client connected");
});

server.listen(3000, () => console.log('Server is up on 3000'));