// Default API call for testing
const API_CALL = "https://fakestoreapi.com/products";

// Section where products will go
const productSection = document.getElementById("products"); 

function createProductCard(name, price, image) {
    console.log("CREATE PRODUCT CALL");
    /* 
    1. Make div with class card to hold item
    2. Make h3 and use product name for the innerText
    3. Make img and use image url for src
    4. Make an add to card button
    */
    const productCard = document.createElement("div");
    productCard.className = "card";

    const productLabel = document.createElement("h3");
    productLabel.innerText = name;

    const productImage = document.createElement("img");
    productImage.src = image;

    const productPrice = document.createElement("p");
    productPrice.innerText = "$" + price;

    const productButton = document.createElement("button");
    productButton.innerText = "Add to Cart";

    // Add new elements to newly created div/card
    productCard.appendChild(productLabel);
    productCard.appendChild(productImage);
    productCard.appendChild(productPrice);
    productCard.appendChild(productButton);

    // Adds card to product section
    productSection.appendChild(productCard);
}

// Make API call to get all products from DB
async function getProducts() {
    try {
        const response = await fetch(API_CALL);
        const data = await response.json();

        if(!response.ok){
            console.log(`BAD RESPONSE: ${response}`);
            return;
        }
        
        //console.log(data);
        return data;
    } catch(e) {
        console.log(`ERROR: ${e}`);
    }
}

// Update DOM with product name and price
async function renderProducts(products) {
    // Get full products list from getProducts' promise
    const productList = await getProducts();
    // Loop through each product
    for(i = 0; i < productList.length; i++) {
        const name = productList[i].title;
        const price = productList[i].price;
        const image = productList[i].image;
        createProductCard(name, price, image);
    }
}

renderProducts();