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
let word = "magnolia";
//letters users has guessed
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    //console.log(words);
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomWordIndex = (Math.floor(Math.random() * wordArray.length));
    console.log(randomWordIndex);
    word = wordArray[randomWordIndex].trim();
    placeholder(word);
};
getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
  };

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
    updateGuessesRemaining(guess);
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

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
   if (!upperWord.includes(guess)) {
    message.innerText = `Try again, the word doesn't include ${guess}.`;
    remainingGuesses -= 1;
} else {
    message.innerText = `Good guess! ${guess} is in the word!`;
}
    if (remainingGuesses === 0) {
   message.innerHTML = `Game Over! The word was <span class="highlight">${word}</span>.`; 
} else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
} else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
}
};

const winChecker = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
};
};
