//affichage des produits commandés
const orderId = new URL(location.href).searchParams.get('orderId') || 'ERREUR';
document.getElementById('order-recap').textContent = `Votre numéro de commande: ${orderId}`;

const totalPrice = new URL(location.href).searchParams.get('totalPrice') || 'ERREUR';
document.getElementById('total-price').textContent = `Prix total : ${totalPrice} €`;
