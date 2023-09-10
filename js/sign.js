const loginContainer = document.querySelector('#loginContainer');
const signUpContainer = document.querySelector('#signUpContainer');

const logInForm = document.querySelector('#logInForm form');
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const emailHelpSmall = document.querySelector('#emailHelp');
const signUpPageBtn = document.querySelector('#signUp-btn');

const signUpForm = document.querySelector('#signUpForm form');
const signUpInputEmail = document.querySelector('#signUpInputEmail');
const signUpInputPassword = document.querySelector('#signUpInputPassword');
const signUpConfirmPassword = document.querySelector('#signUpConfirmPassword');
const confirmPasswordHelpSmall = document.querySelector('#confirmPasswordHelp');
const loginPageBtn = document.querySelector('#login-btn');
const signUpMsgSmall = document.querySelector('#signUpMsg');

let userLoginData = [
    {
        email: 'habiba@mail.com',
        password: '123'
    },
    {
        email: 'random@mail.com',
        password: 'abc'
    }
];




logInForm.onsubmit = function(e){
    e.preventDefault()
    if(checkLoginParams()){
        document.location.href = './game.html';
    }else{
        emailHelpSmall.textContent = "Couldn't find your account, Please check your login credentials"
    }
    
}

signUpForm.onsubmit = function(e){
    e.preventDefault()
    if(checkPasswordMatch(signUpInputPassword.value, signUpConfirmPassword.value)){
        createNewAccount(signUpInputEmail.value, signUpInputPassword.value);
        signUpMsgSmall.textContent = 'Account created succesfully, Login now';
        confirmPasswordHelpSmall.textContent = '';
    }else{
        confirmPasswordHelpSmall.textContent = "Password doesn't match, please check again."
    }
}


signUpPageBtn.addEventListener('click', function(){
    signUpContainer.classList.remove('d-none');
    loginContainer.classList.add('d-none');
    inputEmail.value = '';
    inputPassword.value = '';
    emailHelpSmall.textContent = '';
});

loginPageBtn.addEventListener('click', function(){
    loginContainer.classList.remove('d-none');
    signUpContainer.classList.add('d-none');
    signUpInputEmail.value = '';
    signUpInputPassword.value = '';
    signUpConfirmPassword.value = '';
    signUpMsgSmall.textContent = '';
});


function checkLoginParams(){
    let isFound = userLoginData.findIndex(function(user){
        return user.email == inputEmail.value && user.password == inputPassword.value;
    })
    
    return isFound > -1;
}

function createNewAccount(userEmail, userPassword){
    userLoginData.push({email: userEmail , password: userPassword})
}

function checkPasswordMatch(password, matchPassword){
    if(password == matchPassword){
        return true;
    }
    return false;
}


function togglePassword(element){
    if(inputPassword.getAttribute('type') === 'password'){
        inputPassword.setAttribute('type','text');
        element.innerHTML = '<i class="fa-regular fa-eye" style="color: #000000;"></i>';
    }else{
        inputPassword.setAttribute('type','password');
        element.innerHTML = '<i class="fa-regular fa-eye-slash" style="color: #000000;"></i>';
    }
}