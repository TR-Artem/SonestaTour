// EmailJS Configuration
// Зарегистрируйтесь на https://www.emailjs.com и получите:
// - Public Key (Account → Integration)
// - Service ID (Email Services)
// - Template ID (Email Templates)

// Замените значения ниже на свои:
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        return true;
    }
    return false;
}

async function sendApplicationEmail(formData, type, itemName) {
    // If EmailJS is configured, try to send email
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                to_email: formData.email,
                from_name: formData.name,
                phone: formData.phone,
                type: type,
                item_name: itemName,
                message: formData.comment || 'Без комментариев',
                guests: formData.guests || '1',
                submit_date: new Date().toLocaleString('ru-RU')
            });
            return { success: true, method: 'email' };
        } catch (error) {
            console.warn('EmailJS failed, saving to localStorage:', error);
        }
    }
    
    // Fallback: Save to localStorage
    saveApplicationToStorage(formData, type, itemName);
    return { success: true, method: 'localStorage' };
}

function saveApplicationToStorage(formData, type, itemName) {
    const key = 'sonestaApplications';
    let applications = [];
    
    try {
        applications = JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {}
    
    applications.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        type: type,
        itemName: itemName,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        guests: formData.guests || '1',
        comment: formData.comment || '',
        status: 'new'
    });
    
    localStorage.setItem(key, JSON.stringify(applications));
}

// Show success notification
function showApplicationSuccess() {
    const existing = document.querySelector('.app-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'app-notification success';
    notification.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <div>
            <strong>Заявка отправлена!</strong>
            <p>Мы свяжемся с вами в ближайшее время</p>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00a8cc, #0083b0);
        color: white;
        padding: 20px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.25);
        z-index: 100000;
        display: flex;
        align-items: center;
        gap: 16px;
        max-width: 360px;
        animation: slideInRight 0.4s ease;
    `;
    
    notification.querySelector('svg').style.cssText = `
        width: 48px;
        height: 48px;
        flex-shrink: 0;
    `;
    
    notification.querySelector('div').style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 4px;
    `;
    
    notification.querySelector('strong').style.cssText = `
        font-size: 16px;
        font-weight: 600;
    `;
    
    notification.querySelector('p').style.cssText = `
        font-size: 13px;
        opacity: 0.9;
        margin: 0;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(20px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Initialize EmailJS on page load
document.addEventListener('DOMContentLoaded', function() {
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = initEmailJS;
        document.head.appendChild(script);
    }
});
