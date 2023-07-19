// GLOBAL VARIABLES
// The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
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

// Array to hold player guesses
const guessedLetters = [];

// FUNCTION TO ADD PLACEHOLDERS FOR EACH LETTER
const addPlaceholders = function (word) {
    // Declare array to hold letters
    const letterArray = [];
    // Iterate through letters in the word, adding a dot to the array each time
    for (const letter of word) {
        letterArray.push("●");
    }
    // Convert array to string of dots and set as the paragraph's inner text
    wordInProgress.innerText = letterArray.join("");
};

addPlaceholders(word);

// ADD AN EVENT LISTENER FOR THE BUTTON
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterGuess.value;
    letterGuess.value = "";

    // VALIDATE INPUT
    message.innerText = "";
    const checkedLetter = checkInput(guess);
    if (checkedLetter) {
        makeGuess(checkedLetter);
    }    
});

// FUNCTION TO CHECK PLAYER'S INPUT
const checkInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input === "") {
        message.innerText = "Please enter a letter.";
    }
    else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    }
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    }
    else {
        return input;
    }
};

// FUNCTION TO CAPTURE INPUT
const makeGuess = function (letter) {
    const upperCaseLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperCaseLetter)) {
        message.innerText = "You already guessed that letter. Try again.";
    }
    else {
        guessedLetters.push(upperCaseLetter);
        showLetters();
        updateWord(guessedLetters);
    }
    console.log(guessedLetters);
};

// FUNCTION TO SHOW THE GUESSED LETTERS
const showLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (let letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLettersElement.append(listItem);
    }
};

// FUNCTION TO UPDATE THE WORD IN PROGRESS
const updateWord = function (letterArray) {
    // Change the word to uppercase
    const wordUpper = word.toUpperCase();
    // Split the word string into an array
    const wordArray = wordUpper.split("");
    console.log(wordArray);
    // Here's the array with just dots again, soon to be modified
    let progressArray = [];
    for (let letter of word) {
        progressArray.push("●")
    }
    // Iterate through guessed letters
    for (let guess of letterArray) {
        // If the guessed letter is in the word,
        if (wordArray.includes(guess)) {
            console.log("found one");
            // find the index of the letter,
            let index = wordArray.indexOf(guess);
            // and replace it in the word-in-progress array
            progressArray.splice(index, 1, guess);
            console.log(progressArray);
        }
    }

    // THIS DOESN'T WORK FOR WORDS WITH REPEATED LETTERS YET!!

    wordInProgress.innerText = progressArray.join("");
}