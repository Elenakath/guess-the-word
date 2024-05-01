// unordered list with player's guessed letters appear
const guessedLettersList = document.querySelector(".guessed-letters");
// button with the text "Guess" in it
const guessButton = document.querySelector(".guess");
// text input where player will guess a letter
const letterInput = document.querySelector(".letter");
// empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where the remaining gueeses will display
const remaining = document.querySelector(".remaining span");
// empty paragraph where messages will appear when player guesses a letter
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// starting word to test game out until fetch words form hosted file
const word = "magnolia";

//letters users has guessed
const guessedLetters = [];

const progress = function (word) {
    const symbol = "●"
    wordInProgress.innerText = symbol.repeat(word.length);
};
progress(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    // Let's grab what was entered in the input
    const guess = letterInput.value;

    const goodGuess = playerInput(guess);

    if (goodGuess) {
        // We've got a letter
        makeGuess(guess);
    }
    letterInput.value = "";
});

const playerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        // Is the input empty?
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        // Did you type more than on letter?
        message.innerText = "Sorry, one letter at a time.";
    } else if(!input.match(acceptedLetter)) {
        // Did you type a number, or special character or some other non letter thing?
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        // We finally got a single letter, omg yay
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUppercase;
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, try again."
    } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    }
};