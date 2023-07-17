// GLOBAL VARIABLES

// The unordered list where the player’s guessed letters will appear.
const guessedLetters = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letterGuess = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector("span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector("play-again");

const word = "magnolia";

// FUNCTION TO ADD PLACEHOLDERS FOR EACH LETTER
const addPlaceholders = function (word) {
    // Declare array to hold letters
    letterArray = [];
    // Iterate through letters in the word, adding a dot to the array each time
    for (let letter of word) {
        letterArray.push("●");
    }
    // Convert array to string of dots and set as the paragraph's inner text
    wordInProgress.innerText = letterArray.join("");
};

addPlaceholders(word);

// ADD AN EVENT LISTENER FOR THE BUTTON
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    let guess = letterGuess.value;
    console.log(guess);
    letterGuess.value = "";
});