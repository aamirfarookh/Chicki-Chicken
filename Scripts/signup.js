let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let formSubmit = document.querySelector("form");

let signUpData =JSON.parse(localStorage.getItem("Chicken-signup"))||[];

formSubmit.addEventListener("submit",()=>{
   event.preventDefault();
    if(nameInput.value!==""||emailInput.value!==""||passwordInput.value!=="" ){
        let obj ={
            name: nameInput.value,
            email:emailInput.value,
            password:passwordInput.value
        };
        signUpData.push(obj);
        localStorage.setItem("Chicken-signup",JSON.stringify(signUpData));
        alert("Sign up Successful")
        location.href="login.html"
    }
    else{
        alert("ALERT! Fill in all the feilds")
    }
    
})