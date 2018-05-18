const {TeamScore} = require("../models/TeamScore");
const {PlayerScore} = require("../models/PlayerScore");
const {Match} = require("../models/Match");
const {Team} = require("../models/Team");
const {Player} = require("../models/Player");
const {wonMatch, lostMatch} = require("./team");

const addPlayerScore = (matchId, teamId, playerId) => {
    return new PlayerScore({matchId, teamId, playerId}).save();
};

const updateScore = (matchId, teamId, playerId, score)  => {
    return PlayerScore.findOneAndUpdate({
        matchId,
        teamId,
        playerId
    }, {
        $set: {
            score
        }
    });
};

const updateBowling = (matchId, teamId, playerId, overs, wickets)  => {
    return PlayerScore.findOneAndUpdate({
        matchId,
        teamId,
        playerId
    }, {
        $set: {
            overs,
            wickets
        }
    });
};

const addMatch = (name, umpires, teams) => {
    return new Promise((resolve, reject) => {
        new Match({name, umpires}).save().then((res) => {
            let count = 0;
            teams.forEach((team) => {
                new TeamScore({
                    matchId: res.id,
                    teamId: team
                }).save().then((snapshot) => {
                    if (++count == teams.length) {
                        return resolve(res);
                    }
                }).catch( e => reject(e));
            });
        }).catch( e => reject(e));
    });
}

const initializeMatch = (name, umpires, teams) => {
    return new Promise((resolve, reject) => {
        addMatch(name, umpires, teams).then((match) => {
            let count = 0;
            teams.forEach((team) => {
                Player.find({teamId: team}).then((players) => {
                    count += players.length;
                    players.forEach((player) => {
                        addPlayerScore(match.id, team, player.id).then((score) => {
                            if(--count == 0){
                                return resolve(match);
                            }
                        }).catch( e => reject(e));
                    });
                }).catch( e => reject(e));
            });
        }).catch( e => reject(e));
    });
}

const getLiveMatches = () => {
    return new Promise((resolve, reject) => {
        Match.find({
            status: true
        }).then((matches) => {
            let response = [];
            matches.forEach((match) => {
                let r = {
                    name: match.name
                };
                TeamScore.find({matchId: match.id}).then((teams) => {
                    r.teams = teams;
                    response.push(r);
                    if(Object.keys(response).length == matches.length){
                        return resolve(response);
                    }
                }).catch( e => reject(e));
            });
        }).catch( e => reject(e));
    });
}

const getTeamDetails = (id) => {
    return new Promise((resolve, reject) => {
        Match.findById(id).then((match) => {
            TeamScore.find({matchId: match.id}).then((teams) => {
                let response = [];
                teams.forEach((team) => {
                    Team.findById(team.teamId).then((t) => {
                        response.push(t);
                        if(response.length == teams.length){
                            return resolve(response);
                        }
                    }).catch( e => reject(e));
                });
            }).catch( e => reject(e));
        }).catch( e => reject(e));
    });
}

const getTeamScore = (teamId, matchId) => {
    return TeamScore.findOne({teamId, matchId});
}

const updateTeamScore = (matchId, teamId, update) => {
    return TeamScore.findOneAndUpdate({teamId, matchId}, {
        $set: update
    }, {
        $new: true
    });
}

const getLiveMatchesOnly = () => {
    return Match.find({status: true});
}

const setWinner = (matchId, winningTeam, lostTeam) => {
    return new Promise((resolve, reject) => {
        Match.findByIdAndUpdate(matchId, {
            $set: { status: false }
        }).then((match) => {
            wonMatch(winningTeam).then(() => {
                lostMatch(lostTeam).then(() => {
                    return resolve();
                }).catch( e => reject(e));
            }).catch( e => reject(e));
        }).catch( e => reject(e));
    });
    
}


module.exports = {
    addPlayerScore,
    updateScore,
    initializeMatch,
    getLiveMatches,
    updateBowling,
    getLiveMatchesOnly,
    getTeamDetails,
    getTeamScore,
    updateTeamScore,
    setWinner
}
