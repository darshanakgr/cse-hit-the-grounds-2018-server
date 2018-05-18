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

const addMatch = (matchName, umpires, teams) => {
    return new Promise((resolve, reject) => {
        new Match({matchName, umpires})
            .save()
            .then((res) => {
            let count = 0;
                teams.forEach((team) => {
                    new TeamScore({
                        matchId: res.id,
                        teamId: team,
                        
                    }).save((data) => {
                        if (++count == teams.length) {
                            return resolve(team);
                        }
                    }).catch( e => reject(e));
                })
            }).catch( e => reject(e));
    });
}

const getLiveMatches = () => {
    return Match.find({
        status: true
    });
}

module.exports = {
    addPlayerScore,
    updateScore,
    addMatch,
    getLiveMatches
}
