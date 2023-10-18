let gameOver = false;
let inputs = [];
const scoreTracker = {
    player1 : 0,
    player2 : 0,
    draw : 0
}
allInputs();

var playAgainBtn = document.querySelector('#playAgain');
playAgainBtn.addEventListener('click', reset)

var scoreReset = document.querySelector('#resetScore');
scoreReset.addEventListener('click', () => {
    scoreTracker.player1 = 0;
    scoreTracker.player2 = 0;
    scoreTracker.draw = 0;
    displayScore();
})

function Tictac(className, value) {
    this.class = className;
    this.value = value;
}



function allInputs() {
    let inputDivs = document.querySelectorAll('.wrapper>div');
    Array.from(inputDivs).forEach(div => {
        div.addEventListener('click', addItem);
    })
}



function addItem(e) {

    if (inputs.some(o => o.class == e.target.className) || gameOver) {
        return;
    }
    let input;
    if (inputs.length == 0) {
        e.target.textContent = "x";
        input = new Tictac(e.target.className, e.target.textContent)
    }
    else {
        let lastValue = inputs[inputs.length - 1].value;
        if (lastValue == "x") {
            e.target.textContent = "o";
            input = new Tictac(e.target.className, e.target.textContent)

        }
        else {
            e.target.textContent = "x";
            input = new Tictac(e.target.className, e.target.textContent)

        }

    }
    inputs.push(input)
    calculateWinner(input);

}

function calculateWinner(input) {

    let winningCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]

    let isEqual = false;

    //since we cannot have class name start with digit , so we have class1 to 1 during filter
    winningCombos = winningCombos.filter(combo => combo.includes(Number(input.class.substring(5, 6))));


    //I am not using forEach because it does not support break;

    for (let i = 0; i < winningCombos.length; i++) {
        isEqual = true;
        let item = winningCombos[i];
        let divs = [];
        for (let j = 0; j < item.length; j++) {
            let div = document.querySelector(`.class${item[j]}`)
            divs.push(div);
            let content = div.textContent;
            if (!content || content != input.value) {
                isEqual = false;
                break;
            }
        }

        if (isEqual) {
            let message = '';
            let winningMessage = document.querySelector('.winningMessage');
            if (input.value == "x") {
                let player1Input = document.querySelector('#player1');
                message = player1Input.value ? player1Input.value : 'Player1';
                scoreTracker.player1++;
                displayScore();
            }
            else {
                let player2Input = document.querySelector('#player2');
                message = player2Input.value ? player2Input.value : 'Player2'
                scoreTracker.player2++;
                displayScore();

            }
            message += ' wins!'
            winningMessage.textContent = message;
            colorDivs(divs);
            gameOver = true;

            break;
        }
    }

    //if all winning combo is not met
    if (!isEqual && inputs.length == 9) {
        let winningMessage = document.querySelector('.winningMessage');
        winningMessage.textContent = `hmm it's a draw then!`;
        scoreTracker.draw++;
        displayScore();
    }
    return isEqual;

}

function displayScore(){
    let playerOne = document.querySelector('.playeroneScore');
    let playertwo = document.querySelector('.playertwoScore');
    let draw = document.querySelector('.draw');
    let player1Input = document.querySelector('#player1');
    let player2Input = document.querySelector('#player2');
    playerOne.textContent =  `${player1Input.value} : ${scoreTracker.player1}`;
    playertwo.textContent = `${player2Input.value} : ${scoreTracker.player2}`;
    draw.textContent = `Draw : ${scoreTracker.draw}`;
}

function reset() {
    gameOver = false;
    inputs = [];
    let winningMessage = document.querySelector('.winningMessage');
    winningMessage.textContent = '';
    let inputDivs = document.querySelectorAll('.wrapper>div');
    inputDivs.forEach(div => {
        div.textContent = '';
        div.style.background = 'var(--color1)'
        div.style.border = `1px solid var(--color3)`
    })

}

function colorDivs(divs) {
    Array.from(divs).forEach(div => {
        div.style.border = `3px solid var(--color4)`;  
    })
}



