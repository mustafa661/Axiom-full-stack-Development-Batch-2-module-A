const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
function success(input){
    const parent=input.parentElement;
    parent.className='form-control success'
    console.log(parent);
}
function error(input,message){
    const parent=input.parentElement;
    parent.className='form-control error';
    const small=parent.querySelector('small');
    small.innerText=message;
}
function checkempty(input){
    input.forEach(input => {
        if(input.value===''){
            error(input,'Input is required');
        }
        else{
            success(input);
        }
    });
}
function checklength(input,l){
    if(input.value.length<l){
        error(input,`Input must have atleast ${l} characters`)
    }
}
function checkEmail(input){
    const re= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const v= re.test(String(input.value).toLowerCase());
    if(v==false)
    {
        error(input,'Please provide a valid email')
    }
}
function checkPassword(input1,input2){
    if(input1.value!=input2.value){
        error(input2,'Password does not match')
    }

}

form.addEventListener('submit',function(e){
    e.preventDefault();
    error(username,'username is required');
    checkempty([username,email,password,password2]);
    checklength(username,3);
    checklength(password,6);
    checkEmail(email);
    checkPassword(password,password2);


})