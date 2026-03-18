const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- Hotels dataset (source of truth for UI + search) ---
const hotels = [
  {
    id: 'burj-al-arab-dubai',
    name: 'Burj Al Arab Dubai',
    location: 'Дубай, ОАЭ',
    stars: 7,
    pricePerNight: 85000,
    image: 'images/ДубайBurjAlArab.jpg',
    description:
      'Легендарный 7-звёздочный отель в форме паруса. Роскошные номера, мировой уровень сервиса, ресторан с 3 звёздами Мишлена.',
    tags: ['All Inclusive', 'Приватный пляж', 'Бассейн'],
    detailsUrl: '/hotel-burj.html',
  },
  {
    id: 'maldives-grand-resort',
    name: 'Maldives Grand Resort',
    location: 'Мальдивы',
    stars: 6,
    pricePerNight: 95000,
    image: 'images/Мальдивы.jpg',
    description:
      'Шикарный курорт на частном острове. Водяные виллы, сноркелинг у самого номера, подводный спа.',
    tags: ['Островной рай', 'Водные спорты', 'Gourmet'],
    detailsUrl: '/hotel-maldives.html',
  },
  {
    id: 'palace-grand-antalya',
    name: 'Palace Grand Antalya',
    location: 'Турция, Анталия',
    stars: 6,
    pricePerNight: 45000,
    image: 'images/ТурцияАнталия.jpg',
    description:
      'Популярный курортный отель с множеством развлечений. Детский клуб, аквапарк, ночные шоу, всё включено.',
    tags: ['SPA & Wellness', 'Развлечения', 'Семейный'],
    detailsUrl: '/hotel-palace-antalya.html',
  },
  {
    id: 'grand-plaza-hotel-cairo',
    name: 'Grand Plaza Hotel Cairo',
    location: 'Египет, Каир',
    stars: 4,
    pricePerNight: 25000,
    image: 'images/ЕгипетХургада.jpg',
    description:
      'Отличное соотношение цены и качества. Удобное расположение, рядом музеи, ресторан и кафе.',
    tags: ['Центр города', 'Трансфер', 'Wi-Fi'],
    detailsUrl: '/hotel-cairo.html',
  },
  {
    id: 'kemer-beach-resort',
    name: 'Kemer Beach Resort',
    location: 'Турция, Кемер',
    stars: 4,
    pricePerNight: 28000,
    image: 'images/GrandHaberАнталия.jpg',
    description:
      'Семейный отель прямо на пляже Средиземного моря. Идеален для семей с детьми.',
    tags: ['Пляж 50м', 'All Inclusive', 'Спортзал'],
    detailsUrl: '/hotel-kemer.html',
  },
  {
    id: 'phuket-sunset-inn',
    name: 'Phuket Sunset Inn',
    location: 'Таиланд, Пхукет',
    stars: 4,
    pricePerNight: 22000,
    image: 'images/Тай Пхукет.jpg',
    description:
      'Уютный отель с аутентичной атмосферой. Традиционная тайская кухня, спа, йога по утрам.',
    tags: ['Вид на закат', 'Thai Cuisine', 'Йога'],
    detailsUrl: '/hotel-phuket.html',
  },
  {
    id: 'economy-plaza-madrid',
    name: 'Economy Plaza Madrid',
    location: 'Испания, Мадрид',
    stars: 3,
    pricePerNight: 12000,
    image: 'images/ИспанияКоста.jpg',
    description:
      'Хороший выбор для туристов, путешествующих на бюджет. Близко к достопримечательностям города.',
    tags: ['Метро рядом', 'Чистые номера', 'Завтрак'],
    detailsUrl: '/hotel-madrid.html',
  },
  {
    id: 'sharm-budget-resort',
    name: 'Sharm Budget Resort',
    location: 'Египет, Шарм-эль-Шейх',
    stars: 3,
    pricePerNight: 15000,
    image: 'images/ХургадаGrandResort.jpg',
    description:
      'Доступный отель с хорошим расположением. Недалеко коралловые рифы для дайвинга.',
    tags: ['Пляж', 'Дайвинг', 'Restaurant'],
    detailsUrl: '/hotel-sharm.html',
  },
  {
    id: 'bangkok-traveler-guesthouse',
    name: 'Bangkok Traveler Guesthouse',
    location: 'Таиланд, Бангкок',
    stars: 2,
    pricePerNight: 8000,
    image: 'images/Дубай ОАЭ.jpg',
    description:
      'Отличный выбор для молодых путешественников. Много туристов, экскурсии, новые друзья.',
    tags: ['Общая кухня', 'Lounge', 'Туры'],
    detailsUrl: '/hotel-bangkok.html',
  },
];

const hotelsById = new Map(hotels.map((h) => [h.id, h]));

// --- Simple in-memory carts ---
const CART_COOKIE_NAME = 'cartId';
const cartStore = new Map(); // cartId -> Map(hotelId -> quantity)

function getCookie(req, name) {
  const raw = req.headers.cookie;
  if (!raw) return null;
  const parts = raw.split(';').map((p) => p.trim());
  const match = parts.find((p) => p.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}

function ensureCart(req, res) {
  let cartId = getCookie(req, CART_COOKIE_NAME);
  if (!cartId) {
    cartId = crypto.randomUUID();
    cartStore.set(cartId, new Map());
    res.setHeader(
      'Set-Cookie',
      `${CART_COOKIE_NAME}=${encodeURIComponent(cartId)}; Path=/; HttpOnly; SameSite=Lax`
    );
  }

  if (!cartStore.has(cartId)) cartStore.set(cartId, new Map());
  return cartId;
}

function cartToResponse(cartId) {
  const cart = cartStore.get(cartId) || new Map();
  const items = [...cart.entries()].map(([hotelId, quantity]) => {
    const hotel = hotelsById.get(hotelId);
    return {
      hotel,
      quantity,
      lineTotal: hotel ? hotel.pricePerNight * quantity : 0,
    };
  });

  const totalCount = items.reduce((sum, it) => sum + (it.quantity || 0), 0);
  const totalPrice = items.reduce((sum, it) => sum + (it.lineTotal || 0), 0);
  return { items, totalCount, totalPrice };
}

// --- API ---
app.get('/api/hotels', (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';
  const minStars = req.query.minStars ? Number(req.query.minStars) : undefined;
  const maxStars = req.query.maxStars ? Number(req.query.maxStars) : undefined;

  let result = hotels.slice();

  if (q) {
    result = result.filter((h) => {
      const text = `${h.name} ${h.location} ${h.tags.join(' ')}`
        .toLowerCase()
        .replace(/\s+/g, ' ');
      return text.includes(q);
    });
  }

  if (Number.isFinite(minStars)) result = result.filter((h) => h.stars >= minStars);
  if (Number.isFinite(maxStars)) result = result.filter((h) => h.stars <= maxStars);

  res.json({ items: result });
});

app.get('/api/cart', (req, res) => {
  const cartId = ensureCart(req, res);
  res.json(cartToResponse(cartId));
});

app.post('/api/cart/items', (req, res) => {
  const cartId = ensureCart(req, res);
  const cart = cartStore.get(cartId);

  const { hotelId, quantity } = req.body || {};
  if (!hotelId || !hotelsById.has(hotelId)) {
    return res.status(400).json({ error: 'Unknown hotelId' });
  }

  const qty = Math.max(1, Math.floor(Number(quantity) || 1));
  const current = cart.get(hotelId) || 0;
  cart.set(hotelId, current + qty);

  res.json(cartToResponse(cartId));
});

app.patch('/api/cart/items/:hotelId', (req, res) => {
  const cartId = ensureCart(req, res);
  const cart = cartStore.get(cartId);

  const { hotelId } = req.params;
  if (!hotelsById.has(hotelId)) return res.status(400).json({ error: 'Unknown hotelId' });

  const { quantity } = req.body || {};
  const qty = Math.floor(Number(quantity));

  if (!Number.isFinite(qty) || qty <= 0) {
    cart.delete(hotelId);
  } else {
    cart.set(hotelId, Math.min(99, qty));
  }

  res.json(cartToResponse(cartId));
});

app.delete('/api/cart/items/:hotelId', (req, res) => {
  const cartId = ensureCart(req, res);
  const cart = cartStore.get(cartId);

  const { hotelId } = req.params;
  if (hotelsById.has(hotelId)) {
    cart.delete(hotelId);
  }

  res.json(cartToResponse(cartId));
});

// --- Static site ---
const siteRoot = path.join(__dirname, 'SonestaTour');
app.use(express.static(siteRoot));

app.get('/', (req, res) => {
  res.sendFile(path.join(siteRoot, 'index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${PORT}`);
});

