//=========================================== Global Variables ====================================
var inputName = document.getElementById("inputName");
var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var btnRegistration = document.getElementById("btnRegistration");
var btnLogin = document.getElementById("btnLogin");
var textSuccess = document.getElementById("textSuccess");
var mailExists = document.getElementById("mailExists");
var alertWrongInfo = document.getElementById("alertWrongInfo");
var welcomeUser = document.getElementById("welcomeUser");
var welcomeMessage = document.getElementById("welcomeMessage");
var welcomeUser = document.getElementById("welcomeUser");
var loginForm = document.getElementById("loginForm");
var navbar = document.getElementById("navbar");
var form = document.getElementById("form");
var usersList = [];
//========================================= Deal With LocalStorage ================================
if (localStorage.getItem("usersList") != null) {
  usersList = JSON.parse(localStorage.getItem("usersList"));
}
//========================================= Two Functions To Change Between Forms =================
function showRegistrationForm() {
  inputName.classList.remove("d-none");
  messageLogin.classList.remove("d-none");
  btnRegistration.classList.remove("d-none");
  btnLogin.classList.add("d-none");
  messageRegistration.classList.add("d-none");
}
function showLoginForm() {
  inputName.classList.add("d-none");
  messageLogin.classList.add("d-none");
  btnRegistration.classList.add("d-none");
  btnLogin.classList.remove("d-none");
  messageRegistration.classList.remove("d-none");
}
//========================================= Function To Add New User ===============================
function addNewUser() {
  if (alertEmptyImputs() == true) {
    showMessageEmptyInputs();
  } else if (serchEmail() == true) {
    showMessageMailExists();
  } else {
    var user = {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    };
    serchEmail();
    usersList.push(user);
    localStorage.setItem("usersList", JSON.stringify(usersList));
    showMessageSuccess();
    clearForm();
  }
}
//========================================= Function Alerts About Empty Inputs ======================
function alertEmptyImputs() {
  if (
    userEmail.value == "" ||
    userPassword.value == "" ||
    userPassword.value == ""
  ) {
    return true;
  }
}
//========================================= Function To Check If Email Not Repeated ======================
function serchEmail() {
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].email == userEmail.value) {
      return true;
    }
  }
}
//========================================= Functions To Show Some Messages ==============================
function showMessageEmptyInputs() {
  textAlert.classList.remove("d-none");
  textSuccess.classList.add("d-none");
}
function showMessageMailExists() {
  mailExists.classList.remove("d-none");
  textSuccess.classList.add("d-none");
}
function showMessageWrongInfo() {
  alertWrongInfo.classList.remove("d-none");
}
function showMessageSuccess() {
  textSuccess.classList.remove("d-none");
}
function showMessageWelcome() {
  welcomeUser.classList.remove("d-none");
}
//======================================== Function To Clear Forms =======================================
function clearForm() {
  userName.value = null;
  userEmail.value = null;
  userPassword.value = null;
  textAlert.classList.add("d-none");
  mailExists.classList.add("d-none");
}
//======================================= Function To Check User's Info ==================================
function checkInput() {
  for (var i = 0; i < usersList.length; i++) {
    if (
      userEmail.value == usersList[i].email &&
      userPassword.value == usersList[i].password
    ) {
      document.getElementById(
        "welcomeMessage"
      ).innerHTML = `Welcome ${usersList[i].name}`;
      loginForm.classList.add("d-none");
      welcomeUser.classList.remove("d-none");
      navbar.classList.remove("d-none");
      return true;
    }
  }
}
//========================================= Function Login ===============================================
function logIn() {
  if (alertEmptyImputs() == true) {
    showMessageEmptyInputs();
  } else if (checkInput() == true) {
    checkInput();
    clearForm();
  } else {
    showMessageWrongInfo();
  }
}
//========================================= Function Logout ==============================================
function logout() {
  loginForm.classList.remove("d-none");
  welcomeUser.classList.add("d-none");
  navbar.classList.add("d-none");
  clearForm();
}
//========================================= Deal With Validation  ==============================================
function validateUserName() {
  var regex = /^[a-zA-Z]{4,15}$/;
  if (regex.test(userName.value) == true) {
    userName.classList.remove("is-invalid");
    userName.classList.add("is-valid");
    alertName.classList.add("d-none");
  } else {
    userName.classList.add("is-invalid");
    userName.classList.remove("is-valid");
    alertName.classList.remove("d-none");
  }
}
function validateEmail() {
  var regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (regex.test(userEmail.value) == true) {
    userEmail.classList.remove("is-invalid");
    userEmail.classList.add("is-valid");
    alertEmail.classList.add("d-none");
  } else {
    userEmail.classList.add("is-invalid");
    userEmail.classList.remove("is-valid");
    alertEmail.classList.remove("d-none");
  }
}
function validatePassword() {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (regex.test(userPassword.value) == true) {
    userPassword.classList.remove("is-invalid");
    userPassword.classList.add("is-valid");
    alertPassword.classList.add("d-none");
  } else {
    userPassword.classList.add("is-invalid");
    userPassword.classList.remove("is-valid");
    alertPassword.classList.remove("d-none");
  }
}
// localStorage.clear();
//========================================= Deal With Form  ==============================================

form.addEventListener("submit", function (e) {
  e.preventDefault();
});
