//Définit la nouvelle URL avec l'id du produit choisi
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

//Récupère les données de la nouvelle adresse

const getProductFromId = async idProduct => {
  try {
    let response = await fetch('https://ab-p5-api.herokuapp.com/api/teddies/' + idProduct);
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const productPrice = data.price / 100;

      //Séléctionne le conteneur de la page HTML et ajoute les informations relatives au produit

      document.querySelector('#product-page').innerHTML = `
      <div class="container-product-image">
      <img class="product-page__image" src="${data.imageUrl}"/>
      </div>
      <div class="product-page__infos">
        <h2 class="product-page__infos__title">${data.name}</h2>
        <p class="product-page__infos__ref">Ref: ${data._id}</p>
        <p>${data.description}</p>
        <label class="label-color">
          couleur :
          <select class="select-color">
          <!-- Mes choix de couleurs dans la function forEach --!>
          </select>
        </label>
        <label class="select-quantity">
          Quantité :
          <select class="quantity-choice">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </label>
        <p>Prix : ${productPrice} €</p>
      <div class="add-cart-button-container flex">
        <button class="add-cart-button">Ajouter au panier</button>
      </div>
      </div>`;

      //Création d'une fonction foreach pour afficher mes choix de couleurs

      const choice = document.querySelector('.select-color');

      data.colors.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color;
        choice.appendChild(option);
      });

      // création d'un EventListener sur le bouton "ajouter au panier" qui ajoute le produit au local storage

      const addToCart = document.querySelector('.add-cart-button');
      addToCart.addEventListener('click', () => {
        const cart = JSON.parse(window.localStorage.getItem('cart')) ?? [];
        const numberOfTeddies = document.querySelector('.quantity-choice').value;
        const selectedColor = document.querySelector('.select-color').value;
        const objectProduct = {
          name: data.name,
          id: idProduct,
          quantity: numberOfTeddies,
          color: selectedColor,
          price: productPrice,
        };

        cart.push(objectProduct);

        window.localStorage.setItem('cart', JSON.stringify(cart));

        //alerter l'utilisateur que le produit a bien été ajouté dans le panier
        alert('Ce produit a été ajouté au panier');
      });
    } else {
      console.error('Retour du serveur : ', response.status);
    }
  } catch (e) {
    console.log(e);
  }
};

getProductFromId(id);
