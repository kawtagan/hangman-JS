const els = {
    score: null,
    answer: null,
    choices: null,
};

const words = [
    'JAVASCRIPT', // [0]
    'STYLESHEET', // [1]
    'LANGUAGE' // [2]
];
let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 8;

const Init = () => {
    console.log('>> #Init');

    //Attach elements
    els.score = document.querySelector('#score');
    els.answer = document.querySelector('#answer');
    els.choices = document.querySelector('#choices');

    //Pick word
    word = pickWord();
        // console.log('word', word);

    // - create word mapping
    wordMapping = getWordMapping(word);
        //console.log('wordMapping', wordMapping);

    //generate choices
    choices = generateChoices();
        //console.log(choices);

    // - create choices mapping
    choicesMapping = getChoicesMapping(choices);
        //console.log(choicesMapping);

    //display word
    displayWord(wordMapping);

    //display choices
    displayChoices(choicesMapping);

    //display score
    //displayScore();
    //listen events
    // -mouse events
    els.choices.addEventListener('click', ({ target }) => {
        //evt: mouseEvent evt.target => { target }
        if (target.matches('li')) {
            checkLetter(target.innerHTML);
        }
    });
    // -keyboard events
    document.addEventListener('keydown', ({ keyCode }) => {
        //evt: keyboardEvent evt.keyCode => { keyCode }
            // console.log('keyCode', keyCode);

        const letter = String.fromCharCode(keyCode);
            //console.log('letter', letter);
            if (keyCode >= 65 && keyCode <= 90) {
                checkLetter(letter);
            }
            checkLetter(letter);
    });

    //check letter
    // -if not in word: add score
    // -if in word: display letter
    // -endGame
    //    - if score == max: loseGame
    //    - if letter are visible: winGame
};
    //... Boucle pour trouver si la lettre sur laquelle je clique est vraie, si faux , alors passe a une autre
const checkLetter = (letter) => {
         // console.log(letter);

   let isLetterInWord = false;
   let isAllLettersFound = true;
         //console.log('isLetterWord before loop', isLetterInWord);

   wordMapping.forEach((letterMapping) => {
        //console.log('letterMapping.letter', letterMapping.letter);

    if (letterMapping.letter === letter) {
        letterMapping.isVisible = true;
        isLetterInWord = true;
    }
    if (letterMapping.isVisible === false) {
        isAllLettersFound = false;
    }

   });
   choicesMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }
   });
   displayChoices(choicesMapping);

   if (isLetterInWord === true) {
       displayWord(wordMapping);
   } else {
    scoreCount++;
    displayScore(); 
    }

    //...conditions pour la fin du jeu

    if (scoreCount === maxScore)  {
        endGame();
    }

    if (isAllLettersFound) {
        winGame();
    }
        //console.log('isLetterWord after loop', isLetterInWord);
};

const endGame = () => {
    wordMapping.forEach(w => w.isVisible = true);
    displayWord(wordMapping);
    document.querySelector('body').style.backgroundColor = 'darkred';
    els.choices.innerHTML = `<h1>You have been slained, LOSER!</h1>`;
};

const winGame = () => {
    document.querySelector('body').style.backgroundColor = 'lightgreen';
    els.choices.innerHTML = `<h1>You are FREE!</h1>`;
}

window.addEventListener('load', () => {
    Init();
});



// copy/paste code
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
 const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}