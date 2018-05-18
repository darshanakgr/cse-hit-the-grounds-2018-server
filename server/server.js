const express = require('express');
const httpServer = require('http')
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const {mongoose} = require("../db/connection");
const {addTeam, getTeams, getTeamMembers} = require("../controllers/team");
const {addMatch, getLiveMatches} = require("../controllers/score");


const app = express();
const server = httpServer.createServer(app);

const io = socketIO(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

io.on('connection', (socket) => {
    console.log("Client connected");
    
    socket.on("addTeam", (team, callback) => {
        addTeam(team.teamName, team.companyName, team.players).then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });

    socket.on("getTeams", (callback) => {
        getTeams().then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });

    socket.on("addLiveMatch", (match, callback) => {
        initializeMatch(match.name, match.umpires, match.teams).then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });

    socket.on("getLiveMatches", (callback) => {
        getLiveMatches().then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });

    socket.on("getMembers", (callback) => {
        getTeamMembers().then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    })

});

server.listen(3000, () => console.log('Server is up on 3000'));