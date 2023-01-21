let emailInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let submitForm = document.querySelector("form");

let loginData=JSON.parse(localStorage.getItem("Chicken-signup"))||[];
let userName=""
submitForm.addEventListener("submit",()=>{
    event.preventDefault();
    console.log(loginData.length)
//    loginData.forEach((el)=>{
//     if(el.email===emailInput.value && el.password===passwordInput.value){
//         alert("Login Successful")
//         userName=el.name
//         localStorage.setItem("username",userName)
//         location.href="dashboard.html"
        
//     }
//     else{
//         alert("OOPS! Wrong Credentials")
//         console.log("Noo")
         
//     }
    
//    })
for(let i=0;i<loginData.length;i++){
    if(loginData[i].email===emailInput.value && loginData[i].password===passwordInput.value){
                alert("Login Successful")
                userName=loginData[i].name
                localStorage.setItem("username",userName)
                location.href="dashboard.html"
                break;
            }
            else {
                alert("OOPS! Wrong Credentials")
                 break;
            }
}
})