let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'chocolate 1',
        image: '1.jpg',
        price: 120000
    },
    {
        id: 2,
        name: 'chocolate NAME 2',
        image: '2.jpg',
        price: 120000
    },
    {
        id: 3,
        name: 'chocolate NAME 3',
        image: '3.jpg',
        price: 220000
    },
    {
        id: 4,
        name: 'chocolate NAME 4',
        image: '4.jpg',
        price: 123000
    },
    {
        id: 5,
        name: 'chocolate NAME 5',
        image: '5.jpg',
        price: 320000
    },
    {
        id: 6,
        name: 'chocolate NAME 6',
        image: '6.jpg',
        price: 120000
    },
    {
        id: 7,
        name : 'chocolate NAME 7',
        image : '2.jpg',
        price : 234324
    },
    {
        id: 8,
        name : 'chocolate NAME 8',
        image : '1.jpg',
        price : 2343
    },
    {
        id: 9,
        name : 'chocolate NAME 8',
        image : '5.jpg',
        price : 23432
    }
];
let listCards  = [];
let itemCount = 0;
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}

initApp();
function addToCard(key){
    if(listCards[key] == null) {
        if(itemCount < 8) {
            listCards[key] = JSON.parse(JSON.stringify(products[key]));
            listCards[key].quantity = 1;
            itemCount++;//incrememnt by 1
        } else {
            alert('you can only add up to eight items');
        }
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
        itemCount--;
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}