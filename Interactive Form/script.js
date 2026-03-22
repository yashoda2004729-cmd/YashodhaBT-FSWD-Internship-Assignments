document.getElementById("form").addEventListener("submit", function(event){

event.preventDefault();

let valid = true;

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("phone").value;
let company = document.getElementById("company").value;
let experience = document.getElementById("experience").value;
let password = document.getElementById("password").value;
let file = document.getElementById("resume").value;

document.querySelectorAll(".error").forEach(e => e.innerText = "");
document.getElementById("success").innerText = "";

if(name === ""){
document.getElementById("nameError").innerText = "Name is required";
valid = false;
}

let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if(!email.match(emailPattern)){
document.getElementById("emailError").innerText = "Enter valid email";
valid = false;
}

if(phone.length < 10){
document.getElementById("phoneError").innerText = "Enter valid phone number";
valid = false;
}

if(company === ""){
document.getElementById("companyError").innerText = "Company name required";
valid = false;
}

if(experience === ""){
document.getElementById("expError").innerText = "Enter work experience";
valid = false;
}

if(file === ""){
document.getElementById("fileError").innerText = "Please upload resume";
valid = false;
}

if(password.length < 6){
document.getElementById("passwordError").innerText = "Password must be at least 6 characters";
valid = false;
}

if(valid){
document.getElementById("success").innerText = "Application Submitted Successfully!";
}

});