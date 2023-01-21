// Declaring global variables
let hamburger = document.getElementById("hamburger");
let hiddenLinks = document.querySelector(".hidden-links");
let user = document.getElementById("username");
let userName =localStorage.getItem("username");
user.innerText=userName
let container = document.querySelector(".container");
let logoutBtn = document.getElementById("logoutBtn");
let logoutLink = document.getElementById("logoutLink");
let sortFilter = document.getElementById("sort");
let categoryFilter = document.getElementById("filter");
let searchInput = document.getElementById("search-bar");
let form = document.querySelector("#form-main");
let logo = document.getElementById("logo");
    logo.addEventListener("click",()=>{
      location.href="dashboard.html"
    })
let productData=[];
let cartData=JSON.parse(localStorage.getItem("chicken-cart"))||[]
// Buttons functionality hamburger
hamburger.addEventListener("click",()=>{
  hiddenLinks.classList.toggle("visible")
})

// Buttons functionality logout button
logoutBtn.addEventListener("click",()=>{
    confirm("Are you sure you want to logout");
    location.href="index.html"
})

// Buttons functionality logout link
logoutLink.addEventListener("click",()=>{
    alert("LOGOUT SUCCESSFUL");
    location.href="index.html"
})

// Fetching data from the API
async function fetchData(){
    try{
     let request = await fetch("https://63c8f09ec3e2021b2d4c30d1.mockapi.io/food_products");
     let response = await request.json();
     productData=response
     Display(productData)
    }
    catch(err){
     console.log(err)
    }
}



//Display function to show data on DOM
function Display(data){
    container.innerHTML="";
    data.forEach((el,index)=>{
        let card = document.createElement("div");
        let img= document.createElement("img");
        img.setAttribute("src",el.img)
        let name = document.createElement("h2");
        name.innerText=el.name
        let desc= document.createElement("p");
        desc.innerText=el.dsc;
        let price = document.createElement("h2");
        price.innerText="Price: $ "+el.price;
        let rating = document.createElement("h3")
        rating.innerText ="Rating:"+el.rate +"/5";
        let cartBtn = document.createElement("button");
        cartBtn.innerText="Add to Cart"
        cartBtn.addEventListener("click",()=>{
          let addedToCart =productData.filter((ele,i)=>{
            if(i===index){
                if(cartData.includes(ele)===false){
                    cartData.push(ele);
                    alert("Product added to cart")
                    return true
                    
                }else{
                    alert("Product already in cart!");
                    return false 
                }
            }
          });
          localStorage.setItem("chicken-cart",JSON.stringify(cartData))
        })
        card.append(img,name,desc,price,rating,cartBtn);
        container.append(card)
    })
}

fetchData()  //calling the fetch function

// Sort by price functionality
sortFilter.addEventListener("change",()=>{
   if(sortFilter.value===""){
    Display(productData)
   }else{
    if(sortFilter.value==="asc"){
        let Incsorted =productData.sort((a,b)=>{
            return a.price-b.price})
            console.log(productData)
      Display(Incsorted)
    }
    else  if(sortFilter.value==="des"){
        let Decsorted =productData.sort((a,b)=>{
            return b.price-a.price})
           Display(Decsorted)
   }
}
})

//Filter by category
categoryFilter.addEventListener("change",()=>{
    if(categoryFilter.value===""){
        Display(productData)
    }else{
        if(categoryFilter.value==="chicken"){
            let chickenCat = productData.filter((el)=>{
                if(el.name.toLowerCase().includes(categoryFilter.value)){
                    return true
                }
                else{
                    return false
                }
            })
            Display(chickenCat)
        }
        else  if(categoryFilter.value==="burger"){
            let burgerCat = productData.filter((el)=>{
                if(el.name.toLowerCase().includes(categoryFilter.value)||el.dsc.toLowerCase().includes(categoryFilter.value)){
                    return true
                }
                else{
                    return false
                }
            })
            Display(burgerCat)
        }
    }
})

//Search functionality
form.addEventListener("submit",()=>{
    event.preventDefault();
    let searched = productData.filter((el)=>{
        if(el.name.toLowerCase().includes(searchInput.value.toLowerCase())||el.dsc.toLowerCase().includes(searchInput.value.toLowerCase())){
            return true
        }
        else{
            return false
        }
    });
    Display(searched)
})