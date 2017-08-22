
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

var guessString = [];

function StartGame() {
    wins = 0;
    losses = 0;
    Reset();
}

function ChoseWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    
    for (var index = 0; index < currentWord.length; index++) {
        guessString = guessString.concat(hiddenCharacters[Math.floor(
            Math.random() * hiddenCharacters.length)] + " ");
    }
    
    document.getElementById("word-current").innerHTML = guessString.join(" ");
}

function Reset() {
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    document.getElementById("losses").innerHTML = "Losses: " + losses;
}

function AddWin() {
    wins++;
    document.getElementById("wins").innerHTML = "Wins: " + wins;
}

function AddLoss() {
    losses++;
    document.getElementById("losses").innerHTML = "Losses: " + losses;
}

document.addEventListener("keypress", function CheckGuess(e) {

    for (var index = 0; index < currentWord.length; index++) {
        if(e.key == currentWord[index]){
            guessString[index] = e.key; 
        }
    }

    document.getElementById("word-current").innerHTML = guessString.join(" ");
    console.log(guessString.join(""));
    
})