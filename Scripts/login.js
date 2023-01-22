let emailInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let submitForm = document.querySelector("form");

let loginData=JSON.parse(localStorage.getItem("Chicken-signup"))||[];
let userName=""
submitForm.addEventListener("submit",()=>{
    event.preventDefault();
   loginData.forEach((el)=>{
    if(el.email===emailInput.value && el.password===passwordInput.value){
        alert("Login Successful")
        userName=el.name
        localStorage.setItem("username",userName)
        location.href="dashboard.html"
    }
    
   })
})