const express = require('express');
const httpServer = require('http')
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const {mongoose} = require("../db/connection");
const {addTeam, getTeams, getTeamMembers} = require("../controllers/team");
const {addMatch, 
    getLiveMatches, 
    updateScore, 
    initializeMatch,
    getLiveMatchesOnly,
    getTeamDetails,
    getTeamScore,
    updateTeamScore,
    setWinner
} = require("../controllers/score");


const app = express();
const server = httpServer.createServer(app);

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")));
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
    });
    
    socket.on("getLiveMatchesOnly", (callback) => {
        getLiveMatchesOnly().then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });

    socket.on("updatePlayerScore", (score, callback) => {
        updateScore(score.matchId,score.teamId, score.playerId, score.score).then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });

    socket.on("updatePlayerBowling", (score, callback) => {
        updateScore(score.matchId,score.teamId, score.playerId, score.overs, score.wickets).then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });

    socket.on("getTeamDetails", (id, callback) => {
        getTeamDetails(id).then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });

    socket.on("getTeamScore", (matchId, teamId, callback) => {
        getTeamScore(matchId, teamId).then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });

    socket.on("updateTeamScore", (matchId, teamId, update, callback) => {
        updateTeamScore(matchId, teamId, update).then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });

    socket.on("setWinner", (matchId, winningTeam, lostTeam, callback) => {
        setWinner(matchId, winningTeam, lostTeam).then((res) => {
            callback(undefined, res);
        }).catch((e) => callback(e));
    });
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

server.listen(3000, () => console.log('Server is up on 3000'));