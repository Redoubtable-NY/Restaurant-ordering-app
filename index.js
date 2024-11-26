import menuArray from "./data.js";
const foodMenu = document.getElementById("food-menu")
const cartContents = document.getElementById("cart-contents")
const foodCart = document.getElementById("food-cart")
const totalCost = document.getElementById("total-cost")
const primaryButton = document.getElementById("cart-primary-button")
const overlay = document.getElementById("overlay")
const modal = document.getElementById("modal")
const orderConfirmationContainer = document.getElementById("order-confirmation-container")
// const formPrimaryButton = document.getElementById("form-primary-button")
const cardDetails = document.getElementById("card-details")
let itemList = []


document.addEventListener("click",function(e){
    let itemKey = ''
    if(e.target.className === "add-item"){
        itemKey = Number(e.target.dataset.id)
        isolatedArray(itemKey)
    } else if(e.target.className === "cart-item-remove"){
        itemKey = Number(e.target.dataset.id)
        removeItem(itemKey)
    }
})


cardDetails.addEventListener("submit", function(event){
    event.preventDefault()
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
    foodCart.classList.add('hidden')
    orderConfirmationContainer.classList.remove('hidden')
    }
)
// formPrimaryButton.addEventListener("submit", revealConfirmation)

// function revealConfirmation(){
//     modal.classList.add('hidden')
//     overlay.classList.add('hidden')
//     foodCart.classList.add('hidden')
//     orderConfirmationContainer.classList.remove('hidden')
// }

primaryButton.addEventListener("click", triggerModal)

function triggerModal(){
    overlay.classList.remove('hidden')
    modal.classList.remove('hidden')
}

function populatedMenu() {
    let menu = ''
    menuArray.forEach(function(item){
        menu += `
        <div class="emoji-letter-button-container"> 
            <div class="emoji-letter-container">
                <div class="emoji">${item.emoji}</div>
                <div class="item-description">
                    <p class="food">${item.name}</p>
                    <p class="options">${item.ingredients.join(", ")}</p>
                    <p class="price">${item.price}</p>
                </div>
            </div>
            <div class="button-container">
                <button class="add-item" data-id="${item.id}">+</button>
            </div>
        </div>
        `
        }
    )
    return menu
}

function renderMenu(){
    foodMenu.innerHTML = populatedMenu()
}

function removeItem(identifier){
    const index = itemList.findIndex((item) => { 
        return item.id === identifier
        }
        )
    console.log(index)
    itemList.splice(index, 1)
    populatedCart(itemList)
    priceOfCart(itemList)
}


function isolatedArray(itemKey){
    const filteredList = menuArray.filter((item) => {
        return item.id === itemKey
    })
    itemList.push(...filteredList)
    populatedCart(itemList)
    priceOfCart(itemList)
}

function populatedCart(cartItems){
    foodCart.classList.remove('hidden')
    foodCart.classList.add('food-cart-flex')
    let foodInCart = ``
    cartItems.forEach(function(cartItem){
    foodInCart += `
        <div class="item-name-price-container">
            <div class="item-link">
            <p class="cart-item-name">${cartItem.name}</p>
            <a class="cart-item-remove" data-id="${cartItem.id}">remove</a>
            </div>
            <div class="item-cost-in-cart">
            <p class="cart-item-price">$${cartItem.price}</p>
            </div>
        </div>
        
    `
    })

    return cartContents.innerHTML = foodInCart
} 

renderMenu()

function priceOfCart(cartItems){
    let totalPrice = ''
    let isolatedPrices = cartItems.map((cartItem)=>{
        return {name: cartItem.name ,price: cartItem.price}
    })
    totalPrice = `
    <div id="price-callout">
        Total price:
    </div>    
    <div id="final-price">
        $${isolatedPrices.reduce((accumulator, item) => {
        return accumulator + item.price}, 0)
        }
    </div>`

    return totalCost.innerHTML = totalPrice
}