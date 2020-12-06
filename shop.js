// displayig cards in shop
function display_products() {

    var cards = ''

    var all_products = JSON.parse(localStorage.getItem('itemsJson'))

    if (all_products != null) {
        for (let item of all_products) {
            cards = cards + ` 
            
            
            <div class="card">
            <button class="close-modal hidden">&times;<button>
            <h3 class="details"> ${item.title} </h3>
            <img src=" ${item.image}  "
                alt="" class="card-img">
                <h3 class="details">
                <span style='font-size:25px;'> &#8377; ${item.price}</span>
                </h3>
                <div class="check">
            `

            for (i = 0; i < item.rating; i++) {
                cards = cards + ' <span class="fa fa-star checked"></span>  '
            }

            for (i = 0; i < (5 - item.rating); i++) {
                cards = cards + ' <span class="fa fa-star "></span>  '
            }

            cards = cards + ` 
        </div>
        <a class="cart_btn" onclick=  "add_cart( ${item.id}  )">Add To Cart</a>
        </div>
    `
        }
        document.getElementById('shopping-card').innerHTML = cards
    }
    else {

        document.getElementById('shopping-card').innerHTML = '<h1> No Products in Shop </h1>'
    }

}
display_products()


// switching cart and shop sections 

function hide_shop() {
    display_cart()
    document.getElementById('cart_link').style.display = 'block'
    document.getElementById('shop_main').style.display = 'none'
}


function hide_cart() {
    document.getElementById('cart_link').style.display = 'none'
    document.getElementById('shop_main').style.display = 'block'
    document.getElementById('shopping-card').style.display = 'flex'
}


// Adding a quantity/price with respective to times the product was added into cart 

var cart_products = {}
let total_price = 0

function add_cart(prod_id) {

    var all_products = JSON.parse(localStorage.getItem('itemsJson'))

    if (cart_products[prod_id]) {
        // console.log(cart_products)
       
        cart_products[prod_id]['quantity'] += 1
        cart_products[prod_id]['cart_price'] += cart_products[prod_id]['price']
        total_price += cart_products[prod_id]['price']
        // console.log(cart_products);
        return
    }

    // For the first time adding in cart_products 
    for (let item of all_products) {
        if (item.id == prod_id) {
            cart_products[prod_id] = item
            cart_products[prod_id]['cart_price'] = cart_products[prod_id]['price']
            cart_products[prod_id]['quantity'] = 1
            total_price += cart_products[prod_id]['price']
            return
        }
    }
}
// adding products to cart when "add to cart"is clicked


function display_cart() {

    all_carts_item = ""
    console.log(cart_products)
    if (Object.keys(cart_products).length > 0) {
       

        for (item_key in cart_products) {
            all_carts_item += `
            <div class="cart_items">     
            <h1 class="cart-title">${cart_products[item_key].title}</h1>
            
                        <div class="cart-img">
                            <img src="${cart_products[item_key].image}"
                                alt="No Image">
                        </div>
                        <h1 class="cart-quantity">${cart_products[item_key].quantity}</h1>
                        <h1 class="cart-price">${cart_products[item_key].price}</h1>
                        <a class="delete" onclick="delete_prod( ${item_key} )">Delete</a>
        </div>
            `
        }
        
        all_carts_item += `<center> <h1 id="total_price"> Total Price = &nbsp ${total_price} </h1> </center>`
        document.getElementById('cart_link').innerHTML = all_carts_item
        // console.log(all_carts_item)
    }

    else {
        document.getElementById('cart_link').innerHTML = ' <h1 id="no-cart">  No Products Added !!! </h1>'
    }
}
// delete cart products
function delete_prod(prod_key) {
    total_price -= cart_products[prod_key].cart_price
    delete cart_products[prod_key]
    display_cart()
}
// Model Js part for each card 

image_click = document.querySelectorAll('.card-img')
card = document.querySelectorAll('.card');
btnCloseModal = document.querySelectorAll('.close-modal');
before_blur = document.querySelector('.blur');



for (let i=0 ; i < image_click.length ; i++) {

    image_click[i].addEventListener('click', () => {
        
        card[i].classList.add('modal');
        before_blur.classList.add('overlay');
        btnCloseModal[i].classList.remove('hidden');

    });
    
}


for (let i=0 ; i < btnCloseModal.length ; i++) {

    btnCloseModal[i].addEventListener('click', () => {
        
        card[i].classList.remove('modal');
        btnCloseModal[i].classList.add('hidden');
        before_blur.classList.remove('overlay');

    });
    
}

