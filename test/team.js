const TeamCon = require("../controllers/team");

TeamCon.addTeam("Rajans", "99X").then((doc) => {
    const teamId = doc.id;
    TeamCon.wonMatch(teamId).then( doc => console.log(doc));
    TeamCon.lostMatch(teamId).then( doc => console.log(doc));
    TeamCon.nrMatch(teamId).then( doc => console.log(doc));
});



