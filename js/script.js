// unordered list with player's guessed letters appear
const guessedLettersList = document.querySelector(".guessed-letters");
// button with the text "Guess" in it
const guessButton = document.querySelector(".guess");
// text input where player will guess a letter
const letterInput = document.querySelector(".letter");
// empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
// paragraph where the remaining gueeses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
// empty paragraph where messages will appear when player guesses a letter
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// starting word to test game out until fetch words form hosted file
const word = "magnolia";

//letters users has guessed
const guessedLetters = [];

let remainingGuesses = 8;

console.log(message);
console.log(remainingGuessesSpan);

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
  };
  
  placeholder(word);

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
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, try again."
    } else {
    guessedLetters.push(guess);
    playerGuess();
    }
    console.log(guessedLetters);
    guessCounter(guess);
    updatedWord(guessedLetters);
    winChecker();
};

const playerGuess = function () {
    guessedLettersList.innerHTML = "";

    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersList.append(li);
    }
};

const updatedWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    console.log(revealWord);
};

const guessCounter = function (guess) {
   if (!word.toUpperCase().includes(guess.toUpperCase())) {
    remainingGuessesSpan.innerText = "Try again, the word doesn't include that letter."
    remainingGuesses -= 1;
} else {
    remainingGuessesSpan.innerText = "Yay! that letter is in the word!"
}
    if (remainingGuesses === 1) {
   remainingGuessesSpan.innerText = "1 guess"; 
} else if (remainingGuesses === 0) {
    remainingGuessesSpan.innerText = "Game over, you have no more guesses remaining.";
};
};

const winChecker = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
};
};
