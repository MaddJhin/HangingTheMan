
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


function StartGame() {
    wins = 0;
    losses = 0;
    Reset();
}

function ChoseWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    
    var placeholder = "";
    for (var index = 0; index < currentWord.length; index++) {
        placeholder = placeholder.concat(hiddenCharacters[Math.floor(
            Math.random() * hiddenCharacters.length)] + " ");
    }
    
    document.getElementById("word-current").innerHTML = placeholder;
}

function Reset() {
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    document.getElementById("losses").innerHTML = "Losses: " + losses;
}

function AddWin() {
    
}

function AddLoss() {
    
}

