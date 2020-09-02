let attempts = 6;

//ELEMENTS
const letterList = document.getElementById('letterList');
const letterItem = letterList.children;
const keyBoard02 = document.getElementById('keyboard02');
const resultBox = document.getElementsByClassName('result-box');

//Man
const headMan = document.querySelector('.head');
const bodyMan = document.querySelector('.body');
const leftArmyMan = document.querySelectorAll('.army')[0];
const rightArmyMan = document.querySelectorAll('.army')[1];
const leftLegMan = document.querySelectorAll('.leg')[0];
const rightLegMan = document.querySelectorAll('.leg')[1];
const wordTip = document.querySelector('.word-tip');

const word = document.getElementById('word');
const startBtn = document.getElementById('start-game');
const fieldTip = document.querySelector('#tip');
const wrapKeyboard = document.querySelector('.wrap-keyboard');
const hangmanContainer = document.querySelector('.hangman-container'); 

//Events
startBtn.addEventListener('click', function(){
    if(word.value != ''){
        renderWord(word.value, fieldTip.value);
        this.parentNode.classList.add('hide');
        this.parentNode.nextElementSibling.classList.remove('hide');
    }
});

keyBoard02.addEventListener('click', function (e){
    const key = e.target;
    
    if(!key.classList.contains('disable') && !key.classList.contains('keyboard')){
        searchLetter(word.value, key.getAttribute('data-key'));
        score(word.value, key.getAttribute('data-key'));
    }

    key.classList.add('disable');
});

//render word
function renderWord(word, tip) {
    wordTip.innerText = tip;

    for(let i = 0; i < word.length; i++){
        const li = document.createElement('li');
        li.innerText = word[i];
        
        if(word[i] == ' '){
            li.classList.add('show', 'space');
        }

        letterList.appendChild(li);
    }
}

//Search letter
function searchLetter(word, letter) {
    word = word.toLowerCase();

    for(let i = 0; i < word.length; i++){
        if(word[i] == letter && !letterItem[i].classList.contains('show')){
            letterList.children[i].classList.add('show');
        }  
    }    
}

//score
function score (word, letter) {
    word = word.toLowerCase();
    let show = document.querySelectorAll('.show');
    let wordResult = document.querySelector('.word-result');

    if(word.indexOf(letter) == -1){
        attempts--;

        switch (attempts){
            case 5:
                headMan.setAttribute('style', 'display: block;');
                break;
            case 4:
                bodyMan.setAttribute('style', 'display: block;');
                break;
            case 3:
                leftArmyMan.setAttribute('style', 'display: block;');
                break;
            case 2:
                rightArmyMan.setAttribute('style', 'display: block;');
                break;
            case 1:
                leftLegMan.setAttribute('style', 'display: block;');
                break;
            default:
                rightLegMan.setAttribute('style', 'display: block;');
                wordResult.innerText = word;
                wrapKeyboard.setAttribute('style', 'display: none;');
                hangmanContainer.setAttribute('style', 'display: none;');
                resultBox[1].classList.add('show-result-box');
        }
    }

    if(show.length == word.length) {
        hangmanContainer.setAttribute('style', 'display: none;');
        wrapKeyboard.setAttribute('style', 'display: none;');
        resultBox[0].classList.add('show-result-box');
    }
}


//searchLetter(letter);