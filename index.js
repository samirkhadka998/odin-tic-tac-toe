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

    display();
}

function calculateWinner() {

    
    for(let i = 0 ; i< inputs.length; i+=3){
        if(inputs[i].value == inputs[i+1] == inputs[i+1]){
            return inputs[i].value;
        }
    }
    
}


var btn = document.querySelector('button');