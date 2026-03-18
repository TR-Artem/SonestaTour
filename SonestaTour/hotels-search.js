function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function starsToText(stars) {
  const s = Math.max(0, Math.floor(Number(stars) || 0));
  return '★'.repeat(s);
}

function formatRUB(n) {
  try {
    return new Intl.NumberFormat('ru-RU').format(n);
  } catch {
    return String(n);
  }
}

function parseStarsRange(value) {
  // any | "2-3" | "4" | "5-7"
  if (!value || value === 'any') return { minStars: undefined, maxStars: undefined };
  if (value.includes('-')) {
    const [min, max] = value.split('-').map((x) => Number(x));
    return { minStars: min, maxStars: max };
  }
  const stars = Number(value);
  return { minStars: stars, maxStars: stars };
}

function debounce(fn, ms) {
  let t = null;
  return (...args) => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), ms);
  };
}

async function fetchHotels(params) {
  const url = new URL('/api/hotels', window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load hotels');
  return res.json();
}

function renderHotels(list, container) {
  container.innerHTML = '';

  if (!list || list.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'hotels-search-empty';
    empty.textContent = 'Ничего не найдено. Попробуйте изменить запрос или фильтр.';
    container.appendChild(empty);
    return;
  }

  for (const hotel of list) {
    const el = document.createElement('div');
    el.className = 'hotel-card';
    el.innerHTML = `
      <div class="hotel-image" style="background-image: url('${escapeHtml(hotel.image)}')"></div>
      <div class="hotel-stars">${escapeHtml(starsToText(hotel.stars))}</div>
      <h4>${escapeHtml(hotel.name)}</h4>
      <p class="hotel-location">🌍 ${escapeHtml(hotel.location)}</p>
      <div class="hotel-features">
        ${(hotel.tags || []).slice(0, 3).map((t) => `<span class="feature">${escapeHtml(t)}</span>`).join('')}
      </div>
      <p class="hotel-description">${escapeHtml(hotel.description || '')}</p>
      <div class="hotel-price">от ${escapeHtml(formatRUB(hotel.pricePerNight))} ₽ / ночь</div>
      <div class="hotel-actions">
        <button class="btn btn-primary" data-action="add-to-cart" data-hotel-id="${escapeHtml(hotel.id)}">
          В корзину
        </button>
        <a class="btn btn-ghost" href="${escapeHtml(hotel.detailsUrl)}">
          Выбрать
        </a>
      </div>
    `;
    container.appendChild(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hotels-filter-form');
  const input = document.getElementById('hotel-search-input');
  const starsSelect = document.getElementById('hotel-stars-filter');
  const results = document.getElementById('hotels-search-results');

  if (!form || !input || !starsSelect || !results) return;

  const run = async () => {
    const q = input.value.trim();
    const starsRange = parseStarsRange(starsSelect.value);
    const data = await fetchHotels({
      q,
      minStars: starsRange.minStars,
      maxStars: starsRange.maxStars,
    });
    renderHotels(data.items, results);
  };

  const runDebounced = debounce(run, 350);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await run();
  });

  starsSelect.addEventListener('change', () => run());
  input.addEventListener('input', () => runDebounced());

  // Initial render
  run().catch(() => {
    results.innerHTML = '<p class="hotels-search-empty">Не удалось загрузить список отелей.</p>';
  });
});

