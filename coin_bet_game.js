const COIN_SIDE = Object.freeze({
	"heads": 1,
	"tails": 2
});

class Bet {
	constructor(betAmount, headsOrTails) {
		this.betAmount = betAmount;
		this.headsOrTails = headsOrTails;
	}

	getBetAmount() {
		return this.betAmount;
	}

	getHeadsOrTails() {
		return this.headsOrTails;
	}
}

class Player {
	firstName;
	lastName;
	dollarBalance = 500;

	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	addMoney(amount) {
		this.dollarBalance += amount;
	}

	takeAwayMoney(amount) {
		this.dollarBalance -= amount;
	}
}

class Game {
	bets = []
	tossResult;

	constructor() {

	}

	runGame() {
		var tossResult = this.getCoinFlipResult();
		
		this.setTossResult(tossResult);
		this.settleBalances();
	}

	getCoinFlipResult() {
		var resultInt = getRandomInt(0, 1);
		console.log("Result int", resultInt);

		if(resultInt === 0) {
			return COIN_SIDE.heads;
		} else if(resultInt === 1) {
			return COIN_SIDE.tails;
		} else {
			throw "Programmer error: Expecting 0 or 1 for toss result";
		}

	}

	setTossResult(tossResult) {
		console.log("Toss result: " + tossResult);
		this.tossResult = tossResult;
	}

	addBet(player, bet) {
		this.bets.push({
			"bet": bet,
			"player": player,
		})
	}

	settleBalances() {
		console.log("Player bets:");
		console.log(this.bets);
		for(var x=0; x<this.bets.length; x++) {
			var betEntry = this.bets[x];

			var playerBet = betEntry['bet'];
			var player = betEntry['player'];

			if(playerBet.getHeadsOrTails() === this.tossResult) {
				console.log("Player " + player.firstName + " won " + playerBet.getBetAmount());
				player.addMoney(playerBet.getBetAmount());
			} else {
				console.log("Player " + player.firstName + " lost " + playerBet.getBetAmount());
				player.takeAwayMoney(playerBet.getBetAmount());
			}	
		}
	}
}

console.log("Starting");
console.log("Coin Toss Game, Tails 1 or Heads 2");

player1 = new Player("Ben", "Ford");
player1Bet = new Bet(100, COIN_SIDE.heads);

player2 = new Player("Brad", "Pitt");
player2Bet = new Bet(250, COIN_SIDE.tails);

player3 = new Player("Joe", "Jordan");
player3Bet = new Bet(150, COIN_SIDE.tails);

game = new Game();
game.addBet(player1, player1Bet);
game.addBet(player2, player2Bet);
game.addBet(player3, player3Bet);

try {
	game.runGame();
} catch(e) {
	console.log("An exception occurred: ", e);
	console.log("Exited game early");
	
	return;
}

console.log(player1, player2, player3);

console.log("Game Completed");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}