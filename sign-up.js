let firstName = document.getElementById('first_name');
let lastName = document.getElementById('last_name');
let phone = document.getElementById('phone');
let password = document.getElementById('password');
let passwordRepeat = document.getElementById('password_repeat');

let idPassMismatch = 'password_mismatch';
let idInvalidPhone = 'invalid_phone';


function noEmptyFields(){
    let iEmpty = 0;
    let items = [firstName, lastName, phone, password, passwordRepeat];
    items.forEach(element => {
        if (!element.value){
            iEmpty++;
            element.classList.add('red-border');
        }
    });

    return iEmpty;
}

function onPhone(e){
    if (!phone.value || phone.value == 0){
        return;
    }

    if (phone.value.length < 10){
        if (!document.getElementById(idInvalidPhone)){
            let p = document.createElement('p');
            p.id = idInvalidPhone;
            p.classList.add('invalid-field');
            p.innerHTML = 'Invalid phone number:';
            phone.before(p);
        }

    }else{
        let p = document.getElementById(idInvalidPhone);
        if (p){
            p.remove();
        }

    }
}

phone.addEventListener('keyup', onPhone);

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    let success = false;
    iEmpty = noEmptyFields();
    success = !Boolean(iEmpty);

    let form = document.querySelector('form');

    if (iEmpty > 0){
        if(!document.getElementById('required_text')){
            let p = document.createElement('p');
            p.id = 'required_text';
            p.innerHTML = 'You must enter all the required fields!';
            form.prepend(p);
        }
    }

    onPhone(e);
    passwords_blur(e);

    if (success){
        alert('good form');
    }

});

document.querySelector('form').addEventListener('keyup', function(e){
    e.target.classList.remove('red-border');
    let reqText = document.getElementById('required_text');
    if (reqText){
        if (noEmptyFields() == 0){
            reqText.remove();
        }
    }

    if (e.target == password || e.target == passwordRepeat){

    }
});

function passwords_blur(e){
    let focused = passwordRepeat;
    let other = password;
    if (e.target == password){
        focused = password;
        other = passwordRepeat;
    }

    // for the keydown event
    let p = document.getElementById(idPassMismatch);
    if (p){
        if (other.value == focused.value){
            p.remove();
        }
    }

    if (other.value && focused.value != other.value){
        if (!document.getElementById(idPassMismatch)){
            let p = document.createElement('p');
            p.id = idPassMismatch;
            p.classList.add('invalid-field');
            p.innerHTML = 'Passwords don\'t match:';
            password.before(p);
        }
    }else{
        let p = document.getElementById(idPassMismatch);
        if (p){
            p.remove();
        }
    }

}

password.addEventListener('blur', passwords_blur);
password.addEventListener('keyup', passwords_blur);
passwordRepeat.addEventListener('blur', passwords_blur);
passwordRepeat.addEventListener('keyup', passwords_blur);

