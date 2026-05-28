// ===== ДАННЫЕ ТУРИСТИЧЕСКОГО САЙТА =====

// Направления
const destinations = [
    {
        id: 'turkey',
        name: 'Турция',
        country: 'Турция',
        flag: '🇹🇷',
        price: 45000,
        cities: ['Анталия', 'Кемер', 'Бодрум', 'Мармарис', 'Сиде'],
        image: 'images/ТурцияАнталия.jpg',
        description: 'Прекрасные пляжи, древняя история и отличный сервис'
    },
    {
        id: 'egypt',
        name: 'Египет',
        country: 'Египет',
        flag: '🇪🇬',
        price: 55000,
        cities: ['Хургада', 'Шарм-эль-Шейх', 'Каир', 'Марса Алам'],
        image: 'images/ЕгипетХургада.jpg',
        description: 'Красное море, дайвинг и пирамиды'
    },
    {
        id: 'uae',
        name: 'ОАЭ',
        country: 'Объединенные Арабские Эмираты',
        flag: '🇦🇪',
        price: 85000,
        cities: ['Дубай', 'Абу-Даби', 'Шарджа', 'Рас-эль-Хайма'],
        image: 'images/Дубай ОАЭ.jpg',
        description: 'Роскошные отели, шопинг и современные достопримечательности'
    },
    {
        id: 'thailand',
        name: 'Таиланд',
        country: 'Таиланд',
        flag: '🇹🇭',
        price: 95000,
        cities: ['Пхукет', 'Паттайя', 'Самуи', 'Бангкок', 'Краби'],
        image: 'images/Тай Пхукет.jpg',
        description: 'Экзотическая культура, храмы и тропические пляжи'
    },
    {
        id: 'maldives',
        name: 'Мальдивы',
        country: 'Мальдивы',
        flag: '🏝️',
        price: 180000,
        cities: ['Мале', 'Ари Атолл', 'Баа Атолл'],
        image: 'images/Мальдивы.jpg',
        description: 'Райский отдых на белоснежных пляжах'
    },
    {
        id: 'spain',
        name: 'Испания',
        country: 'Испания',
        flag: '🇪🇸',
        price: 75000,
        cities: ['Коста-Брава', 'Коста-дель-Соль', 'Канары', 'Барселона', 'Майорка'],
        image: 'images/ИспанияКоста.jpg',
        description: 'Средиземноморское побережье и богатая культура'
    },
    {
        id: 'greece',
        name: 'Греция',
        country: 'Греция',
        flag: '🇬🇷',
        price: 65000,
        cities: ['Крит', 'Родос', 'Корфу', 'Санторини', 'Афины'],
        image: 'images/Греция.jpg',
        description: 'Древняя история, острова и кристально чистое море'
    },
    {
        id: 'italy',
        name: 'Италия',
        country: 'Италия',
        flag: '🇮🇹',
        price: 80000,
        cities: ['Рим', 'Милан', 'Флоренция', 'Венеция', 'Неаполь'],
        image: 'images/Италия.jpg',
        description: 'Культура, кухня и знаменитые достопримечательности'
    },
    {
        id: 'vietnam',
        name: 'Вьетнам',
        country: 'Вьетнам',
        flag: '🇻🇳',
        price: 70000,
        cities: ['Нячанг', 'Фантхьет', 'Дананг', 'Хойан', 'Фукуок'],
        image: 'images/Вьетнам.jpg',
        description: 'Багато культуры, доступные цены и красивая природа'
    },
    {
        id: 'indonesia',
        name: 'Индонезия',
        country: 'Индонезия',
        flag: '🇮🇩',
        price: 85000,
        cities: ['Бали', 'Ломбок', 'Ява', 'Суматра'],
        image: 'images/Индонезия.jpg',
        description: 'Волшебные храмы, рисовые террасы и отличный серфинг'
    }
];

// Отели
const hotels = [
    {
        id: 'burj-dubai',
        name: 'Burj Al Arab Dubai',
        location: 'Дубай, ОАЭ',
        stars: 7,
        price: 85000,
        category: 'premium',
        images: ['images/ДубайBurjAlArab.jpg', 'images/Дубай ОАЭ.jpg'],
        description: 'Легендарный 7-звёздочный отель в форме паруса. Роскошные номера, мировой уровень сервиса.',
        features: ['🏊 Бассейны', '💆 SPA', '🏖️ Приватный пляж', '🍽️ Рестораны Мишлен', '🚁 Вертолёт-трансфер'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Фитнес', 'Теннис', 'Ресторан', 'Бар', 'Консьерж'],
        roomTypes: [
            { name: 'Deluxe Suite', area: 170, guests: 2, price: 85000 },
            { name: 'Duplex Suite', area: 270, guests: 4, price: 150000 },
            { name: 'Royal Suite', area: 850, guests: 6, price: 280000 }
        ],
        rating: 4.9,
        reviews: 2456
    },
    {
        id: 'maldives-grand',
        name: 'Maldives Grand Resort',
        location: 'Мальдивы',
        stars: 6,
        price: 95000,
        category: 'premium',
        images: ['images/Мальдивы.jpg', 'images/Тай Пхукет.jpg'],
        description: 'Шикарный курорт на частном острове. Водяные виллы, сноркелинг, подводный спа.',
        features: ['🌴 Островной курорт', '🏄 Водные спорт', '🍽️ Gourmet', '🤿 Сноркелинг', '💆 Подводный SPA'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Дайвинг', 'Ресторан', 'Бар', 'Приватный пляж'],
        roomTypes: [
            { name: 'Water Villa', area: 120, guests: 2, price: 95000 },
            { name: 'Deluxe Water Villa', area: 180, guests: 2, price: 140000 },
            { name: 'Presidential Villa', area: 300, guests: 4, price: 250000 }
        ],
        rating: 4.8,
        reviews: 1823
    },
    {
        id: 'palace-antalya',
        name: 'Palace Grand Antalya',
        location: 'Анталия, Турция',
        stars: 6,
        price: 45000,
        category: 'premium',
        images: ['images/ТурцияАнталия.jpg', 'images/GrandHaberАнталия.jpg'],
        description: 'Популярный курортный отель с множеством развлечений. Детский клуб, аквапарк.',
        features: ['💆 SPA', '🎭 Развлечения', '👨‍👩‍👧‍👦 Семейный', '🏊 Аквапарк', '🍽️ All Inclusive'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Детский клуб', 'Аквапарк', 'Ресторан', 'Бар'],
        roomTypes: [
            { name: 'Standard', area: 35, guests: 2, price: 45000 },
            { name: 'Deluxe', area: 50, guests: 3, price: 65000 },
            { name: 'Suite', area: 75, guests: 4, price: 95000 }
        ],
        rating: 4.6,
        reviews: 3241
    },
    {
        id: 'grand-plaza-cairo',
        name: 'Grand Plaza Hotel Cairo',
        location: 'Каир, Египет',
        stars: 4,
        price: 25000,
        category: 'comfort',
        images: ['images/ХургадаGrandResort.jpg', 'images/ЕгипетХургада.jpg'],
        description: 'Отличное соотношение цены и качества. Удобное расположение в центре.',
        features: ['📍 Центр города', '🚕 Трансфер', '📶 Wi-Fi', '🍽️ Завтрак', '🏛️ Рядом пирамиды'],
        amenities: ['Wi-Fi', 'Бассейн', 'Ресторан', 'Бар', 'Трансфер', 'Экскурсии'],
        roomTypes: [
            { name: 'Standard', area: 28, guests: 2, price: 25000 },
            { name: 'Deluxe', area: 40, guests: 2, price: 35000 }
        ],
        rating: 4.3,
        reviews: 1456
    },
    {
        id: 'kemer-beach',
        name: 'Kemer Beach Resort',
        location: 'Кемер, Турция',
        stars: 4,
        price: 28000,
        category: 'comfort',
        images: ['images/GrandHaberАнталия.jpg', 'images/ТурцияАнталия.jpg'],
        description: 'Семейный отель прямо на пляже. Питание включено, много развлечений.',
        features: ['🏖️ Пляж 50м', '🍽️ All Inclusive', '🏋️ Спортзал', '🎉 Анимация', '👨‍👩‍👧‍👦 Для детей'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Фитнес', 'Ресторан', 'Бар', 'Детская площадка'],
        roomTypes: [
            { name: 'Standard', area: 32, guests: 2, price: 28000 },
            { name: 'Deluxe', area: 45, guests: 3, price: 40000 },
            { name: 'Family', area: 55, guests: 4, price: 55000 }
        ],
        rating: 4.4,
        reviews: 2156
    },
    {
        id: 'phuket-sunset',
        name: 'Phuket Sunset Inn',
        location: 'Пхукет, Таиланд',
        stars: 4,
        price: 22000,
        category: 'comfort',
        images: ['images/Тай Пхукет.jpg', 'images/Мальдивы.jpg'],
        description: 'Уютный отель с аутентичной атмосферой. Тайская кухня, спа, йога.',
        features: ['🌅 Вид на закат', '🍜 Thai Cuisine', '🧘 Йога', '💆 СПА', '🏝️ Пляж'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Ресторан', 'Трансфер', 'Экскурсии'],
        roomTypes: [
            { name: 'Standard', area: 30, guests: 2, price: 22000 },
            { name: 'Deluxe', area: 42, guests: 2, price: 32000 },
            { name: 'Suite', area: 60, guests: 3, price: 48000 }
        ],
        rating: 4.5,
        reviews: 1876
    },
    {
        id: 'economy-plaza-madrid',
        name: 'Economy Plaza Madrid',
        location: 'Мадрид, Испания',
        stars: 3,
        price: 12000,
        category: 'budget',
        images: ['images/ИспанияКоста.jpg', 'images/GrandHaberАнталия.jpg'],
        description: 'Хороший выбор для туристов на бюджет. Близко к достопримечательностям.',
        features: ['📍 Метро рядом', '🛏️ Чистые номера', '☕ Завтрак', '🏛️ Центр', '🛍️ Шоппинг'],
        amenities: ['Wi-Fi', 'Завтрак', 'Ресепшн 24/7', 'Камера хранения'],
        roomTypes: [
            { name: 'Single', area: 18, guests: 1, price: 12000 },
            { name: 'Double', area: 25, guests: 2, price: 18000 },
            { name: 'Triple', area: 35, guests: 3, price: 24000 }
        ],
        rating: 4.0,
        reviews: 987
    },
    {
        id: 'sharm-budget',
        name: 'Sharm Budget Resort',
        location: 'Шарм-эль-Шейх, Египет',
        stars: 3,
        price: 15000,
        category: 'budget',
        images: ['images/ХургадаGrandResort.jpg', 'images/ТурцияАнталия.jpg'],
        description: 'Доступный отель с хорошим расположением. Коралловые рифы рядом.',
        features: ['🏖️ Пляж', '🤿 Дайвинг', '🍽️ Restaurant', '🌊 Море', '🐠 Кораллы'],
        amenities: ['Wi-Fi', 'Бассейн', 'Пляж', 'Ресторан', 'Бар', 'Дайвинг-центр'],
        roomTypes: [
            { name: 'Standard', area: 20, guests: 2, price: 15000 },
            { name: 'Sea View', area: 28, guests: 2, price: 22000 },
            { name: 'Superior', area: 35, guests: 3, price: 30000 }
        ],
        rating: 4.1,
        reviews: 1234
    },
    {
        id: 'bangkok-traveler',
        name: 'Bangkok Traveler Guesthouse',
        location: 'Бангкок, Таиланд',
        stars: 2,
        price: 8000,
        category: 'budget',
        images: ['images/Тай Пхукет.jpg', 'images/ИспанияКоста.jpg'],
        description: 'Отличный выбор для молодых путешественников. Много туристов, экскурсии.',
        features: ['👥 Общая кухня', '🧑‍💻 Lounge', '🗺️ Туры', '🎒 Общение', '☕ Чай/кофе'],
        amenities: ['Wi-Fi', 'Общая кухня', 'Lounge', 'Камера хранения', 'Туры'],
        roomTypes: [
            { name: 'Dorm', area: 12, guests: 1, price: 8000 },
            { name: 'Private', area: 16, guests: 2, price: 12000 }
        ],
        rating: 4.2,
        reviews: 654
    },
    {
        id: 'seychelles-paradise',
        name: 'Seychelles Paradise',
        location: 'Сейшелы',
        stars: 5,
        price: 120000,
        category: 'premium',
        images: ['images/Мальдивы.jpg', 'images/ДубайBurjAlArab.jpg'],
        description: 'Роскошный курорт на гранитных валунах с видом на Индийский океан.',
        features: ['🏝️ Частный пляж', '💆 Spa', '🍽️ Fine Dining', '🌊 Infinity pool', '🤿 Сноркелинг'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Ресторан', 'Бар', 'Приватный пляж', 'Яхты'],
        roomTypes: [
            { name: 'Hill Villa', area: 100, guests: 2, price: 120000 },
            { name: 'Beach Villa', area: 150, guests: 2, price: 180000 },
            { name: 'Estate Villa', area: 250, guests: 4, price: 300000 }
        ],
        rating: 4.9,
        reviews: 876
    },
    {
        id: 'greece-santorini',
        name: 'Santorini Luxury Suites',
        location: 'Санторини, Греция',
        stars: 5,
        price: 75000,
        category: 'premium',
        images: ['images/ИспанияКоста.jpg', 'images/Дубай ОАЭ.jpg'],
        description: 'Романтический курорт с видом на кальдеру. Закаты и белоснежные дома.',
        features: ['🌅 Панорама', '🍷 Винный погреб', '💆 Spa', '🏊 Infinity pool', '🍽️ Греческая кухня'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Ресторан', 'Бар', 'Трансфер'],
        roomTypes: [
            { name: 'Cave Suite', area: 45, guests: 2, price: 75000 },
            { name: 'Caldera View', area: 65, guests: 2, price: 110000 },
            { name: 'Honeymoon Suite', area: 90, guests: 2, price: 150000 }
        ],
        rating: 4.8,
        reviews: 1567
    },
    {
        id: 'vietnam-nha-trang',
        name: 'Nha Trang Beach Resort',
        location: 'Нячанг, Вьетнам',
        stars: 4,
        price: 18000,
        category: 'comfort',
        images: ['images/Тай Пхукет.jpg', 'images/ХургадаGrandResort.jpg'],
        description: 'Современный курорт на песчаном пляже. Подходит для семей и дайверов.',
        features: ['🏖️ Пляж', '🤿 Дайвинг', '🍽️ Buffet', '👨‍👩‍👧‍👦 Family', '💆 Spa'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Дайвинг', 'Ресторан', 'Бар', 'Детский клуб'],
        roomTypes: [
            { name: 'Superior', area: 32, guests: 2, price: 18000 },
            { name: 'Deluxe', area: 45, guests: 2, price: 26000 },
            { name: 'Family Suite', area: 60, guests: 4, price: 42000 }
        ],
        rating: 4.4,
        reviews: 2134
    },
    {
        id: 'oriental-bangkok',
        name: 'The Oriental Bangkok',
        location: 'Бангкок, Таиланд',
        stars: 5,
        price: 55000,
        category: 'premium',
        images: ['images/Тай Пхукет.jpg', 'images/Дубай ОАЭ.jpg'],
        description: 'Легендарный отель на берегу реки Чао Прайя. Лучший сервис с 1876 года.',
        features: ['🏛️ Исторический', '🍽️ Fine Dining', '💆 Spa', '🛥️ Трансфер на лодке', '🎭 Тайский массаж'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Фитнес', 'Ресторан', 'Бар'],
        roomTypes: [
            { name: 'Deluxe', area: 40, guests: 2, price: 55000 },
            { name: 'Premium River View', area: 55, guests: 2, price: 75000 },
            { name: 'Siam Suite', area: 85, guests: 3, price: 120000 }
        ],
        rating: 4.8,
        reviews: 3245
    },
    {
        id: 'amalfi-positano',
        name: 'Le Sirenuse Positano',
        location: 'Позитано, Италия',
        stars: 5,
        price: 95000,
        category: 'premium',
        images: ['images/Италия.jpg', 'images/ИспанияКоста.jpg'],
        description: 'Романтический бутик-отель на скалах Амальфи. Вид на Лигурийское море.',
        features: ['🌅 Панорамный вид', '🍷 Винный погреб', '💆 Spa', '🏊 Infinity pool', '🍽️ Итальянская кухня'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Ресторан', 'Бар', 'Трансфер'],
        roomTypes: [
            { name: 'Classic', area: 25, guests: 2, price: 95000 },
            { name: 'Superior', area: 35, guests: 2, price: 130000 },
            { name: 'Junior Suite', area: 50, guests: 2, price: 180000 }
        ],
        rating: 4.9,
        reviews: 1567
    },
    {
        id: 'bali-mandapa',
        name: 'Mandapa Ritz-Carlton Bali',
        location: 'Убуд, Индонезия',
        stars: 5,
        price: 85000,
        category: 'premium',
        images: ['images/Индонезия.jpg', 'images/Мальдивы.jpg'],
        description: 'Роскошный курорт в джунглях Бали с видом на рисовые террасы и храмы.',
        features: ['🌾 Rice Terrace View', '💆 Spa', '🏊 Infinity pool', '🧘 Yoga', '🍽️ Indonesian Cuisine'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Фитнес', 'Ресторан', 'Бар', 'Детский клуб'],
        roomTypes: [
            { name: 'Garden Villa', area: 100, guests: 2, price: 85000 },
            { name: 'Pool Villa', area: 150, guests: 2, price: 140000 },
            { name: 'One Bedroom Residence', area: 200, guests: 3, price: 220000 }
        ],
        rating: 4.9,
        reviews: 2345
    },
    {
        id: 'hurghada-marriott',
        name: 'Marriott Beach Resort Hurghada',
        location: 'Хургада, Египет',
        stars: 5,
        price: 35000,
        category: 'comfort',
        images: ['images/ЕгипетХургада.jpg', 'images/ХургадаGrandResort.jpg'],
        description: 'Отличный курорт для дайверов и любителей Красного моря.',
        features: ['🏖️ Приватный пляж', '🤿 Дайвинг-центр', '🍽️ All Inclusive', '🏊 Бассейны', '🎉 Анимация'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Дайвинг', 'Ресторан', 'Бар', 'Водные виды спорта'],
        roomTypes: [
            { name: 'Standard', area: 35, guests: 2, price: 35000 },
            { name: 'Pool Access', area: 45, guests: 2, price: 48000 },
            { name: 'Family Room', area: 60, guests: 4, price: 65000 }
        ],
        rating: 4.5,
        reviews: 2876
    },
    {
        id: 'cuba-varadero',
        name: 'Iberostar Bella Vista',
        location: 'Варадеро, Куба',
        stars: 5,
        price: 55000,
        category: 'comfort',
        images: ['images/Мальдивы.jpg', 'images/ЕгипетХургада.jpg'],
        description: 'Современный курорт на лучшем пляже Кубы. Тропический рай с кубинским колоритом.',
        features: ['🏖️ Пляж 5⭐', '🍽️ 8 ресторанов', '💆 Spa', '🌴 Tropical Garden', '🎭 Живая музыка'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Теннис', 'Ресторан', 'Бар', 'Ночной клуб'],
        roomTypes: [
            { name: 'Standard', area: 35, guests: 2, price: 55000 },
            { name: 'Club Room', area: 45, guests: 2, price: 72000 },
            { name: 'Junior Suite', area: 65, guests: 4, price: 95000 }
        ],
        rating: 4.6,
        reviews: 1987
    },
    {
        id: 'dubai-atlantis',
        name: 'Atlantis The Palm Dubai',
        location: 'Дубай, ОАЭ',
        stars: 5,
        price: 75000,
        category: 'premium',
        images: ['images/Дубай ОАЭ.jpg', 'images/ДубайBurjAlArab.jpg'],
        description: 'Знаменитый отель на полумесяце Палм. Крупнейший аквапарк и океанариум.',
        features: ['🏊 Аквапарк', '🐬 Океанариум', '🍽️ 23 ресторана', '🌊 Аквадорожки', '🎰 Казино'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Дайвинг', 'Ресторан', 'Бар', 'Аквапарк'],
        roomTypes: [
            { name: 'City View', area: 45, guests: 2, price: 75000 },
            { name: 'Palm View', area: 55, guests: 2, price: 100000 },
            { name: 'Atlantis Suite', area: 100, guests: 4, price: 200000 }
        ],
        rating: 4.7,
        reviews: 4532
    },
    {
        id: 'mexico-cancun',
        name: 'Hyatt Ziva Cancun',
        location: 'Канкун, Мексика',
        stars: 5,
        price: 58000,
        category: 'comfort',
        images: ['images/Мальдивы.jpg', 'images/Тай Пхукет.jpg'],
        description: 'Ультра-all-inclusive курорт на Карибском побережье с видом на океан.',
        features: ['🏖️ Карибский пляж', '🍽️ Unlimited Dining', '💆 Talasian Spa', '🏊 Swim-up бар', '👨‍👩‍👧‍👦 Family'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Фитнес', 'Ресторан', 'Бар', 'Детский клуб'],
        roomTypes: [
            { name: 'Deluxe Ocean', area: 40, guests: 2, price: 58000 },
            { name: 'Club Ocean', area: 55, guests: 2, price: 80000 },
            { name: 'Presidential Suite', area: 120, guests: 4, price: 150000 }
        ],
        rating: 4.6,
        reviews: 3214
    },
    {
        id: 'kenya-diani',
        name: 'Diani Reef Beach Resort',
        location: 'Диани Бич, Кения',
        stars: 4,
        price: 45000,
        category: 'comfort',
        images: ['images/Мальдивы.jpg', 'images/Индонезия.jpg'],
        description: 'Курорт на берегу Индийского океана. Ворота в африканское сафари.',
        features: ['🏖️ Приватный пляж', '🚁 Сафари', '🤿 Сноркелинг', '🐢 Черепахи', '🌴 Масаи Марра'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Дайвинг', 'Ресторан', 'Бар', 'Экскурсии'],
        roomTypes: [
            { name: 'Standard', area: 30, guests: 2, price: 45000 },
            { name: 'Ocean View', area: 45, guests: 2, price: 60000 },
            { name: 'Suite', area: 70, guests: 4, price: 90000 }
        ],
        rating: 4.4,
        reviews: 1234
    },
    {
        id: 'maldives-soneva',
        name: 'Soneva Fushi Resort',
        location: 'Мальдивы',
        stars: 6,
        price: 200000,
        category: 'premium',
        images: ['images/Мальдивы.jpg', 'images/Дубай ОАЭ.jpg'],
        description: 'Уникальный эко-курорт без пластика. Лучшие водяные виллы и астрономия.',
        features: ['🌿 Zero Waste', '🔭 Обсерватория', '🏊 Частный остров', '🍽️ Fresh Cuisine', '🌙 Astronomy'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Дайвинг', 'Ресторан', 'Бар', 'Кино под открытым небом'],
        roomTypes: [
            { name: 'Crusoe Suite', area: 150, guests: 2, price: 200000 },
            { name: 'Soneva Fushi Villa', area: 200, guests: 2, price: 280000 },
            { name: 'Private Reserve', area: 400, guests: 6, price: 550000 }
        ],
        rating: 5.0,
        reviews: 876
    },
    {
        id: 'turkey-bodrum',
        name: 'Metres Hotel Bodrum',
        location: 'Бодрум, Турция',
        stars: 5,
        price: 38000,
        category: 'comfort',
        images: ['images/ТурцияАнталия.jpg', 'images/GrandHaberАнталия.jpg'],
        description: 'Модный бутик-отель на Эгейском побережье с яхтенным причалом.',
        features: ['⛵ Яхтенный клуб', '🌊 Infinity pool', '🍽️ Seafood', '🌅 Sunset Bar', '🧴 Beach Club'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Яхты', 'Ресторан', 'Бар', 'Водные виды спорта'],
        roomTypes: [
            { name: 'Boutique Room', area: 30, guests: 2, price: 38000 },
            { name: 'Sea View', area: 45, guests: 2, price: 52000 },
            { name: 'Suite with Pool', area: 70, guests: 3, price: 85000 }
        ],
        rating: 4.6,
        reviews: 1654
    },
    {
        id: 'greece-mykonos',
        name: 'Mykonos Grand Hotel',
        location: 'Миконос, Греция',
        stars: 5,
        price: 68000,
        category: 'premium',
        images: ['images/Греция.jpg', 'images/ИспанияКоста.jpg'],
        description: 'Роскошный курорт с видом на Эгейское море и знаменитые ветряные мельницы острова.',
        features: ['🌅 Aegean Views', '🏊 Infinity pool', '💆 Spa', '🍽️ Greek Fine Dining', '🏖️ Mykonos Beach'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Фитнес', 'Ресторан', 'Бар', 'Трансфер'],
        roomTypes: [
            { name: 'Deluxe', area: 35, guests: 2, price: 68000 },
            { name: 'Sea View Suite', area: 55, guests: 2, price: 95000 },
            { name: 'Master Suite', area: 85, guests: 4, price: 140000 }
        ],
        rating: 4.8,
        reviews: 2123
    },
    {
        id: 'spain-ibiza',
        name: 'Seven Pines Pure Club Ibiza',
        location: 'Ибица, Испания',
        stars: 5,
        price: 82000,
        category: 'premium',
        images: ['images/ИспанияКоста.jpg', 'images/Греция.jpg'],
        description: 'Бутик-курорт на скалах с видом на закат. Идеален для романтического отдыха.',
        features: ['🌅 Sunset Views', '🏊 Cliff pool', '💆 Spa', '🍽️ Mediterranean', '🥂 Pure Club'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Фитнес', 'Ресторан', 'Бар', 'Консьерж'],
        roomTypes: [
            { name: 'Terrace Room', area: 40, guests: 2, price: 82000 },
            { name: 'Pool Suite', area: 60, guests: 2, price: 120000 },
            { name: 'Villa', area: 120, guests: 4, price: 200000 }
        ],
        rating: 4.9,
        reviews: 1432
    },
    {
        id: 'morocco-marrakech',
        name: 'Royal Mansour Marrakech',
        location: 'Марракеш, Марокко',
        stars: 5,
        price: 110000,
        category: 'premium',
        images: ['images/Дубай ОАЭ.jpg', 'images/Италия.jpg'],
        description: 'Роскошный риад в центре старого города с традиционной марокканской архитектурой.',
        features: ['🏛️ Riad Style', '💆 Hammam', '🍽️ Moroccan Cuisine', '🌺 Courtyard pool', '🛍️ Medina'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Hammam', 'Ресторан', 'Бар', 'Персональный дворецкий'],
        roomTypes: [
            { name: 'Chambre', area: 45, guests: 2, price: 110000 },
            { name: 'Suite', area: 65, guests: 2, price: 165000 },
            { name: 'Private Residence', area: 200, guests: 4, price: 350000 }
        ],
        rating: 4.9,
        reviews: 1876
    },
    {
        id: 'colombia-cartagena',
        name: 'Sofitel Legend Santa Clara',
        location: 'Картахена, Колумбия',
        stars: 5,
        price: 48000,
        category: 'comfort',
        images: ['images/ЕгипетХургада.jpg', 'images/Мальдивы.jpg'],
        description: 'Исторический отель в колониальном здании с видом на Карибское море.',
        features: ['🏛️ Colonial Heritage', '💆 Spa', '🌊 Rooftop pool', '🍽️ Fusion Cuisine', '🛍️ Old Town'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Фитнес', 'Ресторан', 'Бар', 'Экскурсии'],
        roomTypes: [
            { name: 'Classic', area: 30, guests: 2, price: 48000 },
            { name: 'Ocean View', area: 45, guests: 2, price: 65000 },
            { name: 'Grand Suite', area: 80, guests: 3, price: 110000 }
        ],
        rating: 4.6,
        reviews: 1654
    },
    {
        id: 'brazil-rio',
        name: 'Belmond Copacabana Palace',
        location: 'Рио-де-Жанейро, Бразилия',
        stars: 5,
        price: 95000,
        category: 'premium',
        images: ['images/Мальдивы.jpg', 'images/Дубай ОАЭ.jpg'],
        description: 'Культовый отель на пляже Копакабана с видом на статую Христа.',
        features: ['🏖️ Copacabana Beach', '💆 Spa', '🎾 Tennis', '🍽️ Fine Dining', '🎭 Jazz Club'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Теннис', 'Ресторан', 'Бар', 'Персональный консьерж'],
        roomTypes: [
            { name: 'Deluxe', area: 40, guests: 2, price: 95000 },
            { name: 'Ocean Suite', area: 65, guests: 2, price: 150000 },
            { name: 'Penthouse', area: 150, guests: 4, price: 350000 }
        ],
        rating: 4.8,
        reviews: 2876
    },
    {
        id: 'japan-kyoto',
        name: 'Aman Kyoto',
        location: 'Киото, Япония',
        stars: 5,
        price: 150000,
        category: 'premium',
        images: ['images/Италия.jpg', 'images/Тай Пхукет.jpg'],
        description: 'Уединённый курорт в бамбуковом лесу с традиционными японскими ваннами.',
        features: ['🎋 Bamboo Forest', '⛩️ Onsen', '🍵 Tea Ceremony', '🍽️ Kaiseki', '🌸 Zen Garden'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Onsen', 'Ресторан', 'Трансфер', 'Туры'],
        roomTypes: [
            { name: 'Forest Room', area: 50, guests: 2, price: 150000 },
            { name: 'Pavilion', area: 80, guests: 2, price: 220000 },
            { name: 'Kinmasa Suite', area: 120, guests: 4, price: 380000 }
        ],
        rating: 4.9,
        reviews: 1234
    },
    {
        id: 'kenya-maasai',
        name: 'Singita Sasalance Lodge',
        location: 'Масай Мара, Кения',
        stars: 5,
        price: 180000,
        category: 'premium',
        images: ['images/Мальдивы.jpg', 'images/Индонезия.jpg'],
        description: 'Лагерь-люкс в заповеднике с видом на миграцию антилоп гну.',
        features: ['🦁 Сафари', '🐘 Elephant', '🏕️ Luxury Tents', '🍽️ Bush Dining', '🌅 Sundowner'],
        amenities: ['Wi-Fi', 'SPA', 'Бассейн', 'Экскурсии', 'Ресторан', 'Бар'],
        roomTypes: [
            { name: 'Suite Tent', area: 100, guests: 2, price: 180000 },
            { name: 'Family Suite', area: 150, guests: 4, price: 280000 },
            { name: 'Private Villa', area: 250, guests: 6, price: 450000 }
        ],
        rating: 5.0,
        reviews: 654
    },
    {
        id: 'iceland-blue-lagoon',
        name: 'Retreat at Blue Lagoon',
        location: 'Исландия',
        stars: 5,
        price: 200000,
        category: 'premium',
        images: ['images/Италия.jpg', 'images/ИспанияКоста.jpg'],
        description: 'Геотермальный курорт с приватным доступом в Blue Lagoon и видом на вулканы.',
        features: ['♨️ Blue Lagoon', '🌋 Lava Fields', '💆 Spa', '🍽️ Michelin Dining', '🌌 Northern Lights'],
        amenities: ['Wi-Fi', 'SPA', 'Blue Lagoon', 'Ресторан', 'Бар', 'Snorkeling'],
        roomTypes: [
            { name: 'Suite', area: 70, guests: 2, price: 200000 },
            { name: 'Ritual Suite', area: 100, guests: 2, price: 280000 },
            { name: 'The Retreat Villa', area: 200, guests: 4, price: 450000 }
        ],
        rating: 4.9,
        reviews: 987
    },
    {
        id: 'mexico-tulum',
        name: 'Be Tulum Hotel',
        location: 'Тулум, Мексика',
        stars: 4,
        price: 45000,
        category: 'comfort',
        images: ['images/Мальдивы.jpg', 'images/Тай Пхукет.jpg'],
        description: 'Бутик-отель на побережье Карибов с пирамидами майя в джунглях.',
        features: ['🏖️ Caribbean Coast', '🏛️ Mayan Ruins', '🍽️ Farm-to-table', '🚲 Yoga', '🐢 Sea Turtles'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Ресторан', 'Бар', 'Туры'],
        roomTypes: [
            { name: 'Jungle Suite', area: 40, guests: 2, price: 45000 },
            { name: 'Ocean Suite', area: 55, guests: 2, price: 65000 },
            { name: 'Pool Villa', area: 90, guests: 3, price: 110000 }
        ],
        rating: 4.7,
        reviews: 1567
    },
    {
        id: 'philippines-palawan',
        name: 'Amanpulo Resort',
        location: 'Палаван, Филиппины',
        stars: 5,
        price: 165000,
        category: 'premium',
        images: ['images/Мальдивы.jpg', 'images/Тай Пхукет.jpg'],
        description: 'Частный остров с белоснежными пляжами. Лучший дайвинг в Азии.',
        features: ['🏝️ Private Island', '🤿 World-class Diving', '💆 Spa', '🍽️ Beach Dining', '🐠 Coral Reef'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Дайвинг', 'Ресторан', 'Бар', 'Яхты'],
        roomTypes: [
            { name: 'Cebu Villa', area: 120, guests: 2, price: 165000 },
            { name: 'Beach Villa', area: 160, guests: 2, price: 220000 },
            { name: 'One Bedroom Suite', area: 250, guests: 4, price: 350000 }
        ],
        rating: 4.9,
        reviews: 876
    },
    {
        id: 'mauritius-saint-geran',
        name: 'One&Only Le Saint Geran',
        location: 'Маврикий',
        stars: 5,
        price: 130000,
        category: 'premium',
        images: ['images/Мальдивы.jpg', 'images/Дубай ОАЭ.jpg'],
        description: 'Роскошный курорт на острове Маврикий с коралловыми рифами.',
        features: ['🏖️ Private Beach', '🤿 Snorkeling', '⛳ Golf', '💆 Spa', '🍽️ French Cuisine'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Гольф', 'Ресторан', 'Бар', 'Водные виды спорта'],
        roomTypes: [
            { name: 'Garden Suite', area: 80, guests: 2, price: 130000 },
            { name: 'Ocean Suite', area: 110, guests: 2, price: 180000 },
            { name: 'Private Villa', area: 200, guests: 4, price: 300000 }
        ],
        rating: 4.8,
        reviews: 1432
    },
    {
        id: 'madagascar-ikonina',
        name: 'Ikonina Lodge',
        location: 'Носк Беш, Мадагаскар',
        stars: 4,
        price: 35000,
        category: 'comfort',
        images: ['images/Мальдивы.jpg', 'images/Индонезия.jpg'],
        description: 'Уникальный эко-лагерь рядом с национальным парком Исоло.',
        features: ['🦎 Лемуры', '🌿 Дождевые леса', '🐛 Экскурсии', '🍽️ Creole Cuisine', '🌴 Beach'],
        amenities: ['Wi-Fi', 'Бассейн', 'SPA', 'Экскурсии', 'Ресторан', 'Бар'],
        roomTypes: [
            { name: 'Eco Lodge', area: 25, guests: 2, price: 35000 },
            { name: 'Forest Suite', area: 45, guests: 2, price: 50000 },
            { name: 'Family Bungalow', area: 60, guests: 4, price: 75000 }
        ],
        rating: 4.5,
        reviews: 567
    }
];

// Туры
const tours = [
    {
        id: 'turkey-antalya-7',
        name: 'Турция, Анталия',
        hotel: 'Grand Kemer 5*',
        destination: 'turkey',
        duration: 7,
        nutrition: 'All Inclusive',
        price: 65000,
        discount: 25,
        oldPrice: 87000,
        image: 'images/GrandHaberАнталия.jpg',
        description: 'Незабываемый отдых на побережье Средиземного моря',
        highlights: ['Отель 5*', 'Пляж', 'Бассейн', 'Анимация'],
        hot: true,
        rating: 4.6
    },
    {
        id: 'egypt-hurghada-10',
        name: 'Египет, Хургада',
        hotel: 'Grand Resort 5*',
        destination: 'egypt',
        duration: 10,
        nutrition: 'All Inclusive',
        price: 59500,
        discount: 30,
        oldPrice: 85000,
        image: 'images/ХургадаGrandResort.jpg',
        description: 'Отдых на Красном море с дайвингом и экскурсиями',
        highlights: ['Отель 5*', 'Дайвинг', 'SPA', 'Экскурсии'],
        hot: true,
        rating: 4.5
    },
    {
        id: 'uae-dubai-5',
        name: 'ОАЭ, Дубай',
        hotel: 'Burj Al Arab 7*',
        destination: 'uae',
        duration: 5,
        nutrition: 'Завтрак',
        price: 96000,
        discount: 20,
        oldPrice: 120000,
        image: 'images/ДубайBurjAlArab.jpg',
        description: 'Роскошный отдых в легендарном отеле',
        highlights: ['7* отель', 'VIP сервис', 'Трансфер', 'Шоппинг'],
        hot: true,
        rating: 4.9
    },
    {
        id: 'maldives-7',
        name: 'Мальдивы',
        hotel: 'Maldives Grand 6*',
        destination: 'maldives',
        duration: 7,
        nutrition: 'Полный пансион',
        price: 175000,
        discount: 15,
        oldPrice: 206000,
        image: 'images/Мальдивы.jpg',
        description: 'Рай на земле с водными виллами',
        highlights: ['Водные виллы', 'Сноркелинг', 'Приватный остров', 'SPA'],
        hot: false,
        rating: 4.8
    },
    {
        id: 'thailand-phuket-10',
        name: 'Таиланд, Пхукет',
        hotel: 'Phuket Sunset 4*',
        destination: 'thailand',
        duration: 10,
        nutrition: 'Завтрак',
        price: 72000,
        discount: 10,
        oldPrice: 80000,
        image: 'images/Тай Пхукет.jpg',
        description: 'Тропический рай с храмами и пляжами',
        highlights: ['Отель 4*', 'Трансферы', 'Обзорная экскурсия'],
        hot: false,
        rating: 4.4
    },
    {
        id: 'spain-costa-14',
        name: 'Испания, Коста дель Соль',
        hotel: 'Beach Resort 4*',
        destination: 'spain',
        duration: 14,
        nutrition: 'Half Board',
        price: 85000,
        discount: 10,
        oldPrice: 94500,
        image: 'images/ИспанияКоста.jpg',
        description: 'Европейский отдых с культурными экскурсиями',
        highlights: ['Отель 4*', 'Экскурсии', 'Пляж', 'Кухня'],
        hot: false,
        rating: 4.3
    },
    {
        id: 'greece-crete-7',
        name: 'Греция, Крит',
        hotel: 'Crete Palace 5*',
        destination: 'greece',
        duration: 7,
        nutrition: 'All Inclusive',
        price: 78000,
        discount: 20,
        oldPrice: 97500,
        image: 'images/Греция.jpg',
        description: 'Древняя история и кристальное море',
        highlights: ['Отель 5*', 'Исторические экскурсии', 'Пляж'],
        hot: false,
        rating: 4.5
    },
    {
        id: 'vietnam-nha-trang-10',
        name: 'Вьетнам, Нячанг',
        hotel: 'Nha Trang Resort 4*',
        destination: 'vietnam',
        duration: 10,
        nutrition: 'Завтрак',
        price: 55000,
        discount: 15,
        oldPrice: 65000,
        image: 'images/Вьетнам.jpg',
        description: 'Азиатская экзотика по доступной цене',
        highlights: ['Отель 4*', 'Пляж', 'SPA', 'Экскурсии'],
        hot: true,
        rating: 4.3
    },
    {
        id: 'italy-rome-7',
        name: 'Италия, Рим',
        hotel: 'Rome Grand Hotel 4*',
        destination: 'italy',
        duration: 7,
        nutrition: 'Завтрак',
        price: 95000,
        discount: 5,
        oldPrice: 100000,
        image: 'images/Италия.jpg',
        description: 'Классический тур по вечному городу',
        highlights: ['Отель 4*', 'Экскурсии', 'Музеи', 'Кухня'],
        hot: false,
        rating: 4.6
    },
    {
        id: 'indonesia-bali-10',
        name: 'Индонезия, Бали',
        hotel: 'Bali Paradise 5*',
        destination: 'indonesia',
        duration: 10,
        nutrition: 'Завтрак',
        price: 95000,
        discount: 10,
        oldPrice: 105500,
        image: 'images/Индонезия.jpg',
        description: 'Духовные храмы и тропические пляжи',
        highlights: ['Отель 5*', 'Храмы', 'Террасы', 'SPA'],
        hot: false,
        rating: 4.7
    }
];

// Круизы
const cruises = [
    {
        id: 'mediterranean-7',
        name: 'Средиземноморский круиз',
        company: 'Costa Cruises',
        ship: 'Costa Diadema',
        route: 'Италия - Испания - Франция - Монако',
        ports: ['Генуя', 'Чивитвеккья (Рим)', 'Пальма', 'Марсель', 'Монако'],
        duration: 7,
        departureDate: '2026-06-15',
        price: 85000,
        oldPrice: 105000,
        discount: 19,
        image: 'images/Италия.jpg',
        description: 'Классический маршрут по лучшим средиземноморским городам',
        features: ['Все питание включено', 'Развлечения на борту', 'Бассейны', 'Спа', 'Театр'],
        cabinTypes: ['Внутренняя', 'С видом на море', 'С балконом', 'Люкс'],
        rating: 4.5
    },
    {
        id: 'dubai-gulf-5',
        name: 'Круиз по Персидскому заливу',
        company: 'AIDA Cruises',
        ship: 'AIDAstella',
        route: 'ОАЭ - Катар - Оман',
        ports: ['Дубай', 'Доха', 'Маскат'],
        duration: 5,
        departureDate: '2026-11-20',
        price: 65000,
        oldPrice: 78000,
        discount: 17,
        image: 'images/Дубай ОАЭ.jpg',
        description: 'Современные мегалополисы и древняя культура Востока',
        features: ['Все питание включено', 'Бесплатный Wi-Fi', 'Спортпалуба', 'Рестораны'],
        cabinTypes: ['Внутренняя', 'С видом на море', 'Балкон'],
        rating: 4.4
    },
    {
        id: 'norway-fjords-10',
        name: 'Фьорды Норвегии',
        company: 'Hurtigruten',
        ship: 'MS Polarlys',
        route: 'Берген - Гейрангер - Тромсе',
        ports: ['Берген', 'Флом', 'Гейрангер', 'Molde', 'Тромсе'],
        duration: 10,
        departureDate: '2026-07-10',
        price: 145000,
        oldPrice: 170000,
        discount: 15,
        image: 'images/ИспанияКоста.jpg',
        description: 'Живописные пейзажи и северное сияние',
        features: ['Полный пансион', 'Экскурсии', 'Гид', 'Научная программа'],
        cabinTypes: ['Арктическая', 'Улучшенная', 'Экспедиционная'],
        rating: 4.8
    },
    {
        id: 'caribbean-14',
        name: 'Карибский круиз',
        company: 'Royal Caribbean',
        ship: 'Wonder of the Seas',
        route: 'Ямайка - Каймановы острова - Багамы',
        ports: ['Форт-Лодердейл', 'Очо-Риос', 'Джорджтаун', 'Нассау'],
        duration: 14,
        departureDate: '2026-12-20',
        price: 120000,
        oldPrice: 150000,
        discount: 20,
        image: 'images/Мальдивы.jpg',
        description: 'Тропические острова и белоснежные пляжи',
        features: ['Все включено Premium', 'Аквапарк', 'Казино', 'Бортовой парк'],
        cabinTypes: ['Внутренняя', 'С видом на море', 'Балкон', 'Сьют'],
        rating: 4.7
    },
    {
        id: 'japan-8',
        name: 'Круиз Японские острова',
        company: 'Princess Cruises',
        ship: 'Diamond Princess',
        route: 'Токио - Киото - Осака',
        ports: ['Токио', 'Йокогама', 'Осака', 'Кобе', 'Нагоя'],
        duration: 8,
        departureDate: '2026-04-05',
        price: 110000,
        oldPrice: 130000,
        discount: 15,
        image: 'images/Тай Пхукет.jpg',
        description: 'Цветение сакуры и современные мегалополисы',
        features: ['Полный пансион', 'Культурная программа', 'Онсен', 'Тематические рестораны'],
        cabinTypes: ['Внутренняя', 'С видом на море', 'Мини-сьют', 'Балкон'],
        rating: 4.9
    },
    {
        id: 'seychelles-7',
        name: 'Сейшельские острова',
        company: 'The Moorings',
        ship: 'Katana',
        route: 'Маэ - Праслен - Ла-Диг',
        ports: ['Маэ', 'Праслен', 'Ла-Диг', 'Курон'],
        duration: 7,
        departureDate: '2026-09-12',
        price: 180000,
        oldPrice: 220000,
        discount: 18,
        image: 'images/Мальдивы.jpg',
        description: 'Яхтенный круиз по райским островам',
        features: ['Яхта с экипажем', 'Приватные пляжи', 'Сноркелинг', 'Gourmet ужины'],
        cabinTypes: ['Каюта', 'Каюта делюкс', 'Приватная яхта'],
        rating: 4.9
    }
];

// Авиабилеты
const flights = [
    {
        id: 'moscow-antalya',
        from: 'Москва (SVO)',
        to: 'Анталия (AYT)',
        airline: 'Aeroflot',
        departureTime: '08:30',
        arrivalTime: '12:45',
        duration: '4ч 15м',
        departureDate: '2026-06-15',
        price: 18500,
        oldPrice: 24000,
        discount: 23,
        stops: 'Прямой',
        aircraft: 'Boeing 737',
        image: 'images/ТурцияАнталия.jpg'
    },
    {
        id: 'spb-dubai',
        from: 'Санкт-Петербург (LED)',
        to: 'Дубай (DXB)',
        airline: 'Emirates',
        departureTime: '14:20',
        arrivalTime: '22:30',
        duration: '6ч 10м',
        departureDate: '2026-06-20',
        price: 42000,
        oldPrice: 55000,
        discount: 24,
        stops: 'Прямой',
        aircraft: 'Airbus A380',
        image: 'images/Дубай ОАЭ.jpg'
    },
    {
        id: 'moscow-hurghada',
        from: 'Москва (DME)',
        to: 'Хургада (HRG)',
        airline: 'EgyptAir',
        departureTime: '06:00',
        arrivalTime: '10:30',
        duration: '5ч 30м',
        departureDate: '2026-06-18',
        price: 22000,
        oldPrice: 28000,
        discount: 21,
        stops: 'Прямой',
        aircraft: 'Boeing 737 MAX',
        image: 'images/ЕгипетХургада.jpg'
    },
    {
        id: 'spb-phuket',
        from: 'Санкт-Петербург (LED)',
        to: 'Пхукет (HKT)',
        airline: 'Qatar Airways',
        departureTime: '23:45',
        arrivalTime: '14:20',
        duration: '10ч 35м',
        departureDate: '2026-07-05',
        price: 45000,
        oldPrice: 62000,
        discount: 27,
        stops: '1 пересадка',
        aircraft: 'Boeing 787 Dreamliner',
        image: 'images/Тай Пхукет.jpg'
    },
    {
        id: 'moscow-maldives',
        from: 'Москва (SVO)',
        to: 'Мале (MLE)',
        airline: 'Emirates',
        departureTime: '09:00',
        arrivalTime: '18:30',
        duration: '9ч 30м',
        departureDate: '2026-08-10',
        price: 65000,
        oldPrice: 85000,
        discount: 24,
        stops: '1 пересадка',
        aircraft: 'Airbus A350',
        image: 'images/Мальдивы.jpg'
    },
    {
        id: 'ekb-barcelona',
        from: 'Екатеринбург (SVX)',
        to: 'Барселона (BCN)',
        airline: 'Turkish Airlines',
        departureTime: '04:30',
        arrivalTime: '08:45',
        duration: '7ч 15м',
        departureDate: '2026-06-25',
        price: 28000,
        oldPrice: 35000,
        discount: 20,
        stops: '1 пересадка',
        aircraft: 'Airbus A320',
        image: 'images/ИспанияКоста.jpg'
    },
    {
        id: 'moscow-tokyo',
        from: 'Москва (SVO)',
        to: 'Токио (NRT)',
        airline: 'S7 Airlines',
        departureTime: '11:30',
        arrivalTime: '02:45',
        duration: '9ч 15м',
        departureDate: '2026-09-15',
        price: 55000,
        oldPrice: 72000,
        discount: 24,
        stops: 'Прямой',
        aircraft: 'Boeing 777',
        image: 'images/Тай Пхукет.jpg'
    },
    {
        id: 'spb-sharm',
        from: 'Санкт-Петербург (LED)',
        to: 'Шарм-эль-Шейх (SSH)',
        airline: 'Pobeda',
        departureTime: '07:15',
        arrivalTime: '13:30',
        duration: '6ч 15м',
        departureDate: '2026-06-22',
        price: 19500,
        oldPrice: 26000,
        discount: 25,
        stops: 'Прямой',
        aircraft: 'Boeing 737',
        image: 'images/ХургадаGrandResort.jpg'
    }
];

// Отзывы
const reviews = [
    {
        id: 1,
        hotelId: 'burj-dubai',
        name: 'Александр К.',
        date: '2026-02-15',
        rating: 5,
        text: 'Незабываемый опыт! Сервис на высшем уровне. Номер просто потрясающий с видом на Дубай.',
        pros: ['Роскошный интерьер', 'Отличный сервис', 'Приватный пляж'],
        cons: ['Высокая цена']
    },
    {
        id: 2,
        hotelId: 'burj-dubai',
        name: 'Елена М.',
        date: '2026-01-20',
        rating: 5,
        text: 'Провели здесь медовый месяц — это было волшебно! Ресторан Sky View просто невероятный.',
        pros: ['Романтическая атмосфера', 'Ресторан с видом', 'SPA'],
        cons: []
    },
    {
        id: 3,
        hotelId: 'maldives-grand',
        name: 'Дмитрий П.',
        date: '2026-03-01',
        rating: 5,
        text: 'Мальдивы — это отдельный мир! Водная вилла превзошла все ожидания.',
        pros: ['Частный остров', 'Водные виллы', 'Подводный ресторан'],
        cons: ['Далеко лететь']
    },
    {
        id: 4,
        hotelId: 'kemer-beach',
        name: 'Мария С.',
        date: '2026-02-28',
        rating: 4,
        text: 'Отличный семейный отдых! Дети в восторге от аквапарка и анимации.',
        pros: ['Аквапарк', 'Для детей', 'All inclusive'],
        cons: ['Много людей летом']
    },
    {
        id: 5,
        hotelId: 'palace-antalya',
        name: 'Игорь В.',
        date: '2026-01-15',
        rating: 4,
        text: 'Хороший отель для спокойного отдыха. Территория большая, персонал приветливый.',
        pros: ['Большая территория', 'SPA', 'Тихий пляж'],
        cons: ['Пляж галечный']
    }
];

// Акции и спецпредложения
const promotions = [
    {
        id: 'early-booking',
        name: 'Раннее бронирование',
        title: 'Скидка до 15% при бронировании за 60 дней',
        description: 'Забронируйте тур заранее и получите существенную экономию. Акция распространяется на все направления.',
        badge: 'Раннее бронирование',
        discount: 15,
        validUntil: '2026-06-30',
        image: 'images/ТурцияАнталия.jpg',
        color: 'primary',
        features: ['Скидка до 15%', 'Гарантия лучшей цены', 'Бесплатная отмена']
    },
    {
        id: 'last-minute',
        name: 'Горящие туры',
        title: 'Специальные предложения на ближайшие даты',
        description: 'Выгодные цены на туры, вылетающие в течение 2 недель. Успейте забронировать!',
        badge: 'Hot',
        discount: 30,
        validUntil: null,
        image: 'images/ХургадаGrandResort.jpg',
        color: 'coral',
        features: ['Скидки до 30%', 'Быстрое подтверждение', 'Туры от 3 ночей']
    },
    {
        id: 'installment',
        name: 'Рассрочка 0%',
        title: 'Оплачивайте тур частями без переплат',
        description: 'До 12 месяцев рассрочки от наших банков-партнёров. Одобрение за 5 минут.',
        badge: '0%',
        discount: 0,
        validUntil: null,
        image: 'images/Дубай ОАЭ.jpg',
        color: 'gold',
        features: ['До 12 месяцев', 'Без переплат', 'Без первоначального взноса']
    },
    {
        id: 'family',
        name: 'Семейный пакет',
        title: 'Бесплатное проживание для детей до 12 лет',
        description: 'Специальное предложение для семей с детьми. Дети бесплатно!',
        badge: 'Kids Free',
        discount: 20,
        validUntil: '2026-08-31',
        image: 'images/GrandHaberАнталия.jpg',
        color: 'teal',
        features: ['Бесплатные дети', 'Детский клуб', 'Аквапарк']
    },
    {
        id: 'gift',
        name: 'Подарочный сертификат',
        title: 'Подарите путешествие мечты',
        description: 'Сертификат на любую сумму — получатель сам выберет тур, отель и даты.',
        badge: 'Gift',
        discount: 0,
        validUntil: null,
        image: 'images/Мальдивы.jpg',
        color: 'coral',
        features: ['Любая сумма', 'Срок действия 1 год', 'Персонализация']
    },
    {
        id: 'group',
        name: 'Групповая скидка',
        title: 'Скидка 10% для групп от 10 человек',
        description: 'Отличное предложение для корпоративов, дружеских компаний и семейных торжеств.',
        badge: 'Group',
        discount: 10,
        validUntil: '2026-12-31',
        image: 'images/ЕгипетХургада.jpg',
        color: 'primary',
        features: ['Скидка 10%', 'Персональный менеджер', 'Программа лояльности']
    },
    {
        id: 'vip',
        name: 'VIP обслуживание',
        title: 'Премиум сервис для особых путешествий',
        description: 'Персональный консьерж, бизнес-залы, трансферы на Rolls-Royce и VIP-сопровождение.',
        badge: 'VIP',
        discount: 0,
        validUntil: null,
        image: 'images/ДубайBurjAlArab.jpg',
        color: 'gold',
        features: ['Личный консьерж', 'VIP трансферы', 'Приоритетное обслуживание']
    },
    {
        id: 'insurance',
        name: 'Страховка в подарок',
        title: 'Медицинская страховка бесплатно',
        description: 'При бронировании тура от 100 000 рублей — медицинская страховка в подарок.',
        badge: 'Free',
        discount: 0,
        validUntil: '2026-05-31',
        image: 'images/Тай Пхукет.jpg',
        color: 'teal',
        features: ['Покрытие 50 000 EUR', 'Спорт и активности', 'Горячая линия 24/7']
    }
];

// Экспорт данных
window.SonestaData = {
    destinations,
    hotels,
    tours,
    cruises,
    flights,
    reviews,
    promotions
};