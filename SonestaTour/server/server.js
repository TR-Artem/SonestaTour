const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { query } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// =====================================================
// HEALTH CHECK
// =====================================================
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// =====================================================
// DESTINATIONS
// =====================================================
app.get('/api/destinations', async (req, res) => {
    try {
        const result = await query(`
            SELECT d.*, 
                   COALESCE(json_agg(dc.city) FILTER (WHERE dc.city IS NOT NULL), '[]') as cities
            FROM destinations d
            LEFT JOIN destination_cities dc ON d.id = dc.destination_id
            GROUP BY d.id
            ORDER BY d.name
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/destinations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(`
            SELECT d.*, 
                   COALESCE(json_agg(dc.city) FILTER (WHERE dc.city IS NOT NULL), '[]') as cities
            FROM destinations d
            LEFT JOIN destination_cities dc ON d.id = dc.destination_id
            WHERE d.id = $1
            GROUP BY d.id
        `, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Destination not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching destination:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// HOTELS
// =====================================================
app.get('/api/hotels', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, stars, search, limit = 100, offset = 0 } = req.query;
        
        let sql = `
            SELECT h.*, 
                   COALESCE(json_agg(DISTINCT hi.image_url) FILTER (WHERE hi.image_url IS NOT NULL), '[]') as images,
                   COALESCE(json_agg(DISTINCT rt.*) FILTER (WHERE rt.id IS NOT NULL), '[]') as room_types
            FROM hotels h
            LEFT JOIN hotel_images hi ON h.id = hi.hotel_id
            LEFT JOIN room_types rt ON h.id = rt.hotel_id
            WHERE 1=1
        `;
        const params = [];
        let paramIndex = 1;

        if (category) {
            sql += ` AND h.category = $${paramIndex++}`;
            params.push(category);
        }
        if (minPrice) {
            sql += ` AND h.price >= $${paramIndex++}`;
            params.push(parseInt(minPrice));
        }
        if (maxPrice) {
            sql += ` AND h.price <= $${paramIndex++}`;
            params.push(parseInt(maxPrice));
        }
        if (stars) {
            sql += ` AND h.stars >= $${paramIndex++}`;
            params.push(parseInt(stars));
        }
        if (search) {
            sql += ` AND (h.name ILIKE $${paramIndex} OR h.location ILIKE $${paramIndex} OR h.description ILIKE $${paramIndex})`;
            params.push(`%${search}%`);
            paramIndex++;
        }

        sql += ` GROUP BY h.id ORDER BY h.rating DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
        params.push(parseInt(limit), parseInt(offset));

        const result = await query(sql, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/hotels/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(`
            SELECT h.*,
                   COALESCE(json_agg(DISTINCT hi.image_url) FILTER (WHERE hi.image_url IS NOT NULL), '[]') as images,
                   COALESCE(json_agg(DISTINCT rt.*) FILTER (WHERE rt.id IS NOT NULL), '[]') as room_types,
                   COALESCE(json_agg(DISTINCT a.name) FILTER (WHERE a.name IS NOT NULL), '[]') as amenities_list
            FROM hotels h
            LEFT JOIN hotel_images hi ON h.id = hi.hotel_id
            LEFT JOIN room_types rt ON h.id = rt.hotel_id
            LEFT JOIN hotel_amenities ha ON h.id = ha.hotel_id
            LEFT JOIN amenities a ON ha.amenity_id = a.id
            WHERE h.id = $1
            GROUP BY h.id
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching hotel:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// TOURS
// =====================================================
app.get('/api/tours', async (req, res) => {
    try {
        const { destination, duration, minPrice, maxPrice, hot, search } = req.query;
        
        let sql = `
            SELECT t.*, 
                   COALESCE(json_agg(th.highlight ORDER BY th.sort_order) FILTER (WHERE th.highlight IS NOT NULL), '[]') as highlights,
                   d.name as destination_name, d.flag as destination_flag
            FROM tours t
            LEFT JOIN tour_highlights th ON t.id = th.tour_id
            LEFT JOIN destinations d ON t.destination_id = d.id
            WHERE 1=1
        `;
        const params = [];
        let paramIndex = 1;

        if (destination) {
            sql += ` AND t.destination_id = $${paramIndex++}`;
            params.push(destination);
        }
        if (duration) {
            sql += ` AND t.duration = $${paramIndex++}`;
            params.push(parseInt(duration));
        }
        if (minPrice) {
            sql += ` AND t.price >= $${paramIndex++}`;
            params.push(parseInt(minPrice));
        }
        if (maxPrice) {
            sql += ` AND t.price <= $${paramIndex++}`;
            params.push(parseInt(maxPrice));
        }
        if (hot === 'true') {
            sql += ` AND t.is_hot = true`;
        }
        if (search) {
            sql += ` AND (t.name ILIKE $${paramIndex} OR t.description ILIKE $${paramIndex})`;
            params.push(`%${search}%`);
            paramIndex++;
        }

        sql += ` GROUP BY t.id, d.id ORDER BY t.rating DESC`;

        const result = await query(sql, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching tours:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/tours/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(`
            SELECT t.*,
                   COALESCE(json_agg(th.highlight ORDER BY th.sort_order) FILTER (WHERE th.highlight IS NOT NULL), '[]') as highlights,
                   d.name as destination_name, d.flag as destination_flag, d.country as destination_country
            FROM tours t
            LEFT JOIN tour_highlights th ON t.id = th.tour_id
            LEFT JOIN destinations d ON t.destination_id = d.id
            WHERE t.id = $1
            GROUP BY t.id, d.id
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tour not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching tour:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// CRUISES
// =====================================================
app.get('/api/cruises', async (req, res) => {
    try {
        const { duration, minPrice, maxPrice, departure } = req.query;
        
        let sql = `
            SELECT c.*,
                   COALESCE(json_agg(cp.port_name ORDER BY cp.sort_order) FILTER (WHERE cp.port_name IS NOT NULL), '[]') as ports,
                   COALESCE(json_agg(cf.feature) FILTER (WHERE cf.feature IS NOT NULL), '[]') as features,
                   COALESCE(json_agg(json_build_object('type', cct.cabin_type, 'modifier', cct.price_modifier)) FILTER (WHERE cct.cabin_type IS NOT NULL), '[]') as cabin_types
            FROM cruises c
            LEFT JOIN cruise_ports cp ON c.id = cp.cruise_id
            LEFT JOIN cruise_features cf ON c.id = cf.cruise_id
            LEFT JOIN cruise_cabin_types cct ON c.id = cct.cruise_id
            WHERE 1=1
        `;
        const params = [];
        let paramIndex = 1;

        if (duration) {
            sql += ` AND c.duration <= $${paramIndex++}`;
            params.push(parseInt(duration));
        }
        if (minPrice) {
            sql += ` AND c.price >= $${paramIndex++}`;
            params.push(parseInt(minPrice));
        }
        if (maxPrice) {
            sql += ` AND c.price <= $${paramIndex++}`;
            params.push(parseInt(maxPrice));
        }
        if (departure) {
            sql += ` AND c.departure_date >= $${paramIndex++}`;
            params.push(departure);
        }

        sql += ` GROUP BY c.id ORDER BY c.departure_date`;

        const result = await query(sql, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching cruises:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/cruises/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(`
            SELECT c.*,
                   COALESCE(json_agg(cp.port_name ORDER BY cp.sort_order) FILTER (WHERE cp.port_name IS NOT NULL), '[]') as ports,
                   COALESCE(json_agg(cf.feature) FILTER (WHERE cf.feature IS NOT NULL), '[]') as features,
                   COALESCE(json_agg(json_build_object('type', cct.cabin_type, 'modifier', cct.price_modifier)) FILTER (WHERE cct.cabin_type IS NOT NULL), '[]') as cabin_types
            FROM cruises c
            LEFT JOIN cruise_ports cp ON c.id = cp.cruise_id
            LEFT JOIN cruise_features cf ON c.id = cf.cruise_id
            LEFT JOIN cruise_cabin_types cct ON c.id = cct.cruise_id
            WHERE c.id = $1
            GROUP BY c.id
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cruise not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching cruise:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// FLIGHTS
// =====================================================
app.get('/api/flights', async (req, res) => {
    try {
        const { from, to, date, minPrice, maxPrice, direct } = req.query;
        
        let sql = `
            SELECT f.*,
                   COALESCE(json_agg(fs.stop_name) FILTER (WHERE fs.stop_name IS NOT NULL), '[]') as stops
            FROM flights f
            LEFT JOIN flight_stops fs ON f.id = fs.flight_id
            WHERE 1=1
        `;
        const params = [];
        let paramIndex = 1;

        if (from) {
            sql += ` AND f.from_city ILIKE $${paramIndex++}`;
            params.push(`%${from}%`);
        }
        if (to) {
            sql += ` AND f.to_city ILIKE $${paramIndex++}`;
            params.push(`%${to}%`);
        }
        if (date) {
            sql += ` AND f.departure_date = $${paramIndex++}`;
            params.push(date);
        }
        if (minPrice) {
            sql += ` AND f.price >= $${paramIndex++}`;
            params.push(parseInt(minPrice));
        }
        if (maxPrice) {
            sql += ` AND f.price <= $${paramIndex++}`;
            params.push(parseInt(maxPrice));
        }
        if (direct === 'true') {
            sql += ` AND f.direct_flight = true`;
        }

        sql += ` GROUP BY f.id ORDER BY f.departure_date, f.departure_time`;

        const result = await query(sql, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/flights/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(`
            SELECT f.*,
                   COALESCE(json_agg(json_build_object('stop', fs.stop_name, 'duration', fs.duration)) FILTER (WHERE fs.stop_name IS NOT NULL), '[]') as stops
            FROM flights f
            LEFT JOIN flight_stops fs ON f.id = fs.flight_id
            WHERE f.id = $1
            GROUP BY f.id
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Flight not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching flight:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// REVIEWS
// =====================================================
app.get('/api/reviews', async (req, res) => {
    try {
        const { hotelId, limit = 50 } = req.query;
        
        let sql = `
            SELECT r.*, h.name as hotel_name
            FROM reviews r
            LEFT JOIN hotels h ON r.hotel_id = h.id
            WHERE 1=1
        `;
        const params = [];
        let paramIndex = 1;

        if (hotelId) {
            sql += ` AND r.hotel_id = $${paramIndex++}`;
            params.push(hotelId);
        }

        sql += ` ORDER BY r.created_at DESC LIMIT $${paramIndex++}`;
        params.push(parseInt(limit));

        const result = await query(sql, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// PROMOTIONS
// =====================================================
app.get('/api/promotions', async (req, res) => {
    try {
        const { active } = req.query;
        
        let sql = `
            SELECT p.*,
                   COALESCE(json_agg(pf.feature) FILTER (WHERE pf.feature IS NOT NULL), '[]') as features
            FROM promotions p
            LEFT JOIN promo_features pf ON p.id = pf.promotion_id
            WHERE 1=1
        `;

        if (active === 'true') {
            sql += ` AND (p.valid_until IS NULL OR p.valid_until >= CURRENT_DATE)`;
        }

        sql += ` GROUP BY p.id ORDER BY p.discount DESC NULLS LAST`;

        const result = await query(sql);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching promotions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/promotions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(`
            SELECT p.*,
                   COALESCE(json_agg(pf.feature) FILTER (WHERE pf.feature IS NOT NULL), '[]') as features
            FROM promotions p
            LEFT JOIN promo_features pf ON p.id = pf.promotion_id
            WHERE p.id = $1
            GROUP BY p.id
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Promotion not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching promotion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// BOOKINGS / APPLICATIONS
// =====================================================
app.post('/api/applications', async (req, res) => {
    try {
        const { type, itemId, itemName, name, phone, email, guests, comment } = req.body;

        if (!type || !name || !phone) {
            return res.status(400).json({ error: 'Missing required fields: type, name, phone' });
        }

        const result = await query(`
            INSERT INTO applications (type, item_id, item_name, name, phone, email, guests, comment)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `, [type, itemId, itemName, name, phone, email, guests || 1, comment]);

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            application: result.rows[0]
        });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/applications', async (req, res) => {
    try {
        const { status, type, limit = 100 } = req.query;
        
        let sql = `SELECT * FROM applications WHERE 1=1`;
        const params = [];
        let paramIndex = 1;

        if (status) {
            sql += ` AND status = $${paramIndex++}`;
            params.push(status);
        }
        if (type) {
            sql += ` AND type = $${paramIndex++}`;
            params.push(type);
        }

        sql += ` ORDER BY submitted_at DESC LIMIT $${paramIndex++}`;
        params.push(parseInt(limit));

        const result = await query(sql, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/api/applications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const result = await query(`
            UPDATE applications SET status = $1 WHERE id = $2 RETURNING *
        `, [status, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// FAVORITES
// =====================================================
app.get('/api/favorites', async (req, res) => {
    try {
        const sessionId = req.headers['x-session-id'] || req.query.sessionId;
        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID required' });
        }

        const result = await query(`
            SELECT item_type, item_id, created_at 
            FROM favorites 
            WHERE session_id = $1
        `, [sessionId]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/favorites', async (req, res) => {
    try {
        const { itemType, itemId } = req.body;
        const sessionId = req.headers['x-session-id'];

        if (!sessionId || !itemType || !itemId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await query(`
            INSERT INTO favorites (session_id, item_type, item_id)
            VALUES ($1, $2, $3)
            ON CONFLICT (session_id, item_type, item_id) DO NOTHING
        `, [sessionId, itemType, itemId]);

        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/favorites', async (req, res) => {
    try {
        const { itemType, itemId } = req.query;
        const sessionId = req.headers['x-session-id'];

        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID required' });
        }

        let sql = `DELETE FROM favorites WHERE session_id = $1`;
        const params = [sessionId];
        let paramIndex = 2;

        if (itemType) {
            sql += ` AND item_type = $${paramIndex++}`;
            params.push(itemType);
        }
        if (itemId) {
            sql += ` AND item_id = $${paramIndex++}`;
            params.push(itemId);
        }

        await query(sql, params);

        res.json({ success: true });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// SEARCH
// =====================================================
app.get('/api/search', async (req, res) => {
    try {
        const { q, limit = 10 } = req.query;
        
        if (!q || q.length < 2) {
            return res.json({ hotels: [], tours: [], destinations: [] });
        }

        const searchPattern = `%${q}%`;

        const [hotels, tours, destinations] = await Promise.all([
            query(`SELECT id, name, location as subtitle, 'hotel' as type, main_image as image, price, rating 
                   FROM hotels WHERE name ILIKE $1 LIMIT $2`, [searchPattern, limit]),
            query(`SELECT id, name, hotel as subtitle, 'tour' as type, image, price, rating 
                   FROM tours WHERE name ILIKE $1 LIMIT $2`, [searchPattern, limit]),
            query(`SELECT id, name, country as subtitle, 'destination' as type, image, base_price as price 
                   FROM destinations WHERE name ILIKE $1 OR country ILIKE $1 LIMIT $2`, [searchPattern, limit])
        ]);

        res.json({
            hotels: hotels.rows,
            tours: tours.rows,
            destinations: destinations.rows
        });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// STATISTICS (for admin)
// =====================================================
app.get('/api/stats', async (req, res) => {
    try {
        const [
            totalHotels,
            totalTours,
            totalCruises,
            totalFlights,
            totalPromotions,
            recentApplications,
            topHotels
        ] = await Promise.all([
            query('SELECT COUNT(*) as count FROM hotels'),
            query('SELECT COUNT(*) as count FROM tours'),
            query('SELECT COUNT(*) as count FROM cruises'),
            query('SELECT COUNT(*) as count FROM flights'),
            query('SELECT COUNT(*) as count FROM promotions'),
            query(`SELECT COUNT(*) as count FROM applications WHERE submitted_at > NOW() - INTERVAL '24 hours'`),
            query(`SELECT name, rating, reviews_count FROM hotels ORDER BY rating DESC LIMIT 5`)
        ]);

        res.json({
            totalHotels: parseInt(totalHotels.rows[0].count),
            totalTours: parseInt(totalTours.rows[0].count),
            totalCruises: parseInt(totalCruises.rows[0].count),
            totalFlights: parseInt(totalFlights.rows[0].count),
            totalPromotions: parseInt(totalPromotions.rows[0].count),
            recentApplications: parseInt(recentApplications.rows[0].count),
            topHotels: topHotels.rows
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// CATCH-ALL ROUTE FOR SPA
// =====================================================
app.get('*', (req, res) => {
    // Serve static files for known routes
    const knownRoutes = ['/', '/index.html', '/hotels.html', '/tours.html', '/flights.html', '/cruises.html', '/promotions.html'];
    if (knownRoutes.includes(req.path) || req.path.endsWith('.html')) {
        return res.sendFile(path.join(__dirname, '..', req.path === '/' ? 'index.html' : req.path));
    }
    res.status(404).json({ error: 'Not found' });
});

// =====================================================
// ERROR HANDLER
// =====================================================
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SonestaTour API server running on port ${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health`);
    console.log(`   API endpoints: http://localhost:${PORT}/api/`);
});
