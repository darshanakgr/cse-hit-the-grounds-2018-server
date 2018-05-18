const {TeamScore} = require("../models/TeamScore");
const {Match} = require("../models/Match");

const addPlayerScore = (matchId, teamId, playerId) => {
    return new PlayerScore({matchId, teamId, playerId}).save();
};

const updateScore = (matchId, teamId, playerId, score, overs, wickets)  => {
    return PlayerScore.findOneAndUpdate({
        matchId,
        teamId,
        playerId
    }, {
        $set: {
            score,
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
                }).save().then((data) => {
                    if (++count == teams.length) {
                        return resolve(res);
                    }
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
            let response = {};
            matches.forEach((match) => {
                let r = {
                    name: match.name
                };
                TeamScore.find({matchId: match.id}).then((teams) => {
                    r.teams = teams;
                    response[match.id] = r;
                    if(Object.keys(response).length == matches.length){
                        return resolve(response);
                    }
                }).catch( e => reject(e));
            });
        }).catch( e => reject(e));
    });
}

module.exports = {
    addPlayerScore,
    updateScore,
    addMatch,
    getLiveMatches
}
