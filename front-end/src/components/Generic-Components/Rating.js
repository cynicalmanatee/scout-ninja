const list = [
	{ name: "bob", rating: 1100 },
	{ name: "joe", rating: 1000 },
	{ name: "steve", rating: 1400 },
	{ name: "tom", rating: 1200 },
];

const list2 = [
    { name: "bob", score: 12323 },
	{ name: "joe", score: 23421 },
	{ name: "steve", score: 18324 },
	{ name: "tom", score: 19332 },
]

// For this section, the formula for the expected outcome is as follows:
// Ea = 1 / (1 + (10 ^ ((Raverage - Ra)/400)))
// For the updating of the rank, we first calculate the score by their position where
// the winner receives 1 point, the loser receives 0 points, and everyone else scores
// in increments, ie ( 0, .25, .5, .75, 1 for a 5 player game)
// the update formula is:
// New Rating = Old Rating + 32(Actual Score - Ea)

/**
 * This method calculates the probability of a player winning against the average rating of the lobby.
 * @param players is the list of players for this game. 
 * @returns returns the expected outcome for the game in terms of probability to win.
 */
function PredictedOutcome(players) {
	var sum = 0;
	

	var avg;

	let expected = [];
	let E = 0;
	let temp;
	for (let j = 0; j < players.length; j++) {
        for (let i = 0; i < players.length; i++) {
            if(i!==j){
		    sum = sum + players.rating;
            }

            avg = sum / (players.length-1);
	    }

		E = 1 / (1 + Math.pow(10, (avg - players[j].rating) / 400));
        temp = {rating = E, Name = players[j].name};
        expected.push(temp);
        sum = 0;
	}

    return expected;
}

function ActualOutcome(players, score) {
    var target1, target2, RN, temp;
    var sorted = score.sort(function(a,b){
        return b.score-a.score;
    })
    var newList;
    var inc = 1/ ( score.length -1)
    var endscore = 0;
    for(let a = 0; a < sorted.length; a++){
        sorted[a].score = endscore;
        endscore = endscore + inc;
    }
    for(let i = 0; i < players.length; i++){
        target1 = players[i];
        target2 = sorted.find((n) => n.name === target1.name);
        RN = target1.rating + 32(target2.score - target1.rating);
        temp = {name: target1.name, rating: RN};
        newList.push(temp);
    }

    return newList;
}
