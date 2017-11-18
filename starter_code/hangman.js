var hangman;

function Hangman() {
  this.words = ["Churchill", "Macron", "mot", "Vivian", "codage"];
  this.secretWord = this.words[Math.floor(Math.random()*this.words.length)];
  this.letters = [];
  this.guessedLetter = "";
  this.errorsLeft = 10;
  this.hangmanCanvas = new HangmanCanvas(this.secretWord);
}

Hangman.prototype._getWord = function () {
  return this.words[Math.floor(Math.random()*this.words.length)];
};

Hangman.prototype._checkIfLetter = function(keyCode) {
  return keyCode >= 65 && keyCode <= 90;
};

Hangman.prototype._checkClickedLetters = function(key) {
  return !this.letters.includes(key);
};

Hangman.prototype._addCorrectLetter = function(i){
  this.guessedLetter += this.secretWord[i].toUpperCase();
  return this._checkWinner();
};

Hangman.prototype._addWrongLetter = function (letter){
  this.errorsLeft -= 1;
  this.hangmanCanvas._addWrongLetter(letter, this.errorsLeft)
  return this._checkGameOver();
};

Hangman.prototype._checkGameOver = function() {
  return this.errorsLeft === 0;
};

Hangman.prototype._checkWinner = function() {
  return this.guessedLetter.length === this.secretWord.split("").reduce((acc, c) => {
    if(acc.indexOf(c) !== -1) {
      return acc;
    } else {
      acc.push(c)
      return acc
    }
  },[]).join('').length;
};

document.getElementById("start-game-button").onclick = function(){
  hangman = new Hangman();
};


document.onkeydown = function(e) {
  console.log(e);
  this._checkIfLetter(e.keyCode);
  this._checkClickedLetters(e.key);
  this._addCorrectLetter(i) && this._addWrongLetter(e.key);
    if (this.secretWord.includes(e.key)) {
      hangman._addCorrectLetter;
    }
    else {
      hangman._addWrongLetter;
    }
};
