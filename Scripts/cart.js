let totalDisplay = document.getElementById("cart-total");
let container = document.getElementById("container");
let cartTotal = 0;
localStorage.setItem("chicken-cart-total",cartTotal)
totalDisplay.innerText=cartTotal
let cartData =JSON.parse(localStorage.getItem("chicken-cart"))||[];
console.log(cartData)
let checkout_data=JSON.parse(localStorage.getItem("checkout-data"))||[]

//function displaying cart data
function Display(data){
    container.innerHTML="";
    data.forEach((ele,index)=>{
        cartTotal+= ele.price
        localStorage.setItem("chicken-cart-total",cartTotal)
        totalDisplay.innerText=cartTotal
        let totalQuantity=1
        let card = document.createElement("div");
        let img= document.createElement("img");
        img.setAttribute("src",ele.img)
        let name = document.createElement("h2");
        name.innerText=ele.name
        let desc= document.createElement("p");
        desc.innerText=ele.dsc;
        let price = document.createElement("h2");
        price.innerText="Price: $ "+ele.price;
        let incButton = document.createElement("button");
        incButton.innerText="+";
        incButton.addEventListener("click",()=>{
            cartTotal -= ele.price*totalQuantity
            totalQuantity++;
            quantity.innerText = totalQuantity;
            cartTotal += ele.price*totalQuantity;
            totalDisplay.innerText = cartTotal
            localStorage.setItem("chicken-cart-total",cartTotal)
           
        })
        let quantity = document.createElement("h3");
        quantity.innerText=1;
        let decButton = document.createElement("button");
        decButton.innerText="-"
        decButton.addEventListener("click",()=>{
           if(totalQuantity>1){
            totalQuantity--;
            quantity.innerText = totalQuantity;
            cartTotal -= ele.price;
            totalDisplay.innerText = cartTotal
            localStorage.setItem("chicken-cart-total",cartTotal)
           }
           
        })
        let removeBtn = document.createElement("button");
        removeBtn.innerText="Remove"
        removeBtn.addEventListener("click",()=>{
            let removed = data.filter((e,i)=>{
                if(i===index){
                    cartTotal -= Number(e.price);
                    totalDisplay.innerText = cartTotal
                    localStorage.setItem("chicken-cart-total",cartTotal)
                    return false;
                }else{
                    return true;
                }
            })
            Display(removed)
            localStorage.setItem("chicken-cart",JSON.stringify(removed))
        })
        card.append(img,name,desc,price,incButton,quantity,decButton,removeBtn);
        container.append(card)
    })
}

let orderCount=1;
function addToAdmin(){
    cartData.forEach((el,i)=>{
        let obj={
         id : orderCount,
         name:localStorage.getItem("username"),
         foodName:el.name,
         price:el.price,
        }
        checkout_data.push(obj)
        localStorage.setItem("checkout-data",JSON.stringify(checkout_data));
        orderCount++
    });
}
addToAdmin()

Display(cartData)