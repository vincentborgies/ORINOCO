const cart = JSON.parse(window.localStorage.getItem('cart'));

let totalPrice;

const displayEmptyCart = () => {
  document.querySelector('.cart-content').innerHTML = `
    <h1>Votre panier</h1>
    <p>Votre panier est actuellement vide<p>
    <div>
        <span>Continuez vos achats :<span>
        <a class="return-home" href="index.html"> retourner à la boutique</a>
    <div/>`;

  document.querySelector('#purchase-form-container').style.display = 'none';
  document.querySelector('.order-summary').style.paddingBottom = '300px';
};

const displayCart = () => {
  cart.forEach(item => {
    const displayCart = document.createElement('tr');
    displayCart.className = 'cart-product-infos';
    const quantity = parseInt(item.quantity);
    const price = parseInt(item.price);
    totalPerProduct = quantity * price + '€';
    displayCart.innerHTML = `
        <td class="detail-product">${item.name}</td>
        <td class="detail-product" >${item.id}</td>
        <td class="detail-product">${item.quantity}</td>
        <td class="detail-product">${item.color}</td>
        <td class="detail-product">${item.price} €</td>
        <td class="detail-product">${totalPerProduct}</td>
    `;
    document.querySelector('#table-products__body').prepend(displayCart);
  });

  totalPrice = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  document.querySelector('#totalPrice').textContent = `${totalPrice}€`;
};

document.querySelector('#delete-cart__button').addEventListener('click', () => {
  localStorage.removeItem('cart');
  displayEmptyCart();
  alert('les articles du panier ont été supprimés');
});

if (!cart) {
  displayEmptyCart();
}

displayCart();

const inputs = document.querySelectorAll('form input');
const confirmPurchase = document.getElementById('confirm-purchase__button');

inputs.forEach(input => {
  input.addEventListener('change', event => {
    event.target.style.border = '1px solid green';
    event.target.style.boxShadow = '#00800066 0px 0px 4px';
  });

  input.addEventListener('invalid', event => {
    event.target.style.border = '1px solid red';
    event.target.style.boxShadow = 'rgba(128, 0, 0, 0.4) 0px 0px 4px';
  });

//Création de message personnalisé pour une saisie invalide

document.getElementById('firstName').addEventListener('invalid', event => {
  event.target.setCustomValidity("Veuiller rensegner un format correct ex: Jean");
});

document.getElementById('lastName').addEventListener('invalid', event => {
  event.target.setCustomValidity("Veuillez entrer un format correct ex: Dupont");
});

document.getElementById('adress').addEventListener('invalid', event => {
  event.target.setCustomValidity("Veuillez entrer une adresse postable correcte ex: 17 rue de la paix");
});

document.getElementById('zipcode').addEventListener('invalid', event => {
  event.target.setCustomValidity("Veuillez entrer un code postal valide ex: 75000");
});

document.getElementById('email').addEventListener('invalid', event => {
  event.target.setCustomValidity("veuillez entrer une adresse e-mail valide ex: francoisdupont@hotmail.fr");
});

document.getElementById('city').addEventListener('invalid', event => {
  event.target.setCustomValidity("Veuillez entrer un nom de ville correct ex: Paris");
});

const sendOrder = async () => {

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const adress = document.getElementById('adress').value;
  const zipcode = document.getElementById('zipcode').value;
  const email = document.getElementById('email').value;
  const city = document.getElementById('city').value;

  const products = cart.map(item => Array(Number(item.quantity)).fill(item.id)).flat();

  const order = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: adress + ' ' + zipcode,
      city: city,
      email: email,
    },
    products: products,
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(order)
  };


  let response = await fetch('http://localhost:3000/api/teddies/order', requestOptions);
  const data = await response.json();
  console.log(data);
  window.location.href = `confirmation.html?orderId=${data.orderId}&totalPrice=${totalPrice}`;
  localStorage.removeItem('cart');
};

confirmPurchase.addEventListener('submit', sendOrder())