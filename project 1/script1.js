const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// All Fuctions
// Function to show error
function showError(input,message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Fuction to show success
function showsuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Function to check if email is valid
function isvalidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// This is an event listener for the form on submit 
form.addEventListener('submit',function(e) {
    e.preventDefault();
    
    if (username.value === '' ) {
        showError(username,'username is required')
    } else {
        showsuccess(username);
    }
    
    if ( email.value === '' ) {
        showError(email,'Email is required')
    } else if (!isvalidEmail(email.value)) {
        showError(email,'Email is invalid')
    } else {
        showsuccess(email);
    }

    if (password.value === '' ) {
        showError(password,'Password is required')
    } else {
        showsuccess(password);
    }

    if (password2.value === '' ) {
        showError(password2,'Password2 is required')
    } else {
        showsuccess(password2);
    }
})