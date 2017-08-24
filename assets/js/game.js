
var hiddenCharacters = [
    "&#9646",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "]",
    "[",
    "{",
    "}",
    "|",
    "'",
    "/",
    "?",
    ">",
    "<",
];

var words = [
    "actually",
    "expected",
    "property",
    "addition",
    "followed",
    "provided",
    "although",
    "happened",
    "question",
    "american",
    "increase",
    "received",
    "anything", 
    "industry",
    "religion",
    "building",
    "interest",
    "remember",
    "business",
    "involved",
    "required",
    "children",
    "national",
    "services",
    "complete",
    "organize",
    "southern",
    "consider",
    "personal",
    "standard",
    "continue",
    "planning",
    "strength",
    "couldn't",
    "position",
    "students",
    "decision",
    "possible",
    "suddenly",
    "directly",
    "pressure",
    "thinking",
    "district",
    "probably", 
    "together",
    "economic",
    "problems",
    "training",
    "evidence",
    "programs"    
];

var lettersGuessed = [];
var wins = 0;
var losses = 0;
var currentWord = "";
var startingTries = 10;
var triesLeft;

var guessString = [];
var winBox = document.getElementById("wins");
var lossBox = document.getElementById("losses");


function StartGame() {
    wins = 0;
    losses = 0;
    document.getElementById("wins").innerHTML = "Firewalls Unlocked: " + wins;
    Reset();
}

function ChoseWord() {
    guessString = [];
    currentWord = words[Math.floor(Math.random() * words.length)];
    
    for (var index = 0; index < currentWord.length; index++) {
        // guessString = guessString.concat(hiddenCharacters[Math.floor(
        //     Math.random() * hiddenCharacters.length)] + " ");
        guessString = guessString.concat(hiddenCharacters[0] + " ");
    }
    
    document.getElementById("word-current").innerHTML = guessString.join(" ");
}

function Reset() {
    triesLeft = startingTries;
    lettersGuessed = [];
    document.getElementById("tries-remaining").innerHTML = "Security trips until detection: " + triesLeft;
    document.getElementById("letters-guessed").innerHTML = "";    
    ChoseWord();
}

function AddWin() {
    console.log("Adding Win");
    wins++;
    document.getElementById("wins").innerHTML = "Firewalls Unlocked: " + wins;
    document.getElementById("guessed-words").innerHTML += 
        currentWord.toUpperCase().split("").join(" ") + "<br>";
    PrintColumn("scrambled-words");
    Reset();
    console.log("Win Added");
}

function AddLoss() {
    wins = 0;
    document.getElementById("wins").innerHTML = "Firewalls Unlocked: " + wins;
    document.getElementById("guessed-words").innerHTML = "";
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

function PrintColumn(idName) {
    var div = document.getElementById(idName);
    var rows = 20 - wins;
    var placeholderString = [];
    
    for (var i = 0; i < rows; i++)
    {
        for (var x = 0; x < 8; x++)
        {
            placeholderString += hiddenCharacters[Math.floor(
                Math.random() * hiddenCharacters.length)] + " ";
            
        }
        placeholderString += "<br>";
    }

    div.innerHTML = placeholderString;
}

document.addEventListener("keydown", function CheckGuess(e) {

    if (HasTried(e.key)) 
    {
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
            document.getElementById("tries-remaining").innerHTML = "Security Trips Until Detection: " + triesLeft;
        }
        else
        {
            AddLoss();
        }
    }

    document.getElementById("word-current").innerHTML = guessString.join(" ");
    lettersGuessed = lettersGuessed.concat(e.key);
    document.getElementById("letters-guessed").innerHTML = lettersGuessed.join(" ");

    if (goodGuess) {
        // Start assuming everything has been guessed
        var allGuessed = true;

        // If any characters from the current word and the guessed string don't match
        // change all guessed to false
        for (var i = 0; i < currentWord.length; i++){
            if(currentWord[i] != guessString[i]){
                allGuessed = false;
                console.log("Not Same");
            }
        }

        if(allGuessed)
            AddWin();
    }
})

StartGame();
ChoseWord();
PrintColumn("scrambled-words");

window.setInterval(function(){
    PrintColumn("scrambled-words");
  }, 500);
