

//game is array of possible answers
var wordBank = ['baratheon', 'arryn', 'snow', 'stark', 'sand', 'lannister', 'tyrell', 'frey', 'martell'];
var wins = 0;
var partialWord;
var guessesRemain;
var allLettersGuessed;
var badLettersGuessed;


// initiallizes blanks for however many letters in answer
// Need to figure out how to do blanks for chosenWord.length
function updateView() {
    $("#partialWord").text(partialWord.split('').join(' '));
    $("#guessesRemain").text(guessesRemain);
    $("#lettersGuessed").text(allLettersGuessed);
    $("#badLettersGuessed").text(badLettersGuessed.split('').join(' '));
    $("#wins").text(wins);
}

document.onkeyup = function(event) {
    var keyPress = event.key;
    checkKey(keyPress);
}

function startGame() {
    // Choose a word
    answer = wordBank[Math.floor(Math.random()*wordBank.length)];
    guessesRemain = 9;
    badLettersGuessed = "";
    allLettersGuessed = "";
    partialWord = "_".repeat(answer.length);
    updateView();
}

startGame()

function hasKey(aString, it) {
    for (var i=0; i<aString.length; i++) {
       if (aString[i] === it) {
           return true;
       }
   }
   return false;
}

function checkKey(keyPress) {
    // checks if key is within the alphabet
    if (!hasKey("abcdefghijklmnoprstuvwxyz", keyPress)) return;
    // checks if keyPressed has been guessed before
    if (hasKey(allLettersGuessed, keyPress)) 
        return; 
    // adds guessed letter to allLettersGuessed
    allLettersGuessed = allLettersGuessed + keyPress;
    //checks if keyPress is within the answer, and if so does revealCharacter
    if (hasKey(answer, keyPress)) {
        revealCharacter(keyPress)
        if (partialWord === answer) {
            wins = wins + 1;
            startGame();
        }
    }
    else {
        badLettersGuessed = badLettersGuessed + keyPress;
        guessesRemain = guessesRemain - 1;
            if (guessesRemain === 0) {
                startGame();
            }
        // else keyPress not in array
        //removes 1 from guesses left, shows letter guessed on page
    }
    updateView();
}

function revealCharacter(keyPress) {
    var result = partialWord.split('');
    for (var i=0; i<answer.length; i++) {
        if (answer[i] === keyPress) {
            result[i] = keyPress;
        }
    }
    partialWord = result.join('');
}




// if userInput is a character within answer (aka game.choice)
//     change _ to correct character
// else 
//     userInput is printed to lettersGuessed
//     numberGuessesRemain--

// Correct Guess
    // Update partialWord 
// Incorrect Guess
    // Update numberGuessesRemain
    // update lettersGuessed
// Game Over
    // Alert You Won or You Lost
    // Reinitialize everything but wins