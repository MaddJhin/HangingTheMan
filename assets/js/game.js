
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
var currentWord;
var startingTries = 10;
var triesLeft;

var guessString = [];
var winBox = document.getElementById("wins");
var lossBox = document.getElementById("losses");


function StartGame() {
    wins = 0;
    losses = 0;
    document.getElementById("wins").innerHTML = "Firewalls Unlocked: " + wins;
    //lossBox = "Losses: " + losses;
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
    document.getElementById("tries-remaining").innerHTML = "Security trips until detection: #" + triesLeft;
    ChoseWord();
}

function AddWin() {
    wins++;
    document.getElementById("wins").innerHTML = "Firewalls Unlocked: " + wins;
    document.getElementById("guessed-words").innerHTML += "<br>" + currentWord;
    Reset();
}

function AddLoss() {
    losses++;
    wins = 0;
    //lossBox = "Losses: " + losses;
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

function PrintColumn(elementID) {
    var div = document.getElementById(elementID);
    var divHeight = div.offsetHeight;
    var lineHeight = div.style.lineHeight;
    var rows = divHeight/lineHeight;

    console.log(lineHeight);

    var placeholderString = [];
    
    for (var i = 0; i < 20; i++)
    {
        for (var x = 0; x < 5; x++)
        {
            placeholderString += hiddenCharacters[Math.floor(
                Math.random() * hiddenCharacters.length)] + " ";
            
        }
        placeholderString += "<br>";
    }

    div.innerHTML = placeholderString;
}

document.addEventListener("keypress", function CheckGuess(e) {

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
PrintColumn("guessed-words");
