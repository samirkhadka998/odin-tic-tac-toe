let gameOver = false;
let inputs = [];
allInputs();

var resetBtn = document.querySelector('button');
resetBtn.addEventListener('click', reset)

function tictac(className, value) {
    this.class = className;
    this.value = value;
}

function allInputs() {
    let inputDivs = document.querySelectorAll('.wrapper>div');
    Array.from(inputDivs).forEach(div => {
            div.addEventListener('click', addItem);
    })
}

function display() {
    let message = '';
    inputs.forEach(o => {
        message += `{class : ${o.class}, value : ${o.value}},`
    })
    document.querySelector('.array').textContent = message;
    console.table(inputs)
}

function addItem(e) {
   
    if (inputs.some(o => o.class == e.target.className) || gameOver) {
        return;
    }
    let input;
    if (inputs.length == 0) {
        e.target.textContent = "x";
        input = new tictac(e.target.className, e.target.textContent)
    }
    else {
        let lastValue = inputs[inputs.length - 1].value;
        if (lastValue == "x") {
            e.target.textContent = "o";
            input = new tictac(e.target.className, e.target.textContent)

        }
        else {
            e.target.textContent = "x";
            input = new tictac(e.target.className, e.target.textContent)

        }

    }
    inputs.push(input)
    calculateWinner(input);

    display();
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
            }
            else {
                let player2Input = document.querySelector('#player2');
                message = player2Input.value ? player2Input.value : 'Player2'
            }
            message += ' wins!'
            winningMessage.textContent = message;
            colorDivs(divs, '#0000ff');
            gameOver = true;

            break;
        }
    }

    return isEqual;

}

function reset() {
    gameOver = false;
    inputs = [];
    let winningMessage = document.querySelector('.winningMessage');
    winningMessage.textContent = '';
    let inputDivs = document.querySelectorAll('.wrapper>div');
    inputDivs.forEach(div => {
        div.textContent = '';
        div.style.background = '#fff'
    })

}

function colorDivs(divs, color) {
    Array.from(divs).forEach(div => {
        div.style.background = color;
    })
}



