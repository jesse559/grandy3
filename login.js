let phone = document.getElementById('phone');
let password = document.getElementById('password');

phone.addEventListener('blur', onBlur);
password.addEventListener('blur', onBlur);
phone.addEventListener('keyup', onType);
password.addEventListener('keyup', onType);
document.querySelector('form').addEventListener('submit', onFormSubmit);

function onType(e){
    if (e.target == phone){
        if (invalidPExists()){
            if(isPhoneNumberValid(phone.value)){
                document.getElementById('invalid_phone_p').remove();
            }
        }
    }
}

function isPhoneNumberValid(number){
    if (number.length < 10 ){
        return false;
    }

    return true;
}

function createInvalidPhoneP(){
    let id = "invalid_phone_p";
    if (!document.getElementById(id)){
        let p = document.createElement('p');
        p.id = id;
        p.classList.add('invalid-field');
        p.innerHTML = "Phone number invalid!";
        document.querySelector('form').prepend(p);
    }
}

function invalidPExists(){
    return Boolean(document.getElementById('invalid_phone_p'));
}

function onBlur(e){
    if (e.target == phone){
        if (!isPhoneNumberValid(phone.value)){
            createInvalidPhoneP();
        }
    }
}

function mustEnterPassword(){
    let id = 'must_enter_password';
    if (!document.getElementById(id)){
        let p = document.createElement('p');
        p.id = id;
        p.classList.add('invalid-field');
        p.innerHTML = "You must enter a password";
        document.querySelector('form').prepend(p);
    }
}

function onFormSubmit(e){
    let success = true;
    e.preventDefault();

    if (!isPhoneNumberValid(phone.value)){
        createInvalidPhoneP();
        success = false;
    }

    if (!password.value){
        mustEnterPassword();
        success = false;
    }

    if (success){
        e.target.submit();
    }

}