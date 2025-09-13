// ------------------- Products Page -------------------
function loadProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('products');
      if (!container) return;

      data.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${prod.image}" alt="${prod.title}">
          <h3>${prod.title}</h3>
          <p>$${prod.price}</p>
          <button onclick="addToCart(${prod.id}, '${prod.title}', ${prod.price}, '${prod.image}')">Add to Cart</button>
        `;
        container.appendChild(div);
      });
    });
}

// ------------------- Cart Page -------------------
function renderCart() {
  const container = document.getElementById('cart');
  if (!container) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center; font-size:18px; color:#555;">Your cart is empty 🛒</p>`;
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="info">
        <h4>${item.title}</h4>
        <p>$${(item.price * item.quantity).toFixed(2)} (${item.quantity} pcs)</p>
      </div>
      <div class="controls">
        <button onclick="updateQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// ------------------- Shared Functions -------------------
function addToCart(id, title, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, title, price, image, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = "cart.html";  
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function purchase() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Cart purchased successfully! ✅");
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function continueShopping() {
  window.location.href = "product.html";   
}

// ------------------- Auto Load -------------------
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  renderCart();
});
