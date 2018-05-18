const {Team} = require("../models/Team");
const {addPlayer} = require("./player");

const addTeam = (name, companyName, players) => {
    return new Promise((resolve, reject) => {
        new Team({
            name,
            companyName
        }).save().then((team) => {
            let count = 0;
            players.forEach((player) => {
                addPlayer(team.id, player).then((snapshot) => {
                    if (++count == players.length) {
                        return resolve(team);
                    }
                }).catch( e => reject(e));
            });
        }).catch( e => reject(e));
    });
};

const wonMatch = (teamId) => {
    return Team.findByIdAndUpdate(teamId, {
        $inc: {won: 1}
    }, {
        new: true
    })
}

const lostMatch = (teamId) => {
    return Team.findByIdAndUpdate(teamId, {
        $inc: {lost: 1}
    }, {
        new: true
    })
}

const nrMatch = (teamId) => {
    return Team.findByIdAndUpdate(teamId, {
        $inc: {nr: 1}
    }, {
        new: true
    })
}

const getTeams = () => {
    return Team.find({});
}

module.exports = {
    addTeam,
    wonMatch,
    lostMatch,
    nrMatch,
    getTeams
}