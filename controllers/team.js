const {Team} = require("../models/Team");

const addTeam = (name, companyName) => {
    return new Team({
        name,
        companyName
    }).save();
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

module.exports = {
    addTeam,
    wonMatch,
    lostMatch,
    nrMatch
}