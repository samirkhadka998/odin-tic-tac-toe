let inputs = [];
allInputs();

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

    if(inputs.some(o => o.class == e.target.className)){
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
        [1,2,3], 
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ]
    
    let isEqual = false;

    //since we cannot have class name start with digit , so we have class1 to 1 during filter
    winningCombos = winningCombos.filter(combo => combo.includes(Number(input.class.substring(5,6))));


    //I am not using forEach because it does not support break;

    for(let i = 0 ; i < winningCombos.length; i++){
        isEqual = true;
        let item = winningCombos[i];
        for(let j = 0 ; j < item.length; j++){
            let div = document.querySelector(`.class${item[j]}`)
            let content = div.textContent;
            if(!content || content != input.value){
                isEqual = false;
                break;
            }
        }

        if(isEqual){
            break;
        }
    }
  
    return isEqual;
    
}


var btn = document.querySelector('button');