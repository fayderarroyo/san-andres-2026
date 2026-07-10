// ==================== DATOS DEL ITINERARIO ====================
const itineraryData = [
    {
        id: 'day1',
        title: "Sábado 10 de Octubre",
        subtitle: "Llegada, Caravana y Fiesta Blanca",
        color: "caribbean",
        activities: [
            { time: "08:43 AM - 10:10 AM", effort: "Bajo", effortColor: "emerald", title: "✈️ Vuelo y Aterrizaje", desc: "Vuelo desde Cartagena (CTG) a San Andrés (ADZ)." },
            { time: "10:30 AM - 01:30 PM", effort: "Bajo", effortColor: "emerald", title: "🏨 Check-in y Almuerzo", desc: "Traslado al alojamiento, entrega de equipaje y comida." },
            { time: "02:00 PM - 06:00 PM", effort: "Alto", effortColor: "rose", title: "🚙 Ruta en Mulas", desc: "Recogida de las dos mulas. Recorrido por el Hoyo Soplador, saltos en West View y atardecer en El Cove." },
            { time: "06:00 PM - 06:30 PM", effort: "Bajo", effortColor: "emerald", title: "🔑 Devolución de Mulas", desc: "Entrega de los vehículos el mismo día en el centro." },
            { time: "07:30 PM - 11:00 PM", effort: "Medio", effortColor: "sand", title: "🛥️ Crucero Noche Blanca", desc: "Cena, barra libre y fiesta a bordo del catamarán." }
        ]
    },
    {
        id: 'day2',
        title: "Domingo 11 de Octubre",
        subtitle: "Mar, Cayos y Compras",
        color: "emerald",
        activities: [
            { time: "09:00 AM - 10:30 AM", effort: "Bajo", effortColor: "emerald", title: "🪂 Parasailing", desc: "Vuelos en tándem sobre la bahía." },
            { time: "10:30 AM - 12:30 PM", effort: "Muy Alto", effortColor: "rose", title: "🤿 Acuario y Mantarrayas", desc: "Snorkeling y caminata por los bancos de arena." },
            { time: "12:30 PM - 03:00 PM", effort: "Bajo", effortColor: "emerald", title: "🏝️ Johnny Cay y Almuerzo", desc: "Descanso bajo las palmeras y comida típica." },
            { time: "03:00 PM - 04:30 PM", effort: "Bajo", effortColor: "emerald", title: "🚿 Retorno y Ducha", desc: "Regreso en lancha a la isla principal y paso por el alojamiento." },
            { time: "04:30 PM - 07:30 PM", effort: "Medio", effortColor: "sand", title: "🛍️ Tour de Compras", desc: "Caminata por la zona comercial de Spratt Bight." },
            { time: "08:00 PM", effort: "Bajo", effortColor: "emerald", title: "🍽️ Cena en la Zona Centro", desc: "Comida a pie en los restaurantes de la peatonal." }
        ]
    },
    {
        id: 'day3',
        title: "Lunes 12 de Octubre",
        subtitle: "Regreso",
        color: "sand",
        activities: [
            { time: "08:30 AM - 10:40 AM", effort: "Medio", effortColor: "sand", title: "🛂 Aeropuerto", desc: "Chequeo de maletas con las compras en el Gustavo Rojas Pinilla." },
            { time: "10:40 AM - 12:05 PM", effort: "Bajo", effortColor: "emerald", title: "🛫 Vuelo de Retorno", desc: "Despegue hacia Cartagena." }
        ]
    }
];

// ==================== LÓGICA DE VISTAS (SPA) ====================
function switchView(viewName) {
    // Esconder todas las vistas
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    // Desactivar todos los botones de nav
    document.querySelectorAll('.nav-btn').forEach(el => {
        el.classList.remove('active', 'text-caribbean-300');
        el.classList.add('opacity-50');
    });

    // Mostrar la vista seleccionada
    document.getElementById(`view-${viewName}`).classList.remove('hidden');
    // Activar botón
    const btn = document.getElementById(`nav-${viewName}`);
    btn.classList.add('active', 'text-caribbean-300');
    btn.classList.remove('opacity-50');

    // Cambiar fondos dinámicos
    if(viewName === 'itinerary' || viewName === 'budget') {
        document.getElementById('bg-itinerary').style.opacity = '1';
        document.getElementById('bg-providers').style.opacity = '0';
    } else {
        document.getElementById('bg-itinerary').style.opacity = '0';
        document.getElementById('bg-providers').style.opacity = '1';
    }
}

// ==================== RENDERIZAR ITINERARIO ====================
function renderItinerary() {
    const container = document.getElementById('itinerary-container');
    container.innerHTML = '';

    itineraryData.forEach((day, index) => {
        // Mapeo de colores a clases Tailwind personalizadas
        const colorClassMap = {
            'caribbean': 'text-caribbean-400 bg-caribbean-500/20',
            'emerald': 'text-emerald-400 bg-emerald-500/20',
            'sand': 'text-sand-400 bg-sand-400/20',
            'rose': 'text-rose-400 bg-rose-500/20'
        };

        let activitiesHTML = day.activities.map(act => `
            <div class="mb-5 relative group">
                <span class="absolute -left-[23px] top-1.5 bg-${day.color}-400 h-2.5 w-2.5 rounded-full ring-4 ring-slate-900 group-hover:scale-125 transition-transform"></span>
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <span class="text-[10px] font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 shadow-sm">${act.time}</span>
                    <span class="text-[9px] uppercase font-bold text-${act.effortColor}-400 border border-${act.effortColor}-400/30 px-1.5 py-0.5 rounded shadow-[0_0_5px_currentColor]">${act.effort}</span>
                </div>
                <h5 class="text-sm font-bold text-slate-100">${act.title}</h5>
                <p class="text-xs text-slate-300/80 mt-0.5 leading-relaxed">${act.desc}</p>
            </div>
        `).join('');

        container.innerHTML += `
            <div class="glass-card border border-white/5 rounded-xl overflow-hidden transition-all duration-300" id="${day.id}-container">
                <button onclick="toggleDay('${day.id}')" class="w-full flex justify-between items-center p-3 focus:outline-none hover:bg-white/5 transition-colors">
                    <div class="flex items-center gap-3">
                        <div class="${colorClassMap[day.color]} p-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-inner">DÍA ${index + 1}</div>
                        <div class="text-left">
                            <h4 class="text-sm font-bold text-slate-100">${day.title}</h4>
                            <p class="text-[10px] uppercase tracking-wider text-${day.color}-300 mt-0.5">${day.subtitle}</p>
                        </div>
                    </div>
                    <span id="${day.id}-icon" class="text-white/50 transform transition-transform duration-300">▼</span>
                </button>
                
                <div id="${day.id}-content" class="hidden border-t border-white/10 p-4 pt-5 bg-slate-900/30">
                    <div class="relative border-l border-white/20 ml-2 pl-4">
                        ${activitiesHTML}
                    </div>
                </div>
            </div>
        `;
    });
}

function toggleDay(dayId) {
    const content = document.getElementById(dayId + '-content');
    const icon = document.getElementById(dayId + '-icon');
    const container = document.getElementById(dayId + '-container');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        container.classList.add('border-white/20', 'shadow-[0_0_15px_rgba(255,255,255,0.05)]');
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
        container.classList.remove('border-white/20', 'shadow-[0_0_15px_rgba(255,255,255,0.05)]');
    }
}

// ==================== LÓGICA DE PROVEEDORES ====================
let providers = JSON.parse(localStorage.getItem('sa_providers')) || [
    { name: "Restaurante La Regatta", phone: "3157000000", link: "https://www.instagram.com/" },
    { name: "Ecoparque West View", phone: "316000000", link: "" }
];

function renderProviders() {
    const list = document.getElementById('providers-list');
    list.innerHTML = '';
    
    if (providers.length === 0) {
        list.innerHTML = `<p class="text-xs text-slate-400 text-center py-6 font-medium italic">El directorio está vacío. ¡Agrega el primer contacto!</p>`;
        return;
    }

    providers.forEach((prov, index) => {
        const cleanPhone = prov.phone.replace(/\s+/g, '');
        const wsLink = `https://wa.me/57${cleanPhone}`;

        list.innerHTML += `
            <div class="glass-card border border-white/5 rounded-xl p-3.5 flex items-center justify-between text-sm hover:border-sand-400/30 transition-all group">
                <div class="truncate pr-2">
                    <h4 class="font-bold text-slate-100 truncate">${prov.name}</h4>
                    <div class="flex gap-3 mt-1.5 text-[10px] font-bold uppercase tracking-wider">
                        <a href="${wsLink}" target="_blank" class="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
                            <span class="text-xs">💬</span> Chat
                        </a>
                        ${prov.link ? `
                        <a href="${prov.link}" target="_blank" class="text-caribbean-300 hover:text-caribbean-200 flex items-center gap-1 transition-colors">
                            <span class="text-xs">🔗</span> Info
                        </a>` : ''}
                    </div>
                </div>
                <button onclick="deleteProvider(${index})" class="text-xs text-slate-500 group-hover:text-rose-400 p-2 rounded-full hover:bg-rose-400/10 transition-all opacity-50 group-hover:opacity-100">✕</button>
            </div>
        `;
    });
}

document.getElementById('provider-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('prov-name').value;
    const phone = document.getElementById('prov-phone').value;
    const link = document.getElementById('prov-link').value;

    providers.push({ name, phone, link });
    localStorage.setItem('sa_providers', JSON.stringify(providers));
    renderProviders();
    e.target.reset();
});

function deleteProvider(index) {
    providers.splice(index, 1);
    localStorage.setItem('sa_providers', JSON.stringify(providers));
    renderProviders();
}

// ==================== CUENTA REGRESIVA Y ALERTAS ====================
const travelDate = new Date('October 10, 2026 08:43:00').getTime();
function updateCountdown() {
    const distance = travelDate - new Date().getTime();
    if (distance < 0) {
        document.getElementById('countdown-text').innerText = "¡LLEGÓ EL VIAJE! 🏝️";
        return;
    }
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('countdown-text').innerText = `FALTAN ${d}D ${h}H PARA DESPEGAR`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

function requestNotificationPermission() {
    if (!("Notification" in window)) {
        alert("Tu navegador no soporta alertas nativas.");
        return;
    }
    Notification.requestPermission().then(permission => {
        if (permission === "granted") setAlertsActive();
    });
}

function setAlertsActive() {
    const btn = document.getElementById('noti-btn');
    btn.innerText = "✓ Activas";
    btn.classList.add('bg-emerald-500/80', 'border-emerald-400/50', 'text-white');
    btn.classList.remove('bg-caribbean-500/80', 'border-caribbean-400/50');
}

// ==================== LÓGICA DE CHAT GRUPAL ====================
let currentUser = localStorage.getItem('sa_chat_user');
let chatMessages = JSON.parse(localStorage.getItem('sa_chat_msgs')) || [];

function initChatUser() {
    if (!currentUser) {
        let name = prompt("¡Bienvenido al chat del viaje! ¿Cuál es tu nombre?");
        if (name && name.trim() !== "") {
            currentUser = name.trim();
            localStorage.setItem('sa_chat_user', currentUser);
        } else {
            currentUser = "Viajero Anónimo";
        }
    }
    document.getElementById('chat-user-indicator').innerText = currentUser;
}

function renderChat() {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';

    if (chatMessages.length === 0) {
        container.innerHTML = `<div class="text-center text-xs text-slate-400/60 my-4 italic">No hay mensajes aún. ¡Escribe el primero!</div>`;
        return;
    }

    chatMessages.forEach(msg => {
        const isMe = msg.user === currentUser;
        const alignClass = isMe ? 'justify-end' : 'justify-start';
        const bubbleClass = isMe 
            ? 'bg-emerald-500/90 text-white rounded-br-none shadow-[0_4px_10px_rgba(16,185,129,0.2)]' 
            : 'bg-slate-700/80 text-slate-100 rounded-bl-none shadow-md border border-white/5';
        
        const nameLabel = isMe ? '' : `<span class="text-[9px] font-bold text-caribbean-300 ml-1 mb-1 block">${msg.user}</span>`;

        container.innerHTML += `
            <div class="flex ${alignClass} w-full animate-[fadeIn_0.3s_ease-out]">
                <div class="max-w-[80%] flex flex-col">
                    ${nameLabel}
                    <div class="px-3 py-2 rounded-2xl ${bubbleClass} text-sm">
                        ${msg.text}
                    </div>
                    <span class="text-[9px] text-slate-500 mt-1 mx-1 ${isMe ? 'text-right' : 'text-left'}">${msg.time}</span>
                </div>
            </div>
        `;
    });

    // Auto-scroll al final
    container.scrollTop = container.scrollHeight;
}

document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    
    if (text !== '') {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        chatMessages.push({
            user: currentUser,
            text: text,
            time: timeString
        });
        
        localStorage.setItem('sa_chat_msgs', JSON.stringify(chatMessages));
        input.value = '';
        renderChat();
    }
});

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    renderItinerary();
    renderProviders();
    initChatUser();
    renderChat();
    if (Notification.permission === "granted") setAlertsActive();
});
