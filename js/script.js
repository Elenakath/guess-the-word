// unordered list with player's guessed letters appear
const guessedLetters = document.querySelector(".guessed-letters");
// button with the text "Guess" in it
const guessButton = document.querySelector(".guess");
// text input where player will guess a letter
const letterInput = document.querySelector("#letter");
// empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where the remaining gueeses will display
const remaining = document.querySelector(".remaining");
// span inside paragraph where reamining guess will display
const span = document.querySelector("span");
// empty paragraph where messages will appear when player guesses a letter
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again
const playAgain = document.querySelector(".play-again");

// starting word to test game out until fetch words form hosted file
const word = "magnolia";

const progress = function (word) {
    const symbol = "●"
    wordInProgress.innerText = symbol.repeat(word.length);
};
progress(word);