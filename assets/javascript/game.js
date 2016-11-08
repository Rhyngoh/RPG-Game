//lock the other available enemies until defender is defeated/lock defender

//====//
/*var health = 0;
var attackPower = 0;
var defensePower = 0;
var selectedChar = false;*/
var winCounter = 0; //score for wins
var loseCounter = 0; //score for losses
var chosenCharacter = "";
var enemyCharacter = "";
var canIClick = true;
var stackingAtk = 0; //stacking atk power
var defeatedCounter = 0; //counter for number of defeated enemies
var rick = {
	health: 120,
	attackPower: 10,
	defensePower: 15,
	selectedChar: false,
	canIClick: true, //can I click the images anymore?
	name: "Rick Grimes"
};
var daryl = {
	health: 150,
	attackPower: 20,
	defensePower: 13,
	selectedChar: false,
	canIClick: true,
	name: "Daryl Dixon"
};
var michonne = {
	health: 100,
	attackPower: 35,
	defensePower: 10,
	selectedChar: false,
	canIClick: true,
	name: "Michonne"
};
var negan = {
	health: 200,
	attackPower: 25,
	defensePower: 17,
	selectedChar: false,
	canIClick: true,
	name: "Negan"
};
//Start by clicking on one of the four images at the top
$(document).ready(function() {
	var rickGrimes = $(".character1").data(rick);
	var darylDixon = $(".character2").data(daryl);
	var michonneKat = $(".character3").data(michonne);
	var neganLucille = $(".character4").data(negan);
	$(".fightClub").hide();
	$(".itsTheEnemy").hide();
	$(".choosingChar").hide();
	if(canIClick === true){
		$(".characterBox").on("click", function() {
			chosenCharacter = $(this).data(); //store data on click event
			console.log(chosenCharacter);
			alert("You picked " + chosenCharacter.name);
			chosenCharacter.selectedChar = true;
			if(chosenCharacter.selectedChar !== true){
				//Remaining 3 characters move down to enemies available to attack
				//add class to change css background
				$(".characterBox").addClass("enemies");
				console.log(".characterBox");
				$(".characterBox").css("background-color", "red");

			} else{
				//Clicked character moves under Your Character, make character unclickable
				$(chosenCharacter).addClass("itsYou");
				console.log(chosenCharacter);
				$(chosenCharacter).appendTo("#choosingChar");
				console.log(chosenCharacter);
				$(".characterBox").css("background-color", "green");
				//$(chosenCharacter).show();
				//add class to change css background
				canIClick = false; //make your character unclickable after the first click
			}
			//Once a character is clicked, the four selectable characters hide
			$(".selectYourChar").hide();
			
		});
	}
	//Player must select one of the available enemies to attack
	//Selected enemy moves to Defender position
	if(canIClick === true){
		$(".characterBox").on("click", function() {
			enemyCharacter = $(this).data();
			console.log(enemyCharacter);
			alert("You are fighting against " + enemyCharacter.name);
			canIClick = false;
		});
	}
	//player must click Attack to deal damage to defender
	//on button click, apply function += damage, decrease hp by enemy counter attack
	//change html to reflect combat text
	//On button click, do no function unless there is a defender
	$(".btn").on("click", function(){
		attacking();
		winCondition();
		loseCondition();
	});
	//if there is an enemy in the defender, button does stuff, else alert
	function attacking(){
		stackingAtk += chosenCharacter.attackPower;
		chosenCharacter.health -= enemyCharacter.defensePower;
		enemyCharacter.health -= stackingAtk;
		$("combatText").html("You deal " + stackingAtk + " damage to " + enemyCharacter.name + ". " + enemyCharacter.name + " has " + enemyCharacter.health + " health left.");
		$("counterCombatText").html(enemyCharacter.name + " deals " + enemyCharacter.defensePower + " damage to you. You have " + chosenCharacter.health + " health left.");
	}
	function winCondition(){
		if(enemyCharacter.health < 1 && chosenCharacter.health > 0){
			defeatedCounter++;
			if(defeatedCounter === 3){
				alert("You've won the game");
				//reset button show?
				//Reset button appears after all enemies are defeated
			} else { 
//if enemy dies, change html to you have defeated ___, choose to fight anothe enemy, hide defeated defender
				alert("You've defeated " + enemyCharacter.name + ". Choose another enemy to fight.");
			}
		}
	}
	//game ends if your hp is reduced below 0 or you defeat all enemies
	function loseCondition(){
		if(chosenCharacter.health < 1){
			alert("Game over, you lose. Try again.");
			//reset button show?
		}
	}
});
//value is always a string from html
/*$("div").each(function (index, value) {
	$(this).attr("id");
});*/