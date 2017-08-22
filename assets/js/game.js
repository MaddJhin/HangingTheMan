
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
    // document.getElementById("wins").innerHTML = "Wins: " + wins;
    // document.getElementById("losses").innerHTML = "Losses: " + losses;

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

    // console.log(lettersGuessed.indexOf(letter));
    // console.log(lettersGuessed);

    // var temp = lettersGuessed.toString().split(" ");

    // console.log(temp);

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

    for (var index = 0; index < currentWord.length; index++) 
    {
        if(e.key == currentWord[index]){
            guessString[index] = e.key;
            goodGuess = true; 
        }
    }

    if (!goodGuess && triesLeft > 0)
    {
        triesLeft--;
        document.getElementById("tries-remaining").innerHTML = "Tries Remaining: " + triesLeft;
    }
    else
    {
        AddLoss();
    }



    document.getElementById("word-current").innerHTML = guessString.join(" ");
    lettersGuessed = lettersGuessed.concat(e.key);
    document.getElementById("letters-guessed").innerHTML = lettersGuessed.join(" ");
})
