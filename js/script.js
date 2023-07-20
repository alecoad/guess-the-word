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
const remainingGuessesElement = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector("span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector("play-again");

let word = "magnolia";
// Array to hold player guesses
const guessedLetters = [];
// Count remaining guesses
let remainingGuesses = 8;

// ASYNC FUNCTION
const getWord = async function () {
    // Fetch data from a text file of 823 words
    const res = await fetch('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt');
    const words = await res.text();
    // Transform the data into an array of words, using \n as the delimiter
    const wordArray = words.split("\n");
    // Variable to pull random index from word array
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    // Use the random index to pull a word from the array, with any whitespace trimmed
    word = wordArray[randomIndex].trim();
    // Add placeholders for each letter of the word
    console.log(word);
    addPlaceholders(word);
};

// Get a word to start the game!
getWord();

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

// ADD AN EVENT LISTENER FOR THE BUTTON
guessButton.addEventListener("click", function (e) {
    // Prevent the default behavior of click, submit form, reload
    e.preventDefault();
    // Variable to capture the value of the input
    const guess = letterGuess.value;
    // Empty the value of the input
    letterGuess.value = "";

    // VALIDATE INPUT
    // Empty message after each button click
    message.innerText = "";
    // Check the input
    const checkedLetter = checkInput(guess);
    // If checkInput() returns a letter,
    if (checkedLetter) {
        // add it to the array of guessed letters
        makeGuess(checkedLetter);
    }    
});

// FUNCTION TO CHECK PLAYER'S INPUT
const checkInput = function (input) {
    // Regular expression to ensure the player inputs a letter
    const acceptedLetter = /[a-zA-Z]/
    // Display message if the input is empty
    if (input === "") {
        message.innerText = "Please enter a letter.";
    }
    // Display message if the input is more than one letter
    else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    }
    // Display message if the input is not a letter
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    }
    else {
        return input;
    }
};

// FUNCTION TO CAPTURE INPUT
const makeGuess = function (letter) {
    // Keep letters uppercase
    const upperCaseLetter = letter.toUpperCase();
    // Display a message if the letter was already guessed
    if (guessedLetters.includes(upperCaseLetter)) {
        message.innerText = "You already guessed that letter. Try again.";
    }
    else {
        // Add the letter to the array of guessed letters
        guessedLetters.push(upperCaseLetter);
        // Display unique letters only
        showLetters();
        // Update the remaining guesses based on the guessed letter
        countGuesses(upperCaseLetter);
        // Update the word dots with correctly guessed letters
        updateWord(guessedLetters);
    }
    console.log(guessedLetters);
};

// FUNCTION TO SHOW THE GUESSED LETTERS
const showLetters = function () {
    // Start with an empty list
    guessedLettersElement.innerHTML = "";
    // Create "li" for each guess and add it to the unordered list
    for (const letter of guessedLetters) {
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
    // Empty array used to populate with correct letters or dots
    const progressArray = [];
    // Iterate through letters in the word array
    for (const letter of wordArray) {
        // If the letter has been guessed,
        if (guessedLetters.includes(letter)) {
            // add it to the word-in-progress array
            progressArray.push(letter);
        }
        // Otherwise, keep the dot in the word-in-progress array
        else {
            progressArray.push("●")
        }
    }
    // Join the letters of the word-in-progress array and display
    wordInProgress.innerText = progressArray.join("");

    // Check is the player has won
    completeMatch();
};

// FUNCTION TO COUNT GUESSES REMAINING
const countGuesses = function (guess) {
    // Change the word to uppercase
    const wordUpper = word.toUpperCase();
    // Let the player know whether or not the word contains the guessed letter
    if (wordUpper.includes(guess)) {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
    else {
        message.innerText = `Sorry, the word has no ${guess}.`;
        // Take a guess away
        remainingGuesses -= 1;
    }
    // Update the message accordingly based on the number of remaining guesses
    if (remainingGuesses === 0) {
        message.innerText = `Game over! The word was <span class="highlight">${wordUpper}</span>.`;
    }
    else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    }
    else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
}

// FUNCTION TO CHECK IF THE PLAYER WON
const completeMatch = function () {
    // Change the word to an uppercase array (again...)
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // Boolean variable to determine a complete match, true until it's not :)
    let winner = true;
    // Iterate through the word array to see if all letters have been guessed 
    for (const letter of wordArray) {
        if (!guessedLetters.includes(letter)) {
            winner = false;
        }
    }
    // If winner stays true, tell the player
    if (winner === true) {
        message.classList.add("win");
        message.innerHTML = "<p class='highlight'>You guessed correct the word! Congrats!</p>"
    }
};

