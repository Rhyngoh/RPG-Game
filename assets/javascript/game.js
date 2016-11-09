//lock the other available enemies until defender is defeated/lock defender

//====//
//var winCounter = 0; //score for wins
//var loseCounter = 0; //score for losses
var chosenCharacter;
var enemyCharacter;
var stackingAtk = 0; //stacking atk power
var defeatedCounter = 0; //counter for number of defeated enemies
var allThemCharacters = {
 	rick: {
		health: 120,
		attackPower: 5,
		defensePower: 15,
		name: "Rick Grimes"
	},
	daryl: {
		health: 150,
		attackPower: 10,
		defensePower: 13,
		name: "Daryl Dixon"
	},
	michonne: {
		health: 110,
		attackPower: 25,
		defensePower: 10,
		name: "Michonne"
	},
	negan: {
		health: 200,
		attackPower: 12,
		defensePower: 17,
		name: "Negan"
	}
};
//Start by clicking on one of the four images at the top
$(document).ready(function() {
	$(".characterBox").hover(function(){
		var temp = this.id;
		var showStats = allThemCharacters[temp];
		$(".aboutThem").html("<p>" + showStats.name + " has : " + showStats.health + " health points, " + showStats.attackPower + " attack power, and " + showStats.defensePower + " defense power.</p>");
	},
	function(){
		if(chosenCharacter === undefined){
			$(".aboutThem").html("<p>Choose your character. Hover over a character to view their stats.</p>");
		} else if (chosenCharacter !== undefined && enemyCharacter === undefined){
			$(".aboutThem").html("<p>Choose your opponent. Hover over a character to view their stats.</p>");
		}
	}
	);

	$(".characterBox").on("click", function() {
		if(chosenCharacter === undefined){
			var temp = this.id;
			chosenCharacter = allThemCharacters[temp];
			console.log(chosenCharacter);
			stackingAtk = chosenCharacter.attackPower;
			$(".characterBox").removeClass("playable");
			$(".characterBox").addClass("enemies");
			$(".selectYourChar").appendTo(".itsTheEnemy");
			$(this).appendTo(".choosingChar");
			$(this).addClass("itsYou");
		} else if (enemyCharacter === undefined && chosenCharacter !== undefined){
			var temp = this.id;
			enemyCharacter = allThemCharacters[temp];
			console.log(enemyCharacter);
			$(this).removeClass("enemies"); //remove enemies class 
			$(this).addClass("barSoap"); //current defender
			$(this).appendTo(".fightClub"); //Move to defender block
			$(".barSoap").css("background-color", "black"); //change background of defenders to black
		}
	});
	function resetGame() {
		chosenCharacter = undefined;
		enemyCharacter = undefined;
		stackingAtk = 0; 
		defeatedCounter = 0; 
		allThemCharacters = {
		 	rick: {
				health: 120,
				attackPower: 5,
				defensePower: 15,
				name: "Rick Grimes"
			},
			daryl: {
				health: 150,
				attackPower: 10,
				defensePower: 13,
				name: "Daryl Dixon"
			},
			michonne: {
				health: 110,
				attackPower: 20,
				defensePower: 10,
				name: "Michonne"
			},
			negan: {
				health: 200,
				attackPower: 12,
				defensePower: 17,
				name: "Negan"
			}
		};
		//$(".choosingChar").html("");
		$(".barSoap").show();
		$(".characterBox").removeClass("enemyCharacter");
		$(".characterBox").removeClass("enemies");
		$(".characterBox").addClass("playable");
		$(".characterBox").removeClass("itsYou");
		//$(".barSoap").show();
		$(".barSoap").css("background-color", "");
		$(".characterBox").removeClass("barSoap");
		$(".aboutThem").html("Hover over a character to see their stats");
		$(".characterBox").appendTo(".selectYourChar");
		$(".selectYourChar").appendTo("#characterSelect");
		
	}
		
	//Player must select one of the available enemies to attack
	//Selected enemy moves to Defender position
	//player must click Attack to deal damage to defender
	//on button click, apply function += damage, decrease hp by enemy counter attack
	//change html to reflect combat text
	//On button click, do no function unless there is a defender
	$(".btn-danger").on("click", function(){
		if(chosenCharacter !== undefined && enemyCharacter !== undefined){
			enemyCharacter.health -= chosenCharacter.attackPower;
			chosenCharacter.health -= enemyCharacter.defensePower;
			combatLog();
			chosenCharacter.attackPower += stackingAtk;
			whoDead();
			winCondition();
		}
	});
	//Reset Button
	$("#resetbtn").on("click", function(){
		resetGame();
		console.log("Reset Button Clicked");
	});
	//if there is an enemy in the defender, button does stuff, else alert
	function combatLog(){
		var fightingLog = "<p> You attack " + enemyCharacter.name + " for " + chosenCharacter.attackPower + " health points.</p>";
		fightingLog += "<p> " + enemyCharacter.name + " counter attacks you for " + enemyCharacter.defensePower + " health points.</p>";
		fightingLog += "<p> Your remaining health points: " + chosenCharacter.health + ".</p>";
		fightingLog += "<p> " + enemyCharacter.name + "'s remaining health points: " + enemyCharacter.health + ".</p>";
		$(".aboutThem").html(fightingLog);
	}
	function whoDead(){
		if(enemyCharacter.health < 1 && chosenCharacter.health > 0){
			alert("You've defeated " + enemyCharacter.name);
			$(".barSoap").hide();
			enemyCharacter = undefined;
			$(".aboutThem").html("Choose your next opponent");
			defeatedCounter++;
		} else if (chosenCharacter.health < 1){ //game ends if you hp is reduced below 0
			alert("Game over, you lose. Try again.");
			resetGame();
		}
	}
	function winCondition(){
		if (defeatedCounter === 3){
			alert("You've won the game!");
			resetGame();
		}
	}
});