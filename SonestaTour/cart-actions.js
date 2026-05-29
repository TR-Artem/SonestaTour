function formatRUB(n) {
  try {
    return new Intl.NumberFormat('ru-RU').format(n);
  } catch {
    return String(n);
  }
}

// LocalStorage-based cart (works without backend)
const CART_STORAGE_KEY = 'sonestaCart';

function getCartFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCartToStorage(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

function getCartSummary() {
  const cart = getCartFromStorage();
  const data = window.SonestaData;
  let totalCount = 0;
  let totalPrice = 0;
  
  cart.forEach(item => {
    let itemData = null;
    if (data) {
      if (data.hotels) itemData = data.hotels.find(h => h.id === item.hotelId);
      if (!itemData && data.tours) itemData = data.tours.find(t => t.id === item.hotelId);
    }
    if (itemData) {
      totalCount += item.quantity || 1;
      totalPrice += (itemData.price || 0) * (item.quantity || 1);
    }
  });
  
  return { totalCount, totalPrice };
}

async function refreshCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;

  try {
    // Try API first
    const res = await fetch('/api/cart', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      el.textContent = String(data.totalCount || 0);
      return;
    }
  } catch {
    // Fallback to localStorage
  }
  
  const summary = getCartSummary();
  el.textContent = String(summary.totalCount || 0);
}

async function addToCart(hotelId, quantity = 1) {
  // Try API first
  try {
    const res = await fetch('/api/cart/items', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hotelId, quantity }),
    });
    
    if (res.ok) {
      await refreshCartCount();
      return;
    }
  } catch {
    // Fallback to localStorage
  }
  
  // LocalStorage fallback
  let cart = getCartFromStorage();
  const existingIndex = cart.findIndex(item => item.hotelId === hotelId);
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
  } else {
    cart.push({ hotelId, quantity, addedAt: Date.now() });
  }
  
  saveCartToStorage(cart);
  await refreshCartCount();
}

function removeFromCart(hotelId) {
  let cart = getCartFromStorage();
  cart = cart.filter(item => item.hotelId !== hotelId);
  saveCartToStorage(cart);
  refreshCartCount();
  return cart;
}

function setButtonTransientState(button, text) {
  const prev = button.textContent;
  button.textContent = text;
  button.disabled = true;
  window.setTimeout(() => {
    button.textContent = prev;
    button.disabled = false;
  }, 1200);
}

function showNotification(message) {
  // Remove existing notification
  const existing = document.querySelector('.cart-notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = message + ' <button onclick="this.parentElement.remove()">×</button>';
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #00a8cc, #0083b0);
    color: white;
    padding: 14px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: slideIn 0.3s ease;
  `;
  
  notification.querySelector('button').style.cssText = `
    background: rgba(255,255,255,0.2);
    border: none;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

document.addEventListener('DOMContentLoaded', () => {
  refreshCartCount();

  document.body.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-action="add-to-cart"]');
    if (!btn) return;

    const hotelId = btn.getAttribute('data-hotel-id');
    if (!hotelId) return;

    try {
      setButtonTransientState(btn, 'Добавлено');
      await addToCart(hotelId);
      showNotification('Отель добавлен в корзину');
    } catch (err) {
      setButtonTransientState(btn, 'Ошибка');
      setTimeout(() => setButtonTransientState(btn, 'В корзину'), 1500);
    }
  });
});
