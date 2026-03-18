function formatRUB(n) {
  try {
    return new Intl.NumberFormat('ru-RU').format(n);
  } catch {
    return String(n);
  }
}

async function getCartSummary() {
  const res = await fetch('/api/cart', { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load cart');
  return res.json();
}

async function refreshCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;

  try {
    const data = await getCartSummary();
    el.textContent = String(data.totalCount || 0);
  } catch {
    // Ignore UI-only errors.
  }
}

async function addToCart(hotelId) {
  const res = await fetch('/api/cart/items', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelId, quantity: 1 }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error || 'Failed to add to cart');
  }

  return res.json();
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
      await refreshCartCount();
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err?.message || 'Не удалось добавить в корзину');
    }
  });
});

