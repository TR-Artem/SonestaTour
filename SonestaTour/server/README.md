# SonestaTour PostgreSQL Backend

Серверная часть на Node.js + Express с PostgreSQL базой данных.

## Структура файлов

```
server/
├── db.js           # Подключение к PostgreSQL пулу
├── server.js       # Express API сервер
├── schema.sql     # Таблицы БД
├── seed.sql       # Начальные данные (все туры, отели, круизы и т.д.)
└── package.json   # Зависимости npm
```

## Установка и запуск

### 1. Установка PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:** скачать с https://www.postgresql.org/download/

### 2. Создание базы данных

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE sonestatour;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE sonestatour TO postgres;
\q
```

### 3. Установка зависимостей и запуск сервера

```bash
cd server
npm install
```

Создайте файл `.env` (скопируйте из `.env.example`) и укажите пароль:
```bash
DB_PASSWORD=your_password
```

Инициализация БД:
```bash
psql postgres://postgres:your_password@localhost:5432/sonestatour -f schema.sql
psql postgres://postgres:your_password@localhost:5432/sonestatour -f seed.sql
```

Запуск сервера:
```bash
npm start
# Сервер запустится на порту 3000
```

### 4. Подключение Frontend

Frontend на порту 8888 автоматически определит API и будет использовать базу данных. Если API недоступен — используется локальный data.js.

## API Endpoints

| Endpoint | Метод | Описание |
|---|:---:|---|
| `/api/health` | GET | Проверка работы сервера |
| `/api/destinations` | GET | Все направления |
| `/api/hotels` | GET | Отели (фильтры: category, minPrice, maxPrice, stars, search) |
| `/api/hotels/:id` | GET | Детали отеля |
| `/api/tours` | GET | Туры (фильтры: destination, duration, hot, search) |
| `/api/tours/:id` | GET | Детали тура |
| `/api/cruises` | GET | Круизы (фильтры: duration, minPrice, maxPrice) |
| `/api/cruises/:id` | GET | Детали круиза |
| `/api/flights` | GET | Авиабилеты (фильтры: from, to, date, direct) |
| `/api/flights/:id` | GET | Детали билета |
| `/api/promotions` | GET | Акции |
| `/api/reviews` | GET | Отзывы |
| `/api/applications` | POST | Отправка заявки |
| `/api/applications` | GET | Все заявки |
| `/api/favorites` | GET | Избранное |
| `/api/search?q=` | GET | Поиск |
| `/api/stats` | GET | Статистика (для админки) |

## Схема базы данных

### Основные таблицы

- `destinations` — направления (страны)
- `hotels` — отели
- `room_types` — типы номеров
- `amenities` — удобства отелей
- `tours` — туры
- `cruises` — круизы
- `flights` — авиабилеты
- `promotions` — акции
- `reviews` — отзывы
- `applications` — заявки клиентов
- `favorites` — избранное
- `companies` — авиакомпании и круизные линии

## Docker (опционально)

```bash
# Создание контейнера с PostgreSQL
docker run -d \
  --name sonestatour-db \
  -e POSTGRES_DB=sonestatour \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  postgres:16-alpine

# Запуск миграций
docker exec -i sonestatour-db psql -U postgres -d sonestatour < schema.sql
docker exec -i sonestatour-db psql -U postgres -d sonestatour < seed.sql
```

## Деплой

Для деплоя на Railway/Render/Heroku используйте:
- **Build Command:** `cd server && npm install`
- **Start Command:** `cd server && npm start`
- Добавьте переменную окружения `DATABASE_URL` с вашим connection string
