function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatRUB(n) {
  try {
    return new Intl.NumberFormat('ru-RU').format(n);
  } catch {
    return String(n);
  }
}

async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || 'API error');
  }
  return data;
}

function renderCart(data) {
  const items = data.items || [];
  const itemsEl = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('cart-total-price');
  const totalCountEl = document.getElementById('cart-total-count');

  if (!itemsEl || !totalPriceEl || !totalCountEl) return;

  totalCountEl.textContent = String(data.totalCount || 0);
  totalPriceEl.textContent = `${formatRUB(data.totalPrice || 0)} ₽`;

  itemsEl.innerHTML = '';

  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'cart-empty info-card';
    empty.innerHTML = `
      <h3>Корзина пуста</h3>
      <p style="color: var(--text-light); margin-top: 8px;">Добавьте отели на главной странице.</p>
      <a class="btn btn-primary" href="index.html" style="margin-top: 16px; width: auto;">К выбору отелей</a>
    `;
    itemsEl.appendChild(empty);
    return;
  }

  for (const it of items) {
    const hotel = it.hotel;
    if (!hotel) continue;

    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-image" style="background-image: url('${escapeHtml(hotel.image)}')"></div>
      <div class="cart-item-main">
        <h3>${escapeHtml(hotel.name)}</h3>
        <p class="cart-item-location">🌍 ${escapeHtml(hotel.location)}</p>
        <p class="cart-item-price">
          Цена: от ${escapeHtml(formatRUB(hotel.pricePerNight))} ₽ / ночь
        </p>
        <p class="cart-item-subtotal">Итого: ${escapeHtml(formatRUB(it.lineTotal || 0))} ₽</p>
      </div>
      <div class="cart-item-controls">
        <div class="qty-control" data-hotel-id="${escapeHtml(hotel.id)}">
          <button class="qty-btn" type="button" data-action="dec">-</button>
          <span class="qty-value">${escapeHtml(it.quantity)}</span>
          <button class="qty-btn" type="button" data-action="inc">+</button>
        </div>
        <button class="btn btn-ghost btn-remove" type="button" data-action="remove" data-hotel-id="${escapeHtml(hotel.id)}">
          Удалить
        </button>
      </div>
    `;
    itemsEl.appendChild(el);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const load = async () => {
    const data = await api('/api/cart', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    renderCart(data);
  };

  await load();

  document.body.addEventListener('click', async (e) => {
    const removeBtn = e.target.closest('[data-action="remove"]');
    if (removeBtn) {
      const hotelId = removeBtn.getAttribute('data-hotel-id');
      await fetch(`/api/cart/items/${encodeURIComponent(hotelId)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      await load();
      return;
    }

    const qty = e.target.closest('.qty-control');
    if (!qty) return;

    const hotelId = qty.getAttribute('data-hotel-id');
    const valueEl = qty.querySelector('.qty-value');
    const currentQty = Math.max(1, Math.floor(Number(valueEl.textContent) || 1));

    const action = e.target.getAttribute('data-action');
    let nextQty = currentQty;
    if (action === 'inc') nextQty = currentQty + 1;
    if (action === 'dec') nextQty = currentQty - 1;

    nextQty = Math.max(0, nextQty);

    if (nextQty === 0) {
      await fetch(`/api/cart/items/${encodeURIComponent(hotelId)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } else {
      await api(`/api/cart/items/${encodeURIComponent(hotelId)}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: nextQty }),
      });
    }

    await load();
  });
});

