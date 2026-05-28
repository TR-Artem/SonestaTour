// ===== ОСНОВНЫЕ ФУНКЦИИ САЙТА =====

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    initSearch();
    initFavorites();
    initFilters();
    initModals();
    initBookingForm();
    initReviews();
    updateFavoritesCount();
    loadFavoritesFromStorage();
}

// ===== ПОИСК =====

function initSearch() {
    const searchForm = document.getElementById('tour-search');
    if (searchForm) {
        searchForm.addEventListener('submit', handleTourSearch);
    }
    
    const destinationInput = document.querySelector('input[name="destination"]');
    if (destinationInput) {
        destinationInput.addEventListener('input', handleDestinationInput);
        destinationInput.addEventListener('focus', handleDestinationInput);
    }
}

function handleTourSearch(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        origin: form.origin.value,
        destination: form.destination.value,
        dateFrom: form.date_from.value,
        nights: form.nights.value,
        people: form.people.value
    };
    
    sessionStorage.setItem('searchParams', JSON.stringify(data));
    
    let url = 'tours.html?';
    if (data.destination) url += 'dest=' + encodeURIComponent(data.destination) + '&';
    if (data.nights) url += 'nights=' + data.nights + '&';
    if (data.people) url += 'people=' + data.people + '&';
    
    window.location.href = url;
}

function handleDestinationInput(e) {
    const input = e.target;
    const value = input.value.toLowerCase();
    
    if (value.length < 2) {
        hideAutocomplete();
        return;
    }
    
    const data = window.SonestaData;
    if (!data) return;
    
    const matches = data.destinations.filter(d => 
        d.name.toLowerCase().includes(value) ||
        d.country.toLowerCase().includes(value) ||
        d.cities.some(c => c.toLowerCase().includes(value))
    );
    
    if (matches.length > 0) {
        showAutocomplete(input, matches);
    } else {
        hideAutocomplete();
    }
}

function showAutocomplete(input, matches) {
    hideAutocomplete();
    
    const container = document.createElement('div');
    container.className = 'autocomplete-container';
    container.id = 'autocomplete';
    
    matches.forEach(match => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.innerHTML = '<span class="dest-flag">' + match.flag + '</span>' +
            '<span class="dest-name">' + match.name + '</span>' +
            '<span class="dest-cities">' + match.cities.slice(0, 3).join(', ') + '</span>';
        item.addEventListener('click', function() {
            input.value = match.name;
            hideAutocomplete();
        });
        container.appendChild(item);
    });
    
    input.parentNode.appendChild(container);
}

function hideAutocomplete() {
    const existing = document.getElementById('autocomplete');
    if (existing) existing.remove();
}

// ===== ИЗБРАННОЕ =====

function initFavorites() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-favorite')) {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(e.target.closest('.btn-favorite'));
        }
    });
}

function toggleFavorite(btn) {
    const itemId = btn.dataset.id;
    const itemType = btn.dataset.type;
    
    let favorites = JSON.parse(localStorage.getItem('sonestaFavorites') || '{}');
    const key = itemType + '_' + itemId;
    
    if (favorites[key]) {
        delete favorites[key];
        btn.classList.remove('active');
        btn.innerHTML = '\u2661';
        showNotification('\u0423\u0434\u0430\u043b\u0435\u043d\u043e \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0433\u043e');
    } else {
        favorites[key] = { id: itemId, type: itemType, addedAt: Date.now() };
        btn.classList.add('active');
        btn.innerHTML = '\u2665';
        showNotification('\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435');
    }
    
    localStorage.setItem('sonestaFavorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

function updateFavoritesCount() {
    const favCount = document.querySelector('.favorites-count');
    if (favCount) {
        const favorites = JSON.parse(localStorage.getItem('sonestaFavorites') || '{}');
        const count = Object.keys(favorites).length;
        favCount.textContent = count;
        favCount.style.display = count > 0 ? 'flex' : 'none';
    }
}

function loadFavoritesFromStorage() {
    const favorites = JSON.parse(localStorage.getItem('sonestaFavorites') || '{}');
    
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        const itemId = btn.dataset.id;
        const itemType = btn.dataset.type;
        const key = itemType + '_' + itemId;
        
        if (favorites[key]) {
            btn.classList.add('active');
            btn.innerHTML = '\u2665';
        }
    });
}

function isInFavorites(id, type) {
    const favorites = JSON.parse(localStorage.getItem('sonestaFavorites') || '{}');
    return !!favorites[type + '_' + id];
}

// ===== ФИЛЬТРЫ =====

let currentFilters = {
    destination: '',
    nights: '',
    priceMin: '',
    priceMax: '',
    stars: '',
    nutrition: '',
    sort: 'popular'
};

function initFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('dest')) {
        currentFilters.destination = urlParams.get('dest');
        const destInput = document.querySelector('input[name="search-destination"]');
        if (destInput) destInput.value = currentFilters.destination;
    }
    if (urlParams.get('nights')) {
        currentFilters.nights = urlParams.get('nights');
    }
    if (urlParams.get('people')) {
        currentFilters.people = urlParams.get('people');
    }
    
    bindFilterHandlers();
    
    const toursGrid = document.getElementById('tours-grid');
    if (toursGrid) {
        applyFilters();
    }
}

function bindFilterHandlers() {
    const destFilter = document.getElementById('filter-destination');
    if (destFilter) {
        destFilter.addEventListener('change', function(e) {
            currentFilters.destination = e.target.value;
            applyFilters();
        });
    }
    
    const priceMinFilter = document.getElementById('filter-price-min');
    const priceMaxFilter = document.getElementById('filter-price-max');
    if (priceMinFilter) {
        priceMinFilter.addEventListener('change', function(e) {
            currentFilters.priceMin = e.target.value;
            applyFilters();
        });
    }
    if (priceMaxFilter) {
        priceMaxFilter.addEventListener('change', function(e) {
            currentFilters.priceMax = e.target.value;
            applyFilters();
        });
    }
    
    const starsFilter = document.getElementById('filter-stars');
    if (starsFilter) {
        starsFilter.addEventListener('change', function(e) {
            currentFilters.stars = e.target.value;
            applyFilters();
        });
    }
    
    const sortFilter = document.getElementById('filter-sort');
    if (sortFilter) {
        sortFilter.addEventListener('change', function(e) {
            currentFilters.sort = e.target.value;
            applyFilters();
        });
    }
    
    const categoryFilter = document.getElementById('filter-category');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            currentFilters.category = e.target.value;
            applyHotelFilters();
        });
    }
}

function applyFilters() {
    const toursGrid = document.getElementById('tours-grid');
    if (!toursGrid) return;
    
    const data = window.SonestaData;
    if (!data) return;
    
    let filteredTours = data.tours.slice();
    
    if (currentFilters.destination) {
        filteredTours = filteredTours.filter(function(t) { 
            return t.destination.toLowerCase().includes(currentFilters.destination.toLowerCase()) ||
                t.name.toLowerCase().includes(currentFilters.destination.toLowerCase());
        });
    }
    
    if (currentFilters.priceMin) {
        filteredTours = filteredTours.filter(function(t) { return t.price >= parseInt(currentFilters.priceMin); });
    }
    if (currentFilters.priceMax) {
        filteredTours = filteredTours.filter(function(t) { return t.price <= parseInt(currentFilters.priceMax); });
    }
    
    switch (currentFilters.sort) {
        case 'price-asc':
            filteredTours.sort(function(a, b) { return a.price - b.price; });
            break;
        case 'price-desc':
            filteredTours.sort(function(a, b) { return b.price - a.price; });
            break;
        case 'discount':
            filteredTours.sort(function(a, b) { return (b.discount || 0) - (a.discount || 0); });
            break;
        case 'rating':
            filteredTours.sort(function(a, b) { return (b.rating || 0) - (a.rating || 0); });
            break;
        default:
            filteredTours.sort(function(a, b) { return (b.hot ? 1 : 0) - (a.hot ? 1 : 0); });
    }
    
    renderTours(filteredTours);
    updateResultsCount(filteredTours.length);
}

function applyHotelFilters() {
    const hotelsGrid = document.getElementById('hotels-grid');
    if (!hotelsGrid) return;
    
    const data = window.SonestaData;
    if (!data) return;
    
    let filteredHotels = data.hotels.slice();
    
    if (currentFilters.category) {
        filteredHotels = filteredHotels.filter(function(h) { return h.category === currentFilters.category; });
    }
    
    switch (currentFilters.sort) {
        case 'price-asc':
            filteredHotels.sort(function(a, b) { return a.price - b.price; });
            break;
        case 'price-desc':
            filteredHotels.sort(function(a, b) { return b.price - a.price; });
            break;
        case 'rating':
            filteredHotels.sort(function(a, b) { return (b.rating || 0) - (a.rating || 0); });
            break;
        default:
            filteredHotels.sort(function(a, b) { return b.stars - a.stars; });
    }
    
    renderHotels(filteredHotels);
    updateResultsCount(filteredHotels.length);
}

function renderTours(tours) {
    const container = document.getElementById('tours-grid');
    if (!container) return;
    
    if (tours.length === 0) {
        container.innerHTML = '<div class="no-results"><p>\u0422\u0443\u0440\u044b \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b</p><button class="btn btn-primary" onclick="resetFilters()">\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440\u044b</button></div>';
        return;
    }
    
    let html = '';
    tours.forEach(function(tour) {
        html += '<div class="tour-card" data-tour-id="' + tour.id + '">' +
            (tour.discount ? '<div class="tour-badge">-' + tour.discount + '%</div>' : '') +
            '<div class="tour-image" style="background-image: url(\'' + tour.image + '\')">' +
            '<button class="btn-favorite ' + (isInFavorites(tour.id, 'tour') ? 'active' : '') + '" data-id="' + tour.id + '" data-type="tour">' +
            (isInFavorites(tour.id, 'tour') ? '\u2665' : '\u2661') + '</button></div>' +
            '<div class="tour-content">' +
            '<h3>' + tour.name + '</h3>' +
            '<p class="tour-hotel">' + tour.hotel + '</p>' +
            '<div class="tour-details"><span>' + tour.duration + ' \u043d\u043e\u0447\u0435\u0439</span><span>' + tour.nutrition + '</span></div>';
        
        if (tour.oldPrice) {
            html += '<div class="tour-price"><span class="old-price">' + formatPrice(tour.oldPrice) + '</span><span class="new-price">' + formatPrice(tour.price) + '</span></div>';
        } else {
            html += '<div class="tour-price"><span class="new-price">' + formatPrice(tour.price) + '</span></div>';
        }
        
        html += '<a href="booking.html?id=' + tour.id + '&type=tour" class="btn-tour">\u0417\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c</a>' +
            '</div></div>';
    });
    
    container.innerHTML = html;
}

function renderHotels(hotels) {
    const container = document.getElementById('hotels-grid');
    if (!container) return;
    
    if (hotels.length === 0) {
        container.innerHTML = '<div class="no-results"><p>\u041e\u0442\u0435\u043b\u0438 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b</p><button class="btn btn-primary" onclick="resetFilters()">\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0444\u0438\u043b\u044c\u0442\u0440\u044b</button></div>';
        return;
    }
    
    let html = '';
    hotels.forEach(function(hotel) {
        let stars = '\u2605'.repeat(hotel.stars);
        html += '<div class="hotel-card" data-hotel-id="' + hotel.id + '">' +
            '<div class="hotel-image" style="background-image: url(\'' + hotel.images[0] + '\')"></div>' +
            '<div class="hotel-stars">' + stars + '</div>' +
            '<h4>' + hotel.name + '</h4>' +
            '<p class="hotel-location">' + hotel.location + '</p>' +
            '<div class="hotel-features">';
        
        hotel.features.slice(0, 4).forEach(function(f) {
            html += '<span class="feature">' + f + '</span>';
        });
        
        html += '</div><p class="hotel-description">' + hotel.description + '</p>' +
            '<div class="hotel-price">\u043e\u0442 ' + formatPrice(hotel.price) + ' / \u043d\u043e\u0447\u044c</div>' +
            '<a href="booking.html?id=' + hotel.id + '&type=hotel" class="btn btn-primary">\u0412\u044b\u0431\u0440\u0430\u0442\u044c</a></div>';
    });
    
    container.innerHTML = html;
}

function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' \u20bd';
}

function updateResultsCount(count) {
    const countEl = document.querySelector('.results-count');
    if (countEl) {
        countEl.textContent = count + ' \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u043e\u0432';
    }
}

function resetFilters() {
    currentFilters = {
        destination: '', nights: '', priceMin: '', priceMax: '',
        stars: '', nutrition: '', sort: 'popular', category: ''
    };
    
    const inputs = document.querySelectorAll('#tours-grid input, #tours-grid select');
    inputs.forEach(function(input) { input.value = ''; });
    
    applyFilters();
    applyHotelFilters();
}

// ===== МОДАЛЬНЫЕ ОКНА =====

function initModals() {
    const modalClose = document.querySelectorAll('.modal-close, .modal-overlay');
    modalClose.forEach(function(el) {
        el.addEventListener('click', function(e) {
            if (e.target === el) {
                closeModal(el.closest('.modal'));
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.active');
            openModals.forEach(function(m) { closeModal(m); });
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== БРОНИРОВАНИЕ =====

function initBookingForm() {
    const forms = document.querySelectorAll('.booking-form');
    forms.forEach(function(form) {
        form.addEventListener('submit', handleBookingSubmit);
    });
}

function handleBookingSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    let data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
    });
    
    if (!validateBookingForm(data)) {
        return;
    }
    
    sessionStorage.setItem('bookingData', JSON.stringify(data));
    showNotification('\u0417\u0430\u044f\u0432\u043a\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430! \u041c\u044b \u0441\u0432\u044f\u0436\u0435\u043c\u0441\u044f \u0441 \u0432\u0430\u043c\u0438 \u0432 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043c\u044f.');
    form.reset();
}

function validateBookingForm(data) {
    if (!data.name || data.name.length < 2) {
        showNotification('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f', 'error');
        return false;
    }
    if (!data.phone || data.phone.length < 10) {
        showNotification('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043b\u0435\u0444\u043e\u043d', 'error');
        return false;
    }
    if (!data.email || !data.email.includes('@')) {
        showNotification('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email', 'error');
        return false;
    }
    return true;
}

// ===== ОТЗЫВЫ =====

function initReviews() {
    loadReviews();
}

function loadReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    
    const data = window.SonestaData;
    if (!data || !data.reviews) return;
    
    let html = '';
    data.reviews.forEach(function(review) {
        const starsHtml = '\u2605'.repeat(review.rating) + '\u2606'.repeat(5 - review.rating);
        html += '<div class="review-card">' +
            '<div class="review-header">' +
            '<div class="review-author">' + review.name + '</div>' +
            '<div class="review-rating">' + starsHtml + '</div>' +
            '<div class="review-date">' + formatDate(review.date) + '</div>' +
            '</div>' +
            '<p class="review-text">' + review.text + '</p>';
        
        if (review.pros && review.pros.length > 0) {
            html += '<div class="review-pros"><strong>+</strong> ' + review.pros.join(', ') + '</div>';
        }
        if (review.cons && review.cons.length > 0) {
            html += '<div class="review-cons"><strong>-</strong> ' + review.cons.join(', ') + '</div>';
        }
        
        html += '</div>';
    });
    
    container.innerHTML = html;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ===== УВЕДОМЛЕНИЯ =====

function showNotification(message, type) {
    type = type || 'success';
    
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = '<span>' + message + '</span>';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '\u00d7';
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    notification.appendChild(closeBtn);
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(function() {
        notification.classList.remove('show');
        setTimeout(function() { notification.remove(); }, 300);
    }, 4000);
}

// ===== ЭКСПОРТ =====

window.SonestaApp = {
    openModal: openModal,
    closeModal: closeModal,
    showNotification: showNotification,
    resetFilters: resetFilters
};

// Update favorites list in modal
function updateFavoritesList() {
    const container = document.getElementById('favorites-list');
    if (!container) return;
    
    const favorites = JSON.parse(localStorage.getItem('sonestaFavorites') || '{}');
    const data = window.SonestaData;
    
    if (Object.keys(favorites).length === 0) {
        container.innerHTML = '<p class="empty-favorites">Пока нет избранных туров</p>';
        return;
    }
    
    let html = '';
    Object.values(favorites).forEach(function(item) {
        let itemData = null;
        if (item.type === 'tour' && data && data.tours) {
            itemData = data.tours.find(t => t.id === item.id);
        } else if (item.type === 'hotel' && data && data.hotels) {
            itemData = data.hotels.find(h => h.id === item.id);
        } else if (item.type === 'cruise' && data && data.cruises) {
            itemData = data.cruises.find(c => c.id === item.id);
        }
        
        if (itemData) {
            const name = itemData.name || itemData.hotel || itemData.ship || '';
            const price = itemData.price || 0;
            html += '<div class="fav-item">' +
                '<div class="fav-info">' +
                '<strong>' + name + '</strong>' +
                '<span>' + price.toLocaleString('ru-RU') + ' руб.</span></div>' +
                '<button class="btn-remove-fav" onclick="removeFavorite(\'' + item.id + '\', \'' + item.type + '\')">×</button></div>';
        }
    });
    
    container.innerHTML = html;
}

function removeFavorite(id, type) {
    let favorites = JSON.parse(localStorage.getItem('sonestaFavorites') || '{}');
    delete favorites[type + '_' + id];
    localStorage.setItem('sonestaFavorites', JSON.stringify(favorites));
    updateFavoritesList();
    updateFavoritesCount();
    
    const btn = document.querySelector('.btn-favorite[data-id="' + id + '"][data-type="' + type + '"]');
    if (btn) {
        btn.classList.remove('active');
        btn.innerHTML = '\u2661';
    }
}
