-- =====================================================
-- SONESTATOUR SEED DATA
-- All data from the original data.js
-- =====================================================

-- =====================================================
-- DESTINATIONS
-- =====================================================
INSERT INTO destinations (id, name, country, flag, base_price, description, image) VALUES
('turkey', 'Турция', 'Турция', '🇹🇷', 45000, 'Прекрасные пляжи, древняя история и отличный сервис', 'images/ТурцияАнталия.jpg'),
('egypt', 'Египет', 'Египет', '🇪🇬', 55000, 'Красное море, дайвинг и пирамиды', 'images/ЕгипетХургада.jpg'),
('uae', 'ОАЭ', 'Объединенные Арабские Эмираты', '🇦🇪', 85000, 'Роскошные отели, шопинг и современные достопримечательности', 'images/Дубай ОАЭ.jpg'),
('thailand', 'Таиланд', 'Таиланд', '🇹🇭', 95000, 'Экзотическая культура, храмы и тропические пляжи', 'images/Тай Пхукет.jpg'),
('maldives', 'Мальдивы', 'Мальдивы', '🏝️', 180000, 'Райский отдых на белоснежных пляжах', 'images/Мальдивы.jpg'),
('spain', 'Испания', 'Испания', '🇪🇸', 75000, 'Средиземноморское побережье и богатая культура', 'images/ИспанияКоста.jpg'),
('greece', 'Греция', 'Греция', '🇬🇷', 65000, 'Древняя история, острова и кристально чистое море', 'images/ЕгипетХургада.jpg'),
('italy', 'Италия', 'Италия', '🇮🇹', 80000, 'Культура, кухня и знаменитые достопримечательности', 'images/GrandHaberАнталия.jpg'),
('vietnam', 'Вьетнам', 'Вьетнам', '🇻🇳', 70000, 'Багато культуры, доступные цены и красивая природа', 'images/Тай Пхукет.jpg'),
('indonesia', 'Индонезия', 'Индонезия', '🇮🇩', 85000, 'Волшебные храмы, рисовые террасы и отличный серфинг', 'images/ИспанияКоста.jpg');

-- Destination cities
INSERT INTO destination_cities (destination_id, city) VALUES
('turkey', 'Анталия'), ('turkey', 'Кемер'), ('turkey', 'Бодрум'), ('turkey', 'Мармарис'), ('turkey', 'Сиде'),
('egypt', 'Хургада'), ('egypt', 'Шарм-эль-Шейх'), ('egypt', 'Каир'), ('egypt', 'Марса Алам'),
('uae', 'Дубай'), ('uae', 'Абу-Даби'), ('uae', 'Шарджа'), ('uae', 'Рас-эль-Хайма'),
('thailand', 'Пхукет'), ('thailand', 'Паттайя'), ('thailand', 'Самуи'), ('thailand', 'Бангкок'), ('thailand', 'Краби'),
('maldives', 'Мале'), ('maldives', 'Ари Атолл'), ('maldives', 'Баа Атолл'),
('spain', 'Коста-Брава'), ('spain', 'Коста-дель-Соль'), ('spain', 'Канары'), ('spain', 'Барселона'), ('spain', 'Майорка'),
('greece', 'Крит'), ('greece', 'Родос'), ('greece', 'Корфу'), ('greece', 'Санторини'), ('greece', 'Афины'),
('italy', 'Рим'), ('italy', 'Милан'), ('italy', 'Флоренция'), ('italy', 'Венеция'), ('italy', 'Неаполь'),
('vietnam', 'Нячанг'), ('vietnam', 'Фантхьет'), ('vietnam', 'Дананг'), ('vietnam', 'Хойан'), ('vietnam', 'Фукуок'),
('indonesia', 'Бали'), ('indonesia', 'Ломбок'), ('indonesia', 'Ява'), ('indonesia', 'Суматра');

-- =====================================================
-- AMENITIES
-- =====================================================
INSERT INTO amenities (name) VALUES
('Wi-Fi'), ('Бассейн'), ('SPA'), ('Фитнес'), ('Теннис'), ('Ресторан'), ('Бар'), ('Консьерж'),
('Дайвинг'), ('Приватный пляж'), ('Детский клуб'), ('Аквапарк'), ('Гольф'), ('Яхты'),
('Hammam'), ('Onsen'), ('Lounge'), ('Завтрак');

-- =====================================================
-- HOTELS
-- =====================================================
INSERT INTO hotels (id, name, location, stars, price, category, description, features, rating, reviews_count, main_image) VALUES
('burj-dubai', 'Burj Al Arab Dubai', 'Дубай, ОАЭ', 7, 85000, 'premium', 'Легендарный 7-звёздочный отель в форме паруса. Роскошные номера, мировой уровень сервиса.', 
 '{"🏊 Бассейны", "💆 SPA", "🏖️ Приватный пляж", "🍽️ Рестораны Мишлен", "🚁 Вертолёт-трансфер"}', 4.9, 2456, 'images/ДубайBurjAlArab.jpg'),
('maldives-grand', 'Maldives Grand Resort', 'Мальдивы', 6, 95000, 'premium', 'Шикарный курорт на частном острове. Водяные виллы, сноркелинг, подводный спа.',
 '{"🌴 Островной курорт", "🏄 Водные спорт", "🍽️ Gourmet", "🤿 Сноркелинг", "💆 Подводный SPA"}', 4.8, 1823, 'images/Мальдивы.jpg'),
('palace-antalya', 'Palace Grand Antalya', 'Анталия, Турция', 6, 45000, 'premium', 'Популярный курортный отель с множеством развлечений. Детский клуб, аквапарк.',
 '{"💆 SPA", "🎭 Развлечения", "👨‍👩‍👧‍👦 Семейный", "🏊 Аквапарк", "🍽️ All Inclusive"}', 4.6, 3241, 'images/ТурцияАнталия.jpg'),
('grand-plaza-cairo', 'Grand Plaza Hotel Cairo', 'Каир, Египет', 4, 25000, 'comfort', 'Отличное соотношение цены и качества. Удобное расположение в центре.',
 '{"📍 Центр города", "🚕 Трансфер", "📶 Wi-Fi", "🍽️ Завтрак", "🏛️ Рядом пирамиды"}', 4.3, 1456, 'images/ХургадаGrandResort.jpg'),
('kemer-beach', 'Kemer Beach Resort', 'Кемер, Турция', 4, 28000, 'comfort', 'Семейный отель прямо на пляже. Питание включено, много развлечений.',
 '{"🏖️ Пляж 50м", "🍽️ All Inclusive", "🏋️ Спортзал", "🎉 Анимация", "👨‍👩‍👧‍👦 Для детей"}', 4.4, 2156, 'images/GrandHaberАнталия.jpg'),
('phuket-sunset', 'Phuket Sunset Inn', 'Пхукет, Таиланд', 4, 22000, 'comfort', 'Уютный отель с аутентичной атмосферой. Тайская кухня, спа, йога.',
 '{"🌅 Вид на закат", "🍜 Thai Cuisine", "🧘 Йога", "💆 СПА", "🏝️ Пляж"}', 4.5, 1876, 'images/Тай Пхукет.jpg'),
('economy-plaza-madrid', 'Economy Plaza Madrid', 'Мадрид, Испания', 3, 12000, 'budget', 'Хороший выбор для туристов на бюджет. Близко к достопримечательностям.',
 '{"📍 Метро рядом", "🛏️ Чистые номера", "☕ Завтрак", "🏛️ Центр", "🛍️ Шоппинг"}', 4.0, 987, 'images/ИспанияКоста.jpg'),
('sharm-budget', 'Sharm Budget Resort', 'Шарм-эль-Шейх, Египет', 3, 15000, 'budget', 'Доступный отель с хорошим расположением. Коралловые рифы рядом.',
 '{"🏖️ Пляж", "🤿 Дайвинг", "🍽️ Restaurant", "🌊 Море", "🐠 Кораллы"}', 4.1, 1234, 'images/ХургадаGrandResort.jpg'),
('bangkok-traveler', 'Bangkok Traveler Guesthouse', 'Бангкок, Таиланд', 2, 8000, 'budget', 'Отличный выбор для молодых путешественников. Много туристов, экскурсии.',
 '{"👥 Общая кухня", "🧑‍💻 Lounge", "🗺️ Туры", "🎒 Общение", "☕ Чай/кофе"}', 4.2, 654, 'images/Тай Пхукет.jpg'),
('seychelles-paradise', 'Seychelles Paradise', 'Сейшелы', 5, 120000, 'premium', 'Роскошный курорт на гранитных валунах с видом на Индийский океан.',
 '{"🏝️ Частный пляж", "💆 Spa", "🍽️ Fine Dining", "🌊 Infinity pool", "🤿 Сноркелинг"}', 4.9, 876, 'images/Мальдивы.jpg'),
('greece-santorini', 'Santorini Luxury Suites', 'Санторини, Греция', 5, 75000, 'premium', 'Романтический курорт с видом на кальдеру. Закаты и белоснежные дома.',
 '{"🌅 Панорама", "🍷 Винный погреб", "💆 Spa", "🏊 Infinity pool", "🍽️ Греческая кухня"}', 4.8, 1567, 'images/ИспанияКоста.jpg'),
('vietnam-nha-trang', 'Nha Trang Beach Resort', 'Нячанг, Вьетнам', 4, 18000, 'comfort', 'Современный курорт на песчаном пляже. Подходит для семей и дайверов.',
 '{"🏖️ Пляж", "🤿 Дайвинг", "🍽️ Buffet", "👨‍👩‍👧‍👦 Family", "💆 Spa"}', 4.4, 2134, 'images/Тай Пхукет.jpg'),
('oriental-bangkok', 'The Oriental Bangkok', 'Бангкок, Таиланд', 5, 55000, 'premium', 'Легендарный отель на берегу реки Чао Прайя. Лучший сервис с 1876 года.',
 '{"🏛️ Исторический", "🍽️ Fine Dining", "💆 Spa", "🛥️ Трансфер на лодке", "🎭 Тайский массаж"}', 4.8, 3245, 'images/Тай Пхукет.jpg'),
('amalfi-positano', 'Le Sirenuse Positano', 'Позитано, Италия', 5, 95000, 'premium', 'Романтический бутик-отель на скалах Амальфи. Вид на Лигурийское море.',
 '{"🌅 Панорамный вид", "🍷 Винный погреб", "💆 Spa", "🏊 Infinity pool", "🍽️ Итальянская кухня"}', 4.9, 1567, 'images/GrandHaberАнталия.jpg'),
('bali-mandapa', 'Mandapa Ritz-Carlton Bali', 'Убуд, Индонезия', 5, 85000, 'premium', 'Роскошный курорт в джунглях Бали с видом на рисовые террасы и храмы.',
 '{"🌾 Rice Terrace View", "💆 Spa", "🏊 Infinity pool", "🧘 Yoga", "🍽️ Indonesian Cuisine"}', 4.9, 2345, 'images/ИспанияКоста.jpg'),
('hurghada-marriott', 'Marriott Beach Resort Hurghada', 'Хургада, Египет', 5, 35000, 'comfort', 'Отличный курорт для дайверов и любителей Красного моря.',
 '{"🏖️ Приватный пляж", "🤿 Дайвинг-центр", "🍽️ All Inclusive", "🏊 Бассейны", "🎉 Анимация"}', 4.5, 2876, 'images/ЕгипетХургада.jpg'),
('cuba-varadero', 'Iberostar Bella Vista', 'Варадеро, Куба', 5, 55000, 'comfort', 'Современный курорт на лучшем пляже Кубы. Тропический рай с кубинским колоритом.',
 '{"🏖️ Пляж 5⭐", "🍽️ 8 ресторанов", "💆 Spa", "🌴 Tropical Garden", "🎭 Живая музыка"}', 4.6, 1987, 'images/Мальдивы.jpg'),
('dubai-atlantis', 'Atlantis The Palm Dubai', 'Дубай, ОАЭ', 5, 75000, 'premium', 'Знаменитый отель на полумесяце Палм. Крупнейший аквапарк и океанариум.',
 '{"🏊 Аквапарк", "🐬 Океанариум", "🍽️ 23 ресторана", "🌊 Аквадорожки", "🎰 Казино"}', 4.7, 4532, 'images/Дубай ОАЭ.jpg'),
('mexico-cancun', 'Hyatt Ziva Cancun', 'Канкун, Мексика', 5, 58000, 'comfort', 'Ультра-all-inclusive курорт на Карибском побережье с видом на океан.',
 '{"🏖️ Карибский пляж", "🍽️ Unlimited Dining", "💆 Talasian Spa", "🏊 Swim-up бар", "👨‍👩‍👧‍👦 Family"}', 4.6, 3214, 'images/Мальдивы.jpg'),
('kenya-diani', 'Diani Reef Beach Resort', 'Диани Бич, Кения', 4, 45000, 'comfort', 'Курорт на берегу Индийского океана. Ворота в африканское сафари.',
 '{"🏖️ Приватный пляж", "🚁 Сафари", "🤿 Сноркелинг", "🐢 Черепахи", "🌴 Масаи Марра"}', 4.4, 1234, 'images/Мальдивы.jpg'),
('maldives-soneva', 'Soneva Fushi Resort', 'Мальдивы', 6, 200000, 'premium', 'Уникальный эко-курорт без пластика. Лучшие водяные виллы и астрономия.',
 '{"🌿 Zero Waste", "🔭 Обсерватория", "🏊 Частный остров", "🍽️ Fresh Cuisine", "🌙 Astronomy"}', 5.0, 876, 'images/Мальдивы.jpg'),
('turkey-bodrum', 'Metres Hotel Bodrum', 'Бодрум, Турция', 5, 38000, 'comfort', 'Модный бутик-отель на Эгейском побережье с яхтенным причалом.',
 '{"⛵ Яхтенный клуб", "🌊 Infinity pool", "🍽️ Seafood", "🌅 Sunset Bar", "🧴 Beach Club"}', 4.6, 1654, 'images/ТурцияАнталия.jpg'),
('greece-mykonos', 'Mykonos Grand Hotel', 'Миконос, Греция', 5, 68000, 'premium', 'Роскошный курорт с видом на Эгейское море и знаменитые ветряные мельницы острова.',
 '{"🌅 Aegean Views", "🏊 Infinity pool", "💆 Spa", "🍽️ Greek Fine Dining", "🏖️ Mykonos Beach"}', 4.8, 2123, 'images/ЕгипетХургада.jpg'),
('spain-ibiza', 'Seven Pines Pure Club Ibiza', 'Ибица, Испания', 5, 82000, 'premium', 'Бутик-курорт на скалах с видом на закат. Идеален для романтического отдыха.',
 '{"🌅 Sunset Views", "🏊 Cliff pool", "💆 Spa", "🍽️ Mediterranean", "🥂 Pure Club"}', 4.9, 1432, 'images/ИспанияКоста.jpg'),
('morocco-marrakech', 'Royal Mansour Marrakech', 'Марракеш, Марокко', 5, 110000, 'premium', 'Роскошный риад в центре старого города с традиционной марокканской архитектурой.',
 '{"🏛️ Riad Style", "💆 Hammam", "🍽️ Moroccan Cuisine", "🌺 Courtyard pool", "🛍️ Medina"}', 4.9, 1876, 'images/Дубай ОАЭ.jpg'),
('colombia-cartagena', 'Sofitel Legend Santa Clara', 'Картахена, Колумбия', 5, 48000, 'comfort', 'Исторический отель в колониальном здании с видом на Карибское море.',
 '{"🏛️ Colonial Heritage", "💆 Spa", "🌊 Rooftop pool", "🍽️ Fusion Cuisine", "🛍️ Old Town"}', 4.6, 1654, 'images/ЕгипетХургада.jpg'),
('brazil-rio', 'Belmond Copacabana Palace', 'Рио-де-Жанейро, Бразилия', 5, 95000, 'premium', 'Культовый отель на пляже Копакабана с видом на статую Христа.',
 '{"🏖️ Copacabana Beach", "💆 Spa", "🎾 Tennis", "🍽️ Fine Dining", "🎭 Jazz Club"}', 4.8, 2876, 'images/Мальдивы.jpg'),
('japan-kyoto', 'Aman Kyoto', 'Киото, Япония', 5, 150000, 'premium', 'Уединённый курорт в бамбуковом лесу с традиционными японскими ваннами.',
 '{"🎋 Bamboo Forest", "⛩️ Onsen", "🍵 Tea Ceremony", "🍽️ Kaiseki", "🌸 Zen Garden"}', 4.9, 1234, 'images/GrandHaberАнталия.jpg'),
('kenya-maasai', 'Singita Sasalance Lodge', 'Масай Мара, Кения', 5, 180000, 'premium', 'Лагерь-люкс в заповеднике с видом на миграцию антилоп гну.',
 '{"🦁 Сафари", "🐘 Elephant", "🏕️ Luxury Tents", "🍽️ Bush Dining", "🌅 Sundowner"}', 5.0, 654, 'images/Мальдивы.jpg'),
('iceland-blue-lagoon', 'Retreat at Blue Lagoon', 'Исландия', 5, 200000, 'premium', 'Геотермальный курорт с приватным доступом в Blue Lagoon и видом на вулканы.',
 '{"♨️ Blue Lagoon", "🌋 Lava Fields", "💆 Spa", "🍽️ Michelin Dining", "🌌 Northern Lights"}', 4.9, 987, 'images/GrandHaberАнталия.jpg'),
('mexico-tulum', 'Be Tulum Hotel', 'Тулум, Мексика', 4, 45000, 'comfort', 'Бутик-отель на побережье Карибов с пирамидами майя в джунглях.',
 '{"🏖️ Caribbean Coast", "🏛️ Mayan Ruins", "🍽️ Farm-to-table", "🚲 Yoga", "🐢 Sea Turtles"}', 4.7, 1567, 'images/Мальдивы.jpg'),
('philippines-palawan', 'Amanpulo Resort', 'Палаван, Филиппины', 5, 165000, 'premium', 'Частный остров с белоснежными пляжами. Лучший дайвинг в Азии.',
 '{"🏝️ Private Island", "🤿 World-class Diving", "💆 Spa", "🍽️ Beach Dining", "🐠 Coral Reef"}', 4.9, 876, 'images/Мальдивы.jpg'),
('mauritius-saint-geran', 'One&Only Le Saint Geran', 'Маврикий', 5, 130000, 'premium', 'Роскошный курорт на острове Маврикий с коралловыми рифами.',
 '{"🏖️ Private Beach", "🤿 Snorkeling", "⛳ Golf", "💆 Spa", "🍽️ French Cuisine"}', 4.8, 1432, 'images/Мальдивы.jpg'),
('madagascar-ikonina', 'Ikonina Lodge', 'Носк Беш, Мадагаскар', 4, 35000, 'comfort', 'Уникальный эко-лагерь рядом с национальным парком Исоло.',
 '{"🦎 Лемуры", "🌿 Дождевые леса", "🐛 Экскурсии", "🍽️ Creole Cuisine", "🌴 Beach"}', 4.5, 567, 'images/Мальдивы.jpg');

-- Hotel Images
INSERT INTO hotel_images (hotel_id, image_url, sort_order) VALUES
('burj-dubai', 'images/ДубайBurjAlArab.jpg', 0), ('burj-dubai', 'images/Дубай ОАЭ.jpg', 1),
('maldives-grand', 'images/Мальдивы.jpg', 0), ('maldives-grand', 'images/Тай Пхукет.jpg', 1),
('palace-antalya', 'images/ТурцияАнталия.jpg', 0), ('palace-antalya', 'images/GrandHaberАнталия.jpg', 1),
('grand-plaza-cairo', 'images/ХургадаGrandResort.jpg', 0), ('grand-plaza-cairo', 'images/ЕгипетХургада.jpg', 1),
('kemer-beach', 'images/GrandHaberАнталия.jpg', 0), ('kemer-beach', 'images/ТурцияАнталия.jpg', 1),
('phuket-sunset', 'images/Тай Пхукет.jpg', 0), ('phuket-sunset', 'images/Мальдивы.jpg', 1),
('economy-plaza-madrid', 'images/ИспанияКоста.jpg', 0), ('economy-plaza-madrid', 'images/GrandHaberАнталия.jpg', 1),
('sharm-budget', 'images/ХургадаGrandResort.jpg', 0), ('sharm-budget', 'images/ТурцияАнталия.jpg', 1),
('bangkok-traveler', 'images/Тай Пхукет.jpg', 0), ('bangkok-traveler', 'images/ИспанияКоста.jpg', 1),
('seychelles-paradise', 'images/Мальдивы.jpg', 0), ('seychelles-paradise', 'images/ДубайBurjAlArab.jpg', 1),
('greece-santorini', 'images/ИспанияКоста.jpg', 0), ('greece-santorini', 'images/Дубай ОАЭ.jpg', 1),
('vietnam-nha-trang', 'images/Тай Пхукет.jpg', 0), ('vietnam-nha-trang', 'images/ХургадаGrandResort.jpg', 1),
('oriental-bangkok', 'images/Тай Пхукет.jpg', 0), ('oriental-bangkok', 'images/Дубай ОАЭ.jpg', 1),
('amalfi-positano', 'images/GrandHaberАнталия.jpg', 0), ('amalfi-positano', 'images/ИспанияКоста.jpg', 1),
('bali-mandapa', 'images/ИспанияКоста.jpg', 0), ('bali-mandapa', 'images/Мальдивы.jpg', 1),
('hurghada-marriott', 'images/ЕгипетХургада.jpg', 0), ('hurghada-marriott', 'images/ХургадаGrandResort.jpg', 1),
('cuba-varadero', 'images/Мальдивы.jpg', 0), ('cuba-varadero', 'images/ЕгипетХургада.jpg', 1),
('dubai-atlantis', 'images/Дубай ОАЭ.jpg', 0), ('dubai-atlantis', 'images/ДубайBurjAlArab.jpg', 1),
('mexico-cancun', 'images/Мальдивы.jpg', 0), ('mexico-cancun', 'images/Тай Пхукет.jpg', 1),
('kenya-diani', 'images/Мальдивы.jpg', 0), ('kenya-diani', 'images/ИспанияКоста.jpg', 1),
('maldives-soneva', 'images/Мальдивы.jpg', 0), ('maldives-soneva', 'images/Дубай ОАЭ.jpg', 1),
('turkey-bodrum', 'images/ТурцияАнталия.jpg', 0), ('turkey-bodrum', 'images/GrandHaberАнталия.jpg', 1),
('greece-mykonos', 'images/ЕгипетХургада.jpg', 0), ('greece-mykonos', 'images/ИспанияКоста.jpg', 1),
('spain-ibiza', 'images/ИспанияКоста.jpg', 0), ('spain-ibiza', 'images/ЕгипетХургада.jpg', 1),
('morocco-marrakech', 'images/Дубай ОАЭ.jpg', 0), ('morocco-marrakech', 'images/GrandHaberАнталия.jpg', 1),
('colombia-cartagena', 'images/ЕгипетХургада.jpg', 0), ('colombia-cartagena', 'images/Мальдивы.jpg', 1),
('brazil-rio', 'images/Мальдивы.jpg', 0), ('brazil-rio', 'images/Дубай ОАЭ.jpg', 1),
('japan-kyoto', 'images/GrandHaberАнталия.jpg', 0), ('japan-kyoto', 'images/Тай Пхукет.jpg', 1),
('kenya-maasai', 'images/Мальдивы.jpg', 0), ('kenya-maasai', 'images/ИспанияКоста.jpg', 1),
('iceland-blue-lagoon', 'images/GrandHaberАнталия.jpg', 0), ('iceland-blue-lagoon', 'images/ИспанияКоста.jpg', 1),
('mexico-tulum', 'images/Мальдивы.jpg', 0), ('mexico-tulum', 'images/Тай Пхукет.jpg', 1),
('philippines-palawan', 'images/Мальдивы.jpg', 0), ('philippines-palawan', 'images/Тай Пхукет.jpg', 1),
('mauritius-saint-geran', 'images/Мальдивы.jpg', 0), ('mauritius-saint-geran', 'images/Дубай ОАЭ.jpg', 1),
('madagascar-ikonina', 'images/Мальдивы.jpg', 0), ('madagascar-ikonina', 'images/ИспанияКоста.jpg', 1);

-- Room Types
INSERT INTO room_types (hotel_id, name, area, max_guests, price) VALUES
('burj-dubai', 'Deluxe Suite', 170, 2, 85000), ('burj-dubai', 'Duplex Suite', 270, 4, 150000), ('burj-dubai', 'Royal Suite', 850, 6, 280000),
('maldives-grand', 'Water Villa', 120, 2, 95000), ('maldives-grand', 'Deluxe Water Villa', 180, 2, 140000), ('maldives-grand', 'Presidential Villa', 300, 4, 250000),
('palace-antalya', 'Standard', 35, 2, 45000), ('palace-antalya', 'Deluxe', 50, 3, 65000), ('palace-antalya', 'Suite', 75, 4, 95000),
('grand-plaza-cairo', 'Standard', 28, 2, 25000), ('grand-plaza-cairo', 'Deluxe', 40, 2, 35000),
('kemer-beach', 'Standard', 32, 2, 28000), ('kemer-beach', 'Deluxe', 45, 3, 40000), ('kemer-beach', 'Family', 55, 4, 55000),
('phuket-sunset', 'Standard', 30, 2, 22000), ('phuket-sunset', 'Deluxe', 42, 2, 32000), ('phuket-sunset', 'Suite', 60, 3, 48000),
('economy-plaza-madrid', 'Single', 18, 1, 12000), ('economy-plaza-madrid', 'Double', 25, 2, 18000), ('economy-plaza-madrid', 'Triple', 35, 3, 24000),
('sharm-budget', 'Standard', 20, 2, 15000), ('sharm-budget', 'Sea View', 28, 2, 22000), ('sharm-budget', 'Superior', 35, 3, 30000),
('bangkok-traveler', 'Dorm', 12, 1, 8000), ('bangkok-traveler', 'Private', 16, 2, 12000),
('seychelles-paradise', 'Hill Villa', 100, 2, 120000), ('seychelles-paradise', 'Beach Villa', 150, 2, 180000), ('seychelles-paradise', 'Estate Villa', 250, 4, 300000),
('greece-santorini', 'Cave Suite', 45, 2, 75000), ('greece-santorini', 'Caldera View', 65, 2, 110000), ('greece-santorini', 'Honeymoon Suite', 90, 2, 150000),
('vietnam-nha-trang', 'Superior', 32, 2, 18000), ('vietnam-nha-trang', 'Deluxe', 45, 2, 26000), ('vietnam-nha-trang', 'Family Suite', 60, 4, 42000),
('oriental-bangkok', 'Deluxe', 40, 2, 55000), ('oriental-bangkok', 'Premium River View', 55, 2, 75000), ('oriental-bangkok', 'Siam Suite', 85, 3, 120000),
('amalfi-positano', 'Classic', 25, 2, 95000), ('amalfi-positano', 'Superior', 35, 2, 130000), ('amalfi-positano', 'Junior Suite', 50, 2, 180000),
('bali-mandapa', 'Garden Villa', 100, 2, 85000), ('bali-mandapa', 'Pool Villa', 150, 2, 140000), ('bali-mandapa', 'One Bedroom Residence', 200, 3, 220000),
('hurghada-marriott', 'Standard', 35, 2, 35000), ('hurghada-marriott', 'Pool Access', 45, 2, 48000), ('hurghada-marriott', 'Family Room', 60, 4, 65000),
('cuba-varadero', 'Standard', 35, 2, 55000), ('cuba-varadero', 'Club Room', 45, 2, 72000), ('cuba-varadero', 'Junior Suite', 65, 4, 95000),
('dubai-atlantis', 'City View', 45, 2, 75000), ('dubai-atlantis', 'Palm View', 55, 2, 100000), ('dubai-atlantis', 'Atlantis Suite', 100, 4, 200000),
('mexico-cancun', 'Deluxe Ocean', 40, 2, 58000), ('mexico-cancun', 'Club Ocean', 55, 2, 80000), ('mexico-cancun', 'Presidential Suite', 120, 4, 150000),
('kenya-diani', 'Standard', 30, 2, 45000), ('kenya-diani', 'Ocean View', 45, 2, 60000), ('kenya-diani', 'Suite', 70, 4, 90000),
('maldives-soneva', 'Crusoe Suite', 150, 2, 200000), ('maldives-soneva', 'Soneva Fushi Villa', 200, 2, 280000), ('maldives-soneva', 'Private Reserve', 400, 6, 550000),
('turkey-bodrum', 'Boutique Room', 30, 2, 38000), ('turkey-bodrum', 'Sea View', 45, 2, 52000), ('turkey-bodrum', 'Suite with Pool', 70, 3, 85000),
('greece-mykonos', 'Deluxe', 35, 2, 68000), ('greece-mykonos', 'Sea View Suite', 55, 2, 95000), ('greece-mykonos', 'Master Suite', 85, 4, 140000),
('spain-ibiza', 'Terrace Room', 40, 2, 82000), ('spain-ibiza', 'Pool Suite', 60, 2, 120000), ('spain-ibiza', 'Villa', 120, 4, 200000),
('morocco-marrakech', 'Chambre', 45, 2, 110000), ('morocco-marrakech', 'Suite', 65, 2, 165000), ('morocco-marrakech', 'Private Residence', 200, 4, 350000),
('colombia-cartagena', 'Classic', 30, 2, 48000), ('colombia-cartagena', 'Ocean View', 45, 2, 65000), ('colombia-cartagena', 'Grand Suite', 80, 3, 110000),
('brazil-rio', 'Deluxe', 40, 2, 95000), ('brazil-rio', 'Ocean Suite', 65, 2, 150000), ('brazil-rio', 'Penthouse', 150, 4, 350000),
('japan-kyoto', 'Forest Room', 50, 2, 150000), ('japan-kyoto', 'Pavilion', 80, 2, 220000), ('japan-kyoto', 'Kinmasa Suite', 120, 4, 380000),
('kenya-maasai', 'Suite Tent', 100, 2, 180000), ('kenya-maasai', 'Family Suite', 150, 4, 280000), ('kenya-maasai', 'Private Villa', 250, 6, 450000),
('iceland-blue-lagoon', 'Suite', 70, 2, 200000), ('iceland-blue-lagoon', 'Ritual Suite', 100, 2, 280000), ('iceland-blue-lagoon', 'The Retreat Villa', 200, 4, 450000),
('mexico-tulum', 'Jungle Suite', 40, 2, 45000), ('mexico-tulum', 'Ocean Suite', 55, 2, 65000), ('mexico-tulum', 'Pool Villa', 90, 3, 110000),
('philippines-palawan', 'Cebu Villa', 120, 2, 165000), ('philippines-palawan', 'Beach Villa', 160, 2, 220000), ('philippines-palawan', 'One Bedroom Suite', 250, 4, 350000),
('mauritius-saint-geran', 'Garden Suite', 80, 2, 130000), ('mauritius-saint-geran', 'Ocean Suite', 110, 2, 180000), ('mauritius-saint-geran', 'Private Villa', 200, 4, 300000),
('madagascar-ikonina', 'Eco Lodge', 25, 2, 35000), ('madagascar-ikonina', 'Forest Suite', 45, 2, 50000), ('madagascar-ikonina', 'Family Bungalow', 60, 4, 75000);

-- Hotel Amenities
INSERT INTO hotel_amenities (hotel_id, amenity_id) 
SELECT h.id, a.id FROM hotels h, amenities a 
WHERE (h.id = 'burj-dubai' AND a.name IN ('Wi-Fi', 'Бассейн', 'SPA', 'Фитнес', 'Теннис', 'Ресторан', 'Бар', 'Консьерж'))
OR (h.id = 'maldives-grand' AND a.name IN ('Wi-Fi', 'Бассейн', 'SPA', 'Дайвинг', 'Ресторан', 'Бар', 'Приватный пляж'))
OR (h.id = 'palace-antalya' AND a.name IN ('Wi-Fi', 'Бассейн', 'SPA', 'Детский клуб', 'Аквапарк', 'Ресторан', 'Бар'))
OR (h.id = 'grand-plaza-cairo' AND a.name IN ('Wi-Fi', 'Бассейн', 'Ресторан', 'Бар'))
OR (h.id = 'kemer-beach' AND a.name IN ('Wi-Fi', 'Бассейн', 'SPA', 'Фитнес', 'Ресторан', 'Бар'))
OR (h.id = 'phuket-sunset' AND a.name IN ('Wi-Fi', 'Бассейн', 'SPA', 'Ресторан'))
OR (h.id = 'economy-plaza-madrid' AND a.name IN ('Wi-Fi', 'Завтрак'))
OR (h.id = 'sharm-budget' AND a.name IN ('Wi-Fi', 'Бассейн', 'Пляж', 'Ресторан', 'Бар', 'Дайвинг'))
OR (h.id = 'bangkok-traveler' AND a.name IN ('Wi-Fi', 'Lounge'));

-- =====================================================
-- TOURS
-- =====================================================
INSERT INTO tours (id, name, hotel, destination_id, duration, nutrition, price, discount, old_price, description, image, is_hot, rating) VALUES
('turkey-antalya-7', 'Турция, Анталия', 'Grand Kemer 5*', 'turkey', 7, 'All Inclusive', 65000, 25, 87000, 'Незабываемый отдых на побережье Средиземного моря', 'images/GrandHaberАнталия.jpg', true, 4.6),
('egypt-hurghada-10', 'Египет, Хургада', 'Grand Resort 5*', 'egypt', 10, 'All Inclusive', 59500, 30, 85000, 'Отдых на Красном море с дайвингом и экскурсиями', 'images/ХургадаGrandResort.jpg', true, 4.5),
('uae-dubai-5', 'ОАЭ, Дубай', 'Burj Al Arab 7*', 'uae', 5, 'Завтрак', 96000, 20, 120000, 'Роскошный отдых в легендарном отеле', 'images/ДубайBurjAlArab.jpg', true, 4.9),
('maldives-7', 'Мальдивы', 'Maldives Grand 6*', 'maldives', 7, 'Полный пансион', 175000, 15, 206000, 'Рай на земле с водными виллами', 'images/Мальдивы.jpg', false, 4.8),
('thailand-phuket-10', 'Таиланд, Пхукет', 'Phuket Sunset 4*', 'thailand', 10, 'Завтрак', 72000, 10, 80000, 'Тропический рай с храмами и пляжами', 'images/Тай Пхукет.jpg', false, 4.4),
('spain-costa-14', 'Испания, Коста дель Соль', 'Beach Resort 4*', 'spain', 14, 'Half Board', 85000, 10, 94500, 'Европейский отдых с культурными экскурсиями', 'images/ИспанияКоста.jpg', false, 4.3),
('greece-crete-7', 'Греция, Крит', 'Crete Palace 5*', 'greece', 7, 'All Inclusive', 78000, 20, 97500, 'Древняя история и кристальное море', 'images/ЕгипетХургада.jpg', false, 4.5),
('vietnam-nha-trang-10', 'Вьетнам, Нячанг', 'Nha Trang Resort 4*', 'vietnam', 10, 'Завтрак', 55000, 15, 65000, 'Азиатская экзотика по доступной цене', 'images/Тай Пхукет.jpg', true, 4.3),
('italy-rome-7', 'Италия, Рим', 'Rome Grand Hotel 4*', 'italy', 7, 'Завтрак', 95000, 5, 100000, 'Классический тур по вечному городу', 'images/GrandHaberАнталия.jpg', false, 4.6),
('indonesia-bali-10', 'Индонезия, Бали', 'Bali Paradise 5*', 'indonesia', 10, 'Завтрак', 95000, 10, 105500, 'Духовные храмы и тропические пляжи', 'images/ИспанияКоста.jpg', false, 4.7);

INSERT INTO tour_highlights (tour_id, highlight, sort_order) VALUES
('turkey-antalya-7', 'Отель 5*', 0), ('turkey-antalya-7', 'Пляж', 1), ('turkey-antalya-7', 'Бассейн', 2), ('turkey-antalya-7', 'Анимация', 3),
('egypt-hurghada-10', 'Отель 5*', 0), ('egypt-hurghada-10', 'Дайвинг', 1), ('egypt-hurghada-10', 'SPA', 2), ('egypt-hurghada-10', 'Экскурсии', 3),
('uae-dubai-5', '7* отель', 0), ('uae-dubai-5', 'VIP сервис', 1), ('uae-dubai-5', 'Трансфер', 2), ('uae-dubai-5', 'Шоппинг', 3),
('maldives-7', 'Водные виллы', 0), ('maldives-7', 'Сноркелинг', 1), ('maldives-7', 'Приватный остров', 2), ('maldives-7', 'SPA', 3),
('thailand-phuket-10', 'Отель 4*', 0), ('thailand-phuket-10', 'Трансферы', 1), ('thailand-phuket-10', 'Обзорная экскурсия', 2),
('spain-costa-14', 'Отель 4*', 0), ('spain-costa-14', 'Экскурсии', 1), ('spain-costa-14', 'Пляж', 2), ('spain-costa-14', 'Кухня', 3),
('greece-crete-7', 'Отель 5*', 0), ('greece-crete-7', 'Исторические экскурсии', 1), ('greece-crete-7', 'Пляж', 2),
('vietnam-nha-trang-10', 'Отель 4*', 0), ('vietnam-nha-trang-10', 'Пляж', 1), ('vietnam-nha-trang-10', 'SPA', 2), ('vietnam-nha-trang-10', 'Экскурсии', 3),
('italy-rome-7', 'Отель 4*', 0), ('italy-rome-7', 'Экскурсии', 1), ('italy-rome-7', 'Музеи', 2), ('italy-rome-7', 'Кухня', 3),
('indonesia-bali-10', 'Отель 5*', 0), ('indonesia-bali-10', 'Храмы', 1), ('indonesia-bali-10', 'Террасы', 2), ('indonesia-bali-10', 'SPA', 3);

-- =====================================================
-- CRUISES
-- =====================================================
INSERT INTO cruises (id, name, company, ship, route, duration, departure_date, price, old_price, discount, description, image, rating) VALUES
('mediterranean-7', 'Средиземноморский круиз', 'Costa Cruises', 'Costa Diadema', 'Италия - Испания - Франция - Монако', 7, '2026-06-15', 85000, 105000, 19, 'Классический маршрут по лучшим средиземноморским городам', 'images/GrandHaberАнталия.jpg', 4.5),
('dubai-gulf-5', 'Круиз по Персидскому заливу', 'AIDA Cruises', 'AIDAstella', 'ОАЭ - Катар - Оман', 5, '2026-11-20', 65000, 78000, 17, 'Современные мегалополисы и древняя культура Востока', 'images/Дубай ОАЭ.jpg', 4.4),
('norway-fjords-10', 'Фьорды Норвегии', 'Hurtigruten', 'MS Polarlys', 'Берген - Гейрангер - Тромсе', 10, '2026-07-10', 145000, 170000, 15, 'Живописные пейзажи и северное сияние', 'images/ИспанияКоста.jpg', 4.8),
('caribbean-14', 'Карибский круиз', 'Royal Caribbean', 'Wonder of the Seas', 'Ямайка - Каймановы острова - Багамы', 14, '2026-12-20', 120000, 150000, 20, 'Тропические острова и белоснежные пляжи', 'images/Мальдивы.jpg', 4.7),
('japan-8', 'Круиз Японские острова', 'Princess Cruises', 'Diamond Princess', 'Токио - Киото - Осака', 8, '2026-04-05', 110000, 130000, 15, 'Цветение сакуры и современные мегалополисы', 'images/Тай Пхукет.jpg', 4.9),
('seychelles-7', 'Сейшельские острова', 'The Moorings', 'Katana', 'Маэ - Праслен - Ла-Диг', 7, '2026-09-12', 180000, 220000, 18, 'Яхтенный круиз по райским островам', 'images/ХургадаGrandResort.jpg', 4.9),
('greece-islands-5', 'Греческие острова', 'Celestyal Cruises', 'Celestyal Olympia', 'Афины - Санторини - Миконос - Крит', 5, '2026-08-20', 75000, 90000, 17, 'Белокаменные города и лазурное море Эгейского моря', 'images/ЕгипетХургада.jpg', 4.6),
('hawaii-10', 'Гавайские острова', 'Norwegian Cruise Line', 'Pride of America', 'Гонолулу - Мауи - Кауаи - Биг-Айленд', 10, '2026-05-15', 165000, 195000, 15, 'Вулканы, пляжи и гавайская культура', 'images/ДубайBurjAlArab.jpg', 4.7);

INSERT INTO cruise_ports (cruise_id, port_name, sort_order) VALUES
('mediterranean-7', 'Генуя', 0), ('mediterranean-7', 'Чивитвеккья (Рим)', 1), ('mediterranean-7', 'Пальма', 2), ('mediterranean-7', 'Марсель', 3), ('mediterranean-7', 'Монако', 4),
('dubai-gulf-5', 'Дубай', 0), ('dubai-gulf-5', 'Доха', 1), ('dubai-gulf-5', 'Маскат', 2),
('norway-fjords-10', 'Берген', 0), ('norway-fjords-10', 'Флом', 1), ('norway-fjords-10', 'Гейрангер', 2), ('norway-fjords-10', 'Molde', 3), ('norway-fjords-10', 'Тромсе', 4),
('caribbean-14', 'Форт-Лодердейл', 0), ('caribbean-14', 'Очо-Риос', 1), ('caribbean-14', 'Джорджтаун', 2), ('caribbean-14', 'Нассау', 3),
('japan-8', 'Токио', 0), ('japan-8', 'Йокогама', 1), ('japan-8', 'Осака', 2), ('japan-8', 'Кобе', 3), ('japan-8', 'Нагоя', 4),
('seychelles-7', 'Маэ', 0), ('seychelles-7', 'Праслен', 1), ('seychelles-7', 'Ла-Диг', 2), ('seychelles-7', 'Курон', 3),
('greece-islands-5', 'Пирей', 0), ('greece-islands-5', 'Санторини', 1), ('greece-islands-5', 'Миконос', 2), ('greece-islands-5', 'Ираклион', 3),
('hawaii-10', 'Гонолулу', 0), ('hawaii-10', 'Кахулуи', 1), ('hawaii-10', 'Навилили', 2), ('hawaii-10', 'Хило', 3);

INSERT INTO cruise_features (cruise_id, feature) VALUES
('mediterranean-7', 'Все питание включено'), ('mediterranean-7', 'Развлечения на борту'), ('mediterranean-7', 'Бассейны'), ('mediterranean-7', 'Спа'), ('mediterranean-7', 'Театр'),
('dubai-gulf-5', 'Все питание включено'), ('dubai-gulf-5', 'Бесплатный Wi-Fi'), ('dubai-gulf-5', 'Спортпалуба'), ('dubai-gulf-5', 'Рестораны'),
('norway-fjords-10', 'Полный пансион'), ('norway-fjords-10', 'Экскурсии'), ('norway-fjords-10', 'Гид'), ('norway-fjords-10', 'Научная программа'),
('caribbean-14', 'Все включено Premium'), ('caribbean-14', 'Аквапарк'), ('caribbean-14', 'Казино'), ('caribbean-14', 'Бортовой парк'),
('japan-8', 'Полный пансион'), ('japan-8', 'Культурная программа'), ('japan-8', 'Онсен'), ('japan-8', 'Тематические рестораны'),
('seychelles-7', 'Яхта с экипажем'), ('seychelles-7', 'Приватные пляжи'), ('seychelles-7', 'Сноркелинг'), ('seychelles-7', 'Gourmet ужины'),
('greece-islands-5', 'All Inclusive'), ('greece-islands-5', 'Экскурсии включены'), ('greece-islands-5', 'Греческая кухня'), ('greece-islands-5', 'Ночная жизнь'),
('hawaii-10', 'All Inclusive'), ('hawaii-10', 'Развлечения'), ('hawaii-10', 'Гольф'), ('hawaii-10', 'Спа');

INSERT INTO cruise_cabin_types (cruise_id, cabin_type, price_modifier) VALUES
('mediterranean-7', 'Внутренняя', 1.0), ('mediterranean-7', 'С видом на море', 1.3), ('mediterranean-7', 'С балконом', 1.6), ('mediterranean-7', 'Люкс', 2.2),
('dubai-gulf-5', 'Внутренняя', 1.0), ('dubai-gulf-5', 'С видом на море', 1.25), ('dubai-gulf-5', 'Балкон', 1.5),
('norway-fjords-10', 'Арктическая', 1.0), ('norway-fjords-10', 'Улучшенная', 1.4), ('norway-fjords-10', 'Экспедиционная', 2.0),
('caribbean-14', 'Внутренняя', 1.0), ('caribbean-14', 'С видом на море', 1.3), ('caribbean-14', 'Балкон', 1.7), ('caribbean-14', 'Сьют', 2.5),
('japan-8', 'Внутренняя', 1.0), ('japan-8', 'С видом на море', 1.25), ('japan-8', 'Мини-сьют', 1.5), ('japan-8', 'Балкон', 1.8),
('seychelles-7', 'Каюта', 1.0), ('seychelles-7', 'Каюта делюкс', 1.4), ('seychelles-7', 'Приватная яхта', 2.5),
('greece-islands-5', 'Внутренняя', 1.0), ('greece-islands-5', 'С видом на море', 1.2), ('greece-islands-5', 'Балкон', 1.5),
('hawaii-10', 'Внутренняя', 1.0), ('hawaii-10', 'С видом на море', 1.25), ('hawaii-10', 'Балкон', 1.6), ('hawaii-10', 'Люкс', 2.3);

-- =====================================================
-- FLIGHTS
-- =====================================================
INSERT INTO flights (id, from_city, to_city, airline, departure_time, arrival_time, duration, departure_date, price, old_price, discount, direct_flight, aircraft, image) VALUES
('moscow-antalya', 'Москва (SVO)', 'Анталия (AYT)', 'Aeroflot', '08:30', '12:45', '4ч 15м', '2026-06-15', 18500, 24000, 23, true, 'Boeing 737', 'images/ТурцияАнталия.jpg'),
('spb-dubai', 'Санкт-Петербург (LED)', 'Дубай (DXB)', 'Emirates', '14:20', '22:30', '6ч 10м', '2026-06-20', 42000, 55000, 24, true, 'Airbus A380', 'images/Дубай ОАЭ.jpg'),
('moscow-hurghada', 'Москва (DME)', 'Хургада (HRG)', 'EgyptAir', '06:00', '10:30', '5ч 30м', '2026-06-18', 22000, 28000, 21, true, 'Boeing 737 MAX', 'images/ЕгипетХургада.jpg'),
('spb-phuket', 'Санкт-Петербург (LED)', 'Пхукет (HKT)', 'Qatar Airways', '23:45', '14:20', '10ч 35м', '2026-07-05', 45000, 62000, 27, false, 'Boeing 787 Dreamliner', 'images/Тай Пхукет.jpg'),
('moscow-maldives', 'Москва (SVO)', 'Мале (MLE)', 'Emirates', '09:00', '18:30', '9ч 30м', '2026-08-10', 65000, 85000, 24, false, 'Airbus A350', 'images/Мальдивы.jpg'),
('ekb-barcelona', 'Екатеринбург (SVX)', 'Барселона (BCN)', 'Turkish Airlines', '04:30', '08:45', '7ч 15м', '2026-06-25', 28000, 35000, 20, false, 'Airbus A320', 'images/ИспанияКоста.jpg'),
('moscow-tokyo', 'Москва (SVO)', 'Токио (NRT)', 'S7 Airlines', '11:30', '02:45', '9ч 15м', '2026-09-15', 55000, 72000, 24, true, 'Boeing 777', 'images/Тай Пхукет.jpg'),
('spb-sharm', 'Санкт-Петербург (LED)', 'Шарм-эль-Шейх (SSH)', 'Pobeda', '07:15', '13:30', '6ч 15м', '2026-06-22', 19500, 26000, 25, true, 'Boeing 737', 'images/ХургадаGrandResort.jpg');

-- =====================================================
-- REVIEWS
-- =====================================================
INSERT INTO reviews (hotel_id, name, review_date, rating, text, pros, cons) VALUES
('burj-dubai', 'Александр К.', '2026-02-15', 5, 'Незабываемый опыт! Сервис на высшем уровне. Номер просто потрясающий с видом на Дубай.', '{"Роскошный интерьер", "Отличный сервис", "Приватный пляж"}', '{"Высокая цена"}'),
('burj-dubai', 'Елена М.', '2026-01-20', 5, 'Провели здесь медовый месяц — это было волшебно! Ресторан Sky View просто невероятный.', '{"Романтическая атмосфера", "Ресторан с видом", "SPA"}', '{}'),
('maldives-grand', 'Дмитрий П.', '2026-03-01', 5, 'Мальдивы — это отдельный мир! Водная вилла превзошла все ожидания.', '{"Частный остров", "Водные виллы", "Подводный ресторан"}', '{"Далеко лететь"}'),
('kemer-beach', 'Мария С.', '2026-02-28', 4, 'Отличный семейный отдых! Дети в восторге от аквапарка и анимации.', '{"Аквапарк", "Для детей", "All inclusive"}', '{"Много людей летом"}'),
('palace-antalya', 'Игорь В.', '2026-01-15', 4, 'Хороший отель для спокойного отдыха. Территория большая, персонал приветливый.', '{"Большая территория", "SPA", "Тихий пляж"}', '{"Пляж галечный"}');

-- =====================================================
-- PROMOTIONS
-- =====================================================
INSERT INTO promotions (id, name, title, description, badge, discount, valid_until, image, color) VALUES
('early-booking', 'Раннее бронирование', 'Скидка до 15% при бронировании за 60 дней', 'Забронируйте тур заранее и получите существенную экономию. Акция распространяется на все направления.', 'Раннее бронирование', 15, '2026-06-30', 'images/ТурцияАнталия.jpg', 'primary'),
('last-minute', 'Горящие туры', 'Специальные предложения на ближайшие даты', 'Выгодные цены на туры, вылетающие в течение 2 недель. Успейте забронировать!', 'Hot', 30, NULL, 'images/ХургадаGrandResort.jpg', 'coral'),
('installment', 'Рассрочка 0%', 'Оплачивайте тур частями без переплат', 'До 12 месяцев рассрочки от наших банков-партнёров. Одобрение за 5 минут.', '0%', 0, NULL, 'images/Дубай ОАЭ.jpg', 'gold'),
('family', 'Семейный пакет', 'Бесплатное проживание для детей до 12 лет', 'Специальное предложение для семей с детьми. Дети бесплатно!', 'Kids Free', 20, '2026-08-31', 'images/GrandHaberАнталия.jpg', 'teal'),
('gift', 'Подарочный сертификат', 'Подарите путешествие мечты', 'Сертификат на любую сумму — получатель сам выберет тур, отель и даты.', 'Gift', 0, NULL, 'images/Мальдивы.jpg', 'coral'),
('group', 'Групповая скидка', 'Скидка 10% для групп от 10 человек', 'Отличное предложение для корпоративов, дружеских компаний и семейных торжеств.', 'Group', 10, '2026-12-31', 'images/ЕгипетХургада.jpg', 'primary'),
('vip', 'VIP обслуживание', 'Премиум сервис для особых путешествий', 'Персональный консьерж, бизнес-залы, трансферы на Rolls-Royce и VIP-сопровождение.', 'VIP', 0, NULL, 'images/ДубайBurjAlArab.jpg', 'gold'),
('insurance', 'Страховка в подарок', 'Медицинская страховка бесплатно', 'При бронировании тура от 100 000 рублей — медицинская страховка в подарок.', 'Free', 0, '2026-05-31', 'images/Тай Пхукет.jpg', 'teal');

INSERT INTO promo_features (promotion_id, feature) VALUES
('early-booking', 'Скидка до 15%'), ('early-booking', 'Гарантия лучшей цены'), ('early-booking', 'Бесплатная отмена'),
('last-minute', 'Скидки до 30%'), ('last-minute', 'Быстрое подтверждение'), ('last-minute', 'Туры от 3 ночей'),
('installment', 'До 12 месяцев'), ('installment', 'Без переплат'), ('installment', 'Без первоначального взноса'),
('family', 'Бесплатные дети'), ('family', 'Детский клуб'), ('family', 'Аквапарк'),
('gift', 'Любая сумма'), ('gift', 'Срок действия 1 год'), ('gift', 'Персонализация'),
('group', 'Скидка 10%'), ('group', 'Персональный менеджер'), ('group', 'Программа лояльности'),
('vip', 'Личный консьерж'), ('vip', 'VIP трансферы'), ('vip', 'Приоритетное обслуживание'),
('insurance', 'Покрытие 50 000 EUR'), ('insurance', 'Спорт и активности'), ('insurance', 'Горячая линия 24/7');

-- =====================================================
-- COMPANIES
-- =====================================================
INSERT INTO companies (name, type, website) VALUES
('Aeroflot', 'airline', 'https://aeroflot.ru'),
('Emirates', 'airline', 'https://emirates.com'),
('EgyptAir', 'airline', 'https://egyptair.com'),
('Qatar Airways', 'airline', 'https://qatarairways.com'),
('Turkish Airlines', 'airline', 'https://turkishairlines.com'),
('S7 Airlines', 'airline', 'https://s7.ru'),
('Pobeda', 'airline', 'https://pobeda.aero'),
('Costa Cruises', 'cruise', 'https://costacruises.com'),
('AIDA Cruises', 'cruise', 'https://aida.de'),
('Hurtigruten', 'cruise', 'https://hurtigruten.com'),
('Royal Caribbean', 'cruise', 'https://royalcaribbean.com'),
('Princess Cruises', 'cruise', 'https://princess.com'),
('The Moorings', 'cruise', 'https://moorings.com'),
('Celestyal Cruises', 'cruise', 'https://celestyal.com'),
('Norwegian Cruise Line', 'cruise', 'https://ncl.com');
