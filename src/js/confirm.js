
//affichage des produits commandés
const orderId = new URL(location.href).searchParams.get('orderId') || 'ERREUR';
document.getElementById('order-recap').textContent = orderId;
 
const totalPrice = new URL(location.href).searchParams.get('totalPrice ') || 'ERREUR';
document.getElementById('total-price').textContent = totalPrice;



