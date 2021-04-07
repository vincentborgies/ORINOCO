const cart = JSON.parse(window.localStorage.getItem('cart'));

// au clique sur le bouton, on supprime les éléments du panier 

document.querySelector('#delete-cart__button').addEventListener('click', ()=> {
    localStorage.clear();
    location.reload();
    alert('les articles du panier ont été supprimés');

});

if (cart == null){
    
    document.querySelector('.cart-content').innerHTML = `
    <h1>Votre panier</h1>
    <p>Votre panier est actuellement vide<p>
    <div><span>Continuez vos achats :<span><a class="return-home" href="index.html"> retourner à la boutique</a><div/>
    `;
    document.querySelector('#purchase-form-container').style.display = "none";
    document.querySelector('.order-summary').style.paddingBottom = "300px"
} else{
     cart.forEach(e => {
        console.log(e);
        const displayCart = document.createElement('tr');
        displayCart.className = "cart-product-infos";
        const quantity = parseInt(e.quantity);
        const price = parseInt(e.price);
        totalPerProduct = quantity*price;
        displayCart.innerHTML = `
            <td class="detail-product">${e.name}</td>
            <td class="detail-product" >${e.id}</td>
            <td class="detail-product">${e.quantity}</td>
            <td class="detail-product">${e.price}</td>
            <td class="detail-product">${totalPerProduct}</td>
        `;
        document.querySelector('#table-products__body').prepend(displayCart);
    });

    const TotalPrice = cart.reduce((acc, curr) => {
        totalPrice = acc + curr.quantity;
    }, 0);
    console.log(totalPrice);

    // Validation du formulaire 

    const form = document.getElementById('purchase-form');

    const validInput = elt => {
        elt.style.border = 'solid 1px green'
        elt.style.boxShadow = '#00800066 0px 0px 4px'
    }
      
    const invalidInput = elt => {
        elt.style.border = 'solid 1px red'
        elt.style.boxShadow = 'rgba(128, 0, 0, 0.4) 0px 0px 4px'
    }
    
    form.email.addEventListener('input', validEmail(this));

    const validEmail = inputEmail => {
        const emailRegExp = new RegExp('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
        const testEmail = emailRegExp.test(inputEmail.value);

        if(testEmail == true){
            validInput(inputEmail)
        }
        else{
            invalidInput(inputEmail)
        }
    }

    const validName = inputName => {
        const NameRegExp = new RegExp('([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*');
        const testName = NameRegExp.test(inputName.value);
    }

    const validZipCode = inputZipCode => {
        const zipCodeRegExp = new RegExp('');
        const testZipCode = zipCodeRegExp.test(inputZipCode.value);
    }

    const validAdress = inputAdress => {
        const adressRegExp = new RegExp('([0-9a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)');
        const testAdress = adressRegExp.test(inputAdress.value);
    }
    
}


