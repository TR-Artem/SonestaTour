-- =====================================================
-- SONESTATOUR PostgreSQL DATABASE SCHEMA
-- =====================================================

-- Drop tables if exist (in reverse dependency order)
DROP TABLE IF EXISTS promo_features CASCADE;
DROP TABLE IF EXISTS promotion_validity CASCADE;
DROP TABLE IF EXISTS promo_terms CASCADE;
DROP TABLE IF EXISTS room_type_amenities CASCADE;
DROP TABLE IF EXISTS room_types CASCADE;
DROP TABLE IF EXISTS hotel_amenities CASCADE;
DROP TABLE IF EXISTS booking_requests CASCADE;
DROP TABLE IF EXISTS hotel_reviews CASCADE;
DROP TABLE IF EXISTS cruise_cabin_types CASCADE;
DROP TABLE IF EXISTS cruise_features CASCADE;
DROP TABLE IF EXISTS cruise_ports CASCADE;
DROP TABLE IF EXISTS flight_stops CASCADE;
DROP TABLE IF EXISTS tour_highlights CASCADE;
DROP TABLE IF EXISTS destination_cities CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS hotels CASCADE;
DROP TABLE IF EXISTS tours CASCADE;
DROP TABLE IF EXISTS cruises CASCADE;
DROP TABLE IF EXISTS flights CASCADE;
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS destinations CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- =====================================================
-- COMPANIES (airlines, cruise lines)
-- =====================================================
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('airline', 'cruise')),
    logo VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DESTINATIONS
-- =====================================================
CREATE TABLE destinations (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    flag VARCHAR(10),
    base_price INTEGER,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE destination_cities (
    id SERIAL PRIMARY KEY,
    destination_id VARCHAR(50) REFERENCES destinations(id) ON DELETE CASCADE,
    city VARCHAR(100) NOT NULL
);

CREATE INDEX idx_destination_cities_destination ON destination_cities(destination_id);

-- =====================================================
-- HOTELS
-- =====================================================
CREATE TABLE hotels (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    stars INTEGER CHECK (stars BETWEEN 1 AND 7),
    price INTEGER,
    category VARCHAR(20) CHECK (category IN ('premium', 'comfort', 'budget')),
    description TEXT,
    features TEXT[], -- array of features
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5),
    reviews_count INTEGER DEFAULT 0,
    main_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotel_images (
    id SERIAL PRIMARY KEY,
    hotel_id VARCHAR(50) REFERENCES hotels(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE room_types (
    id SERIAL PRIMARY KEY,
    hotel_id VARCHAR(50) REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    area INTEGER,
    max_guests INTEGER DEFAULT 2,
    price INTEGER
);

CREATE TABLE amenities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE hotel_amenities (
    hotel_id VARCHAR(50) REFERENCES hotels(id) ON DELETE CASCADE,
    amenity_id INTEGER REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (hotel_id, amenity_id)
);

CREATE INDEX idx_hotels_category ON hotels(category);
CREATE INDEX idx_hotels_rating ON hotels(rating DESC);
CREATE INDEX idx_hotels_price ON hotels(price);
CREATE INDEX idx_room_types_hotel ON room_types(hotel_id);

-- =====================================================
-- TOURS
-- =====================================================
CREATE TABLE tours (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    hotel VARCHAR(200),
    destination_id VARCHAR(50) REFERENCES destinations(id),
    duration INTEGER,
    nutrition VARCHAR(50),
    price INTEGER,
    discount INTEGER DEFAULT 0,
    old_price INTEGER,
    description TEXT,
    image VARCHAR(255),
    is_hot BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tour_highlights (
    id SERIAL PRIMARY KEY,
    tour_id VARCHAR(50) REFERENCES tours(id) ON DELETE CASCADE,
    highlight VARCHAR(100) NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_tours_destination ON tours(destination_id);
CREATE INDEX idx_tours_hot ON tours(is_hot);
CREATE INDEX idx_tours_rating ON tours(rating DESC);

-- =====================================================
-- CRUISES
-- =====================================================
CREATE TABLE cruises (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    company VARCHAR(100),
    ship VARCHAR(100),
    route VARCHAR(255),
    duration INTEGER,
    departure_date DATE,
    price INTEGER,
    old_price INTEGER,
    discount INTEGER DEFAULT 0,
    description TEXT,
    image VARCHAR(255),
    rating DECIMAL(2,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cruise_ports (
    id SERIAL PRIMARY KEY,
    cruise_id VARCHAR(50) REFERENCES cruises(id) ON DELETE CASCADE,
    port_name VARCHAR(100) NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE cruise_features (
    id SERIAL PRIMARY KEY,
    cruise_id VARCHAR(50) REFERENCES cruises(id) ON DELETE CASCADE,
    feature VARCHAR(100) NOT NULL
);

CREATE TABLE cruise_cabin_types (
    id SERIAL PRIMARY KEY,
    cruise_id VARCHAR(50) REFERENCES cruises(id) ON DELETE CASCADE,
    cabin_type VARCHAR(50) NOT NULL,
    price_modifier DECIMAL(5,2) DEFAULT 1.0
);

CREATE INDEX idx_cruises_departure ON cruises(departure_date);
CREATE INDEX idx_cruises_price ON cruises(price);
CREATE INDEX idx_cruise_ports ON cruise_ports(cruise_id);

-- =====================================================
-- FLIGHTS
-- =====================================================
CREATE TABLE flights (
    id VARCHAR(50) PRIMARY KEY,
    from_city VARCHAR(100) NOT NULL,
    to_city VARCHAR(100) NOT NULL,
    airline VARCHAR(100),
    departure_time VARCHAR(10),
    arrival_time VARCHAR(10),
    duration VARCHAR(20),
    departure_date DATE,
    price INTEGER,
    old_price INTEGER,
    discount INTEGER DEFAULT 0,
    direct_flight BOOLEAN DEFAULT TRUE,
    aircraft VARCHAR(100),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE flight_stops (
    id SERIAL PRIMARY KEY,
    flight_id VARCHAR(50) REFERENCES flights(id) ON DELETE CASCADE,
    stop_name VARCHAR(100),
    duration VARCHAR(20)
);

CREATE INDEX idx_flights_departure ON flights(departure_date);
CREATE INDEX idx_flights_price ON flights(price);

-- =====================================================
-- REVIEWS
-- =====================================================
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    hotel_id VARCHAR(50) REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    review_date DATE,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    text TEXT,
    pros TEXT[],
    cons TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_hotel ON reviews(hotel_id);

-- =====================================================
-- PROMOTIONS
-- =====================================================
CREATE TABLE promotions (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    badge VARCHAR(50),
    discount INTEGER DEFAULT 0,
    valid_until DATE,
    image VARCHAR(255),
    color VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE promo_features (
    id SERIAL PRIMARY KEY,
    promotion_id VARCHAR(50) REFERENCES promotions(id) ON DELETE CASCADE,
    feature VARCHAR(100) NOT NULL
);

CREATE INDEX idx_promotions_valid ON promotions(valid_until);

-- =====================================================
-- BOOKINGS & APPLICATIONS
-- =====================================================
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('hotel', 'tour', 'cruise', 'flight', 'promotion')),
    item_id VARCHAR(50),
    item_name VARCHAR(200),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(100),
    guests INTEGER DEFAULT 1,
    comment TEXT,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'processing', 'completed', 'cancelled')),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_applications_type ON applications(type);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_date ON applications(submitted_at DESC);

-- =====================================================
-- FAVORITES (for user preferences)
-- =====================================================
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100),
    item_type VARCHAR(20) NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(session_id, item_type, item_id)
);

CREATE INDEX idx_favorites_session ON favorites(session_id);

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for hotels with full info
CREATE OR REPLACE VIEW v_hotels_full AS
SELECT 
    h.*,
    COALESCE(json_agg(DISTINCT jsonb_build_object('id', ri.id, 'url', ri.image_url)) 
        FILTER (WHERE ri.id IS NOT NULL), '[]') as images,
    COALESCE(json_agg(DISTINCT rt.*) FILTER (WHERE rt.id IS NOT NULL), '[]') as room_types
FROM hotels h
LEFT JOIN hotel_images ri ON h.id = ri.hotel_id
LEFT JOIN room_types rt ON h.id = rt.hotel_id
GROUP BY h.id;

-- =====================================================
-- TRIGGERS FOR UPDATING COUNTS
-- =====================================================
CREATE OR REPLACE FUNCTION update_hotel_reviews_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE hotels SET reviews_count = reviews_count + 1 WHERE id = NEW.hotel_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE hotels SET reviews_count = reviews_count - 1 WHERE id = OLD.hotel_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_hotel_reviews_count ON reviews;
CREATE TRIGGER trigger_hotel_reviews_count
AFTER INSERT OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_hotel_reviews_count();
