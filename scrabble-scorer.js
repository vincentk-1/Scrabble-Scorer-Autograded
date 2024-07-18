// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
//-----------------------------------------------------------------POINTS SYSTEM----------------------------------------------------------------------------------------------------
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let bonusScorer = {
   1: ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'],
   3: ['A', 'E', 'I', 'O', 'U']
 };

//----------------------------------------------------------------FUNCTIONS---------------------------------------------------------------------------------------------------------

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

 function simpleScorer(word) {
	let points = word.length;
	return points;
 }

 function vowelBonusScorer(word){
   word = word.toUpperCase();
	let points = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in bonusScorer) {
 
		 if (bonusScorer[pointValue].includes(word[i])) {
			points += Number(pointValue)
		 }
 
	  }
	}
	return points;
};

function transform(oldSystem) {
   let newSystem= {};

   for (const item in oldSystem) {
   
      for (let i = 0; i < oldSystem[item].length; i++) {
      newSystem[(oldSystem[item][i]).toLowerCase()] = Number(item)
      }

   }
   return newSystem
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function scrabbleScorer(word) {
   word = word.toLowerCase();
	let points = 0;
	for (let i = 0; i < word.length; i++) {
			points += newPointStructure[word[i]]
	}
	return points;
 }

//----------------------------------------------------------------OBJECTS---------------------------------------------------------------------------------------------------------

let simpleScorerObj = {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
};

let vowelBonusScorerObj = {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
};

let scrabbleScorerObj = {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
};

//-----------------------------------------------------------------ARRAY---------------------------------------------------------------------------------------------------------

const scoringAlgorithms = [simpleScorerObj,vowelBonusScorerObj,scrabbleScorerObj];

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
};

function scorerPrompt() {
   let word = '1'
   let counter = 0

   while(!(/^[a-zA-Z\s]+$/.test(word))){

      if (counter === 0) {
      word = input.question("Enter a word to score: ")
      }

      else{
      console.log('\nOnly letters and spaces are allowed!!\n')   
      word = input.question("Enter a word to score: ")
      }
      counter++
   }
   console.log('\nWhich scoring algorithm would you like to use?')
   console.log('0 - Simple: One point per character')
   console.log('1 - Vowel Bonus: Vowels are worth 3 points')
   console.log('2 - Scrabble: Uses scrabble point system')

   let choiceAlgorithm = -1
   while( !(/^[0-2]+$/.test(choiceAlgorithm))){
      choiceAlgorithm = input.question("\nEnter 0, 1, or 2: ");
   }

   choiceAlgorithm = Number(choiceAlgorithm); 
   console.log(`\nScore for '${word}': ${scoringAlgorithms[choiceAlgorithm].scorerFunction(word)}`)

   return scoringAlgorithms[choiceAlgorithm ]
}

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
