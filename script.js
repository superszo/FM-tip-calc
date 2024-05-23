let people = document.getElementById('people');
let reset = document.getElementById('reset');
let form = document.forms[0];
let bill = document.getElementById('bill');
let custom = document.getElementById('custom-tip');
let buttons = document.getElementsByClassName('tip');
let perPerson = document.getElementById('per-person')
let total = document.getElementById('total-person')


function toggleButtons () {
    let buttons = document.getElementsByClassName('tip')

    for(elem of buttons) {
        elem.addEventListener('click', (e) => {
            e.preventDefault();

            if (document.getElementsByClassName('clicked').length != 0)  {
                clearButtons();
            }

            e.target.classList.add('clicked')
                calcTip();
        })
    }
};  

function clearButtons () {
    for(elem of buttons) {
        elem.classList.remove('clicked');
    }
};


function showPeopleError () {
    let form = document.forms[0];
    
    form.addEventListener('input', (e) => {

        if(bill.value || people.value) {
            reset.classList.add('active')
        }

        if(!people.value) {
            people.classList.add('error')
            document.getElementById('error-msg').classList.add('show')
        } else {
            people.classList.remove('error')
            document.getElementById('error-msg').classList.remove('show')
        }

        console.log(document.getElementsByClassName('clicked').length)
        calcTip()
    })
}

function calcTip () {
    let numPeople = document.getElementById('people').value



    if (people.value && bill.value && document.getElementsByClassName('clicked').length != 0) {
        let tip = document.getElementsByClassName('clicked')[0].value

        perPerson.innerHTML = `\$${parseFloat((bill.value * tip) / numPeople).toFixed(2)}`
        total.innerHTML = `\$${parseFloat(bill.value / numPeople).toFixed(2)}`

    } else if (people.value && bill.value && document.getElementById('custom-tip').value) {

        perPerson.innerHTML = `\$${parseFloat((bill.value * (custom.value / 100)) / numPeople).toFixed(2)}`
        total.innerHTML = `\$${parseFloat(bill.value / numPeople).toFixed(2)}`
    }   
}

function checkCustom () {
    
    custom.addEventListener('input', () => {
        if (document.getElementsByClassName('clicked').length != 0 && custom.value) {           
            
            clearButtons()
            
        }
    })
}

function validateInput () {
    let inputs = document.getElementsByTagName('input')
        for (input of inputs) {
            input.addEventListener('keydown', (e) => {
                if (e.key === '-' || e.key === 'e') {
                    e.preventDefault()
        }
    
        }
    )}
}

function resetForm () {
    reset.addEventListener('click', () => {
        people.value = null;
        custom.value = null;
        bill.value = null;
        perPerson.innerHTML = '$0.00';
        total.innerHTML = '$0.00'
        clearButtons()

    })
}

function init () {
 
    resetForm()
    toggleButtons()
    showPeopleError()
    checkCustom()
    validateInput()
}


window.onload = init()
    
    