
var hiddenCharacters = [
    "#",
    "$",
    "%",
    "&",
    "@"
];

var words = [
    "words",
    "testing",
    "play"
]

var lettersGuessed = [];
var wins = 0;
var losses = 0;
var currentWord;
var startingTries = 10;
var triesLeft;

var guessString = [];

function StartGame() {
    wins = 0;
    losses = 0;
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    document.getElementById("losses").innerHTML = "Losses: " + losses;
    Reset();
}

function ChoseWord() {
    guessString = [];
    currentWord = words[Math.floor(Math.random() * words.length)];
    
    for (var index = 0; index < currentWord.length; index++) {
        guessString = guessString.concat(hiddenCharacters[Math.floor(
            Math.random() * hiddenCharacters.length)] + " ");
    }
    
    document.getElementById("word-current").innerHTML = guessString.join(" ");
}

function Reset() {
    triesLeft = startingTries;
    lettersGuessed = [];
    document.getElementById("letters-guessed").innerHTML = "";
    document.getElementById("tries-remaining").innerHTML = "Tries Remaining: " + triesLeft;
    ChoseWord();
}

function AddWin() {
    wins++;
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    Reset();
}

function AddLoss() {
    losses++;
    document.getElementById("losses").innerHTML = "Losses: " + losses;
    Reset();
}

function HasTried(letter) {

    if(lettersGuessed.indexOf(letter) == -1){
        return false;
    }
    else{
        return true;
    }
}

document.addEventListener("keypress", function CheckGuess(e) {

    if (HasTried(e.key)) 
    {
        console.log("Letter Guessed");
        return;
    }

    var goodGuess = false;

    for (var i = 0; i < currentWord.length; i++) 
    {
        if(e.key == currentWord[i]){
            guessString[i] = e.key;
            goodGuess = true; 
        }
    }

    if (!goodGuess){
        if (triesLeft > 0)
        {
            triesLeft--;
            document.getElementById("tries-remaining").innerHTML = "Tries Remaining: " + triesLeft;
        }
        else
        {
            AddLoss();
        }
    }

    if (goodGuess) {

        // Check the internal current word and the string the user sees
        console.log('current word', currentWord);
        console.log("Guess String", guessString);

        // Start assuming everything has been guessed
        var allGuessed = true;

        // If any characters from the current word and the guessed string don't match
        // change all guessed to false
        for (var i = 0; i < currentWord.length; i++){

            // Debug 
            console.log("Current Word Character", currentWord[i]);
            console.log("Guess String Character", guessString[i]);

            if(currentWord[i] != guessString[i]){
                allGuessed = false;
                console.log("Not Same");
            }
        }

        if(allGuessed)
            AddWin();
    }

    document.getElementById("word-current").innerHTML = guessString.join(" ");
    lettersGuessed = lettersGuessed.concat(e.key);
    document.getElementById("letters-guessed").innerHTML = lettersGuessed.join(" ");
})
