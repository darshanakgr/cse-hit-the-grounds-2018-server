const TeamCon = require("../controllers/team");

TeamCon.addTeam("Rajans", "99X", ["Darshana", "Rakitha"]).then((doc) => {
    console.log(doc);
}). catch( e => console.log(e));



