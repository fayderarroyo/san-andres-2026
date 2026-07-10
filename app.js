// ==================== DATOS POR DEFECTO ====================
const defaultItinerary = [
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

const defaultBudget = [
    { concept: "Vuelos Wingo", cost: 563325 },
    { concept: "Alojamiento (2 Noches)", cost: 600000 },
    { concept: "Crucero Noche Blanca", cost: 240000 },
    { concept: "Parasailing", cost: 360000 },
    { concept: "Tour Cayos + West View", cost: 120000 },
    { concept: "Mulas Todo Terreno", cost: 200000 },
    { concept: "Fondo Comidas", cost: 375000 }
];

let currentItinerary = defaultItinerary;
let currentBudget = defaultBudget;

// ==================== LÓGICA DE VISTAS (SPA) ====================
function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(el => {
        el.classList.remove('active', 'text-caribbean-300');
        el.classList.add('opacity-50');
    });

    document.getElementById(`view-${viewName}`).classList.remove('hidden');
    const btn = document.getElementById(`nav-${viewName}`);
    btn.classList.add('active', 'text-caribbean-300');
    btn.classList.remove('opacity-50');

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

    currentItinerary.forEach((day, index) => {
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

// ==================== RENDERIZAR PRESUPUESTO ====================
function renderBudget() {
    const container = document.getElementById('budget-container');
    if(!container) return;
    
    let total = currentBudget.reduce((acc, item) => acc + item.cost, 0);
    
    let rowsHTML = currentBudget.map((item, index) => {
        let bgClass = index % 2 === 0 ? 'bg-white/5' : '';
        return `
            <tr class="${bgClass} hover:bg-white/10 transition-colors">
                <td class="px-4 py-3">${item.concept}</td>
                <td class="px-4 py-3 text-right font-bold text-white">$${item.cost.toLocaleString('es-CO')}</td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <div class="overflow-hidden rounded-xl border border-white/10 mb-5">
            <table class="w-full text-left text-sm text-slate-300">
                <thead class="bg-slate-800/80 text-xs uppercase text-slate-400">
                    <tr>
                        <th scope="col" class="px-4 py-3 font-semibold">Concepto</th>
                        <th scope="col" class="px-4 py-3 font-semibold text-right">Costo (COP)</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    ${rowsHTML}
                </tbody>
                <tfoot>
                    <tr class="bg-emerald-900/60 font-bold text-emerald-300">
                        <td class="px-4 py-4 text-sm uppercase tracking-wider">Total Estimado</td>
                        <td class="px-4 py-4 text-right text-base">$${total.toLocaleString('es-CO')}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
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

// ==================== LÓGICA DE CHAT GRUPAL (FIREBASE) ====================
let currentUser = localStorage.getItem('sa_chat_user');

// ⚠️ INSTRUCCIÓN: Pega aquí la configuración de tu proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyATfIsnV6JtnGo_bgXg1ZpTd6QTKwF5ReU",
    authDomain: "san-andres-2026.firebaseapp.com",
    databaseURL: "https://san-andres-2026-default-rtdb.firebaseio.com",
    projectId: "san-andres-2026",
    storageBucket: "san-andres-2026.firebasestorage.app",
    messagingSenderId: "593776975476",
    appId: "1:593776975476:web:9a43d0d9e60d88c190bb21"
};

let isFirebaseActive = false;
let db = null;
if (firebaseConfig.apiKey !== "PEGAR_AQUI") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    isFirebaseActive = true;
}

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

function renderSingleMessage(msg) {
    const container = document.getElementById('chat-messages');
    const emptyMsg = document.getElementById('empty-chat-msg');
    if (emptyMsg) emptyMsg.remove();

    const isMe = msg.user === currentUser;
    const isBot = msg.user === "🤖 Agente IA";
    const alignClass = isMe ? 'justify-end' : 'justify-start';
    
    let bubbleClass = isMe 
        ? 'bg-emerald-500/90 text-white rounded-br-none shadow-[0_4px_10px_rgba(16,185,129,0.2)]' 
        : 'bg-slate-700/80 text-slate-100 rounded-bl-none shadow-md border border-white/5';
        
    if(isBot) {
        bubbleClass = 'bg-caribbean-700/90 text-white rounded-bl-none shadow-[0_4px_10px_rgba(14,165,233,0.3)] border border-caribbean-400/30';
    }
    
    const nameLabel = isMe ? '' : `<span class="text-[9px] font-bold ${isBot ? 'text-caribbean-300' : 'text-emerald-300'} ml-1 mb-1 block">${msg.user}</span>`;

    container.innerHTML += `
        <div class="flex ${alignClass} w-full animate-[fadeIn_0.3s_ease-out]">
            <div class="max-w-[80%] flex flex-col">
                ${nameLabel}
                <div class="px-3 py-2 rounded-2xl ${bubbleClass} text-sm">
                    ${msg.text.replace(/\n/g, '<br>')}
                </div>
                <span class="text-[9px] text-slate-500 mt-1 mx-1 ${isMe ? 'text-right' : 'text-left'}">${msg.time}</span>
            </div>
        </div>
    `;
    container.scrollTop = container.scrollHeight;
}

function loadFirebaseData() {
    if (!isFirebaseActive) return;

    // Escuchar el Itinerario
    db.ref('itinerary').on('value', (snapshot) => {
        if(snapshot.exists()) {
            currentItinerary = snapshot.val();
        } else {
            // Inicializar si está vacío
            db.ref('itinerary').set(defaultItinerary);
        }
        renderItinerary();
    });

    // Escuchar el Presupuesto
    db.ref('budget').on('value', (snapshot) => {
        if(snapshot.exists()) {
            currentBudget = snapshot.val();
        } else {
            // Inicializar si está vacío
            db.ref('budget').set(defaultBudget);
        }
        renderBudget();
    });

    // Escuchar Chat
    const container = document.getElementById('chat-messages');
    container.innerHTML = `<div id="empty-chat-msg" class="text-center text-xs text-slate-400/60 my-4 italic">Conectando al chat en vivo...</div>`;
    
    const appLoadTime = Date.now();

    db.ref('chat').on('child_added', (snapshot) => {
        const msg = snapshot.val();
        renderSingleMessage(msg);

        // Notificaciones
        if (msg.timestamp && msg.timestamp > appLoadTime && msg.user !== currentUser) {
            if (Notification.permission === "granted" && document.hidden) {
                new Notification(`Nuevo mensaje de ${msg.user}`, {
                    body: msg.text,
                    icon: "img/corals.png"
                });
            }
        }
    });
}

const p1 = "sk-81eba811";
const p2 = "382b423d8ed8";
const p3 = "c24dd6dc87e1";
const DEEPSEEK_API_KEY = p1 + p2 + p3;

async function processAIAgent(userMessage) {
    try {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: `Eres un agente de viajes IA para un grupo de amigos yendo a San Andrés.
Si te piden cambiar el presupuesto o itinerario, responde SIEMPRE devolviendo UNICAMENTE un objeto JSON válido (sin formato markdown ni bloques de código) con la estructura: 
{"action": "update_budget", "data": [{"concept": "x", "cost": 100}]}
o {"action": "update_itinerary", "data": [{...el itinerario completo...}]}
Si solo hacen una pregunta normal, responde con texto normal amigable, breve.
El presupuesto actual es: ${JSON.stringify(currentBudget)}
El itinerario actual es: ${JSON.stringify(currentItinerary)}`
                    },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.1
            })
        });

        const data = await response.json();
        const aiResponse = data.choices[0].message.content.trim();

        try {
            // Intentar parsear como JSON por si es una acción
            let parsed = aiResponse;
            if (parsed.startsWith('\`\`\`json')) {
                parsed = parsed.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
            }
            const actionObj = JSON.parse(parsed);
            
            if (actionObj.action === "update_budget" && actionObj.data) {
                if (isFirebaseActive) db.ref('budget').set(actionObj.data);
                return "He actualizado el presupuesto de acuerdo a tu solicitud. Revisa la pestaña de Gastos. 💸";
            } else if (actionObj.action === "update_itinerary" && actionObj.data) {
                if (isFirebaseActive) db.ref('itinerary').set(actionObj.data);
                return "He modificado el itinerario de nuestro viaje. Revisa la pestaña Ruta. 🗺️";
            }
        } catch (e) {
            // Si falla el parseo, era un texto normal
            return aiResponse;
        }

    } catch (error) {
        console.error("Error en IA:", error);
        return "Lo siento, tuve un problema procesando tu orden. Asegúrate de tener conexión.";
    }
}


document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    
    if (text !== '') {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const newMsg = {
            user: currentUser,
            text: text,
            time: timeString,
            timestamp: Date.now()
        };

        if (isFirebaseActive) {
            firebase.database().ref('chat').push(newMsg);
        } else {
            let localMsgs = JSON.parse(localStorage.getItem('sa_chat_msgs')) || [];
            localMsgs.push(newMsg);
            localStorage.setItem('sa_chat_msgs', JSON.stringify(localMsgs));
            renderSingleMessage(newMsg);
        }
        
        input.value = '';

        // Si mencionan al bot, procesar
        if (text.toLowerCase().includes('@bot') || text.toLowerCase().includes('@ia')) {
            const aiReply = await processAIAgent(text);
            
            if (isFirebaseActive) {
                firebase.database().ref('chat').push({
                    user: "🤖 Agente IA",
                    text: aiReply,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    timestamp: Date.now()
                });
            }
        }
    }
});

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    renderProviders();
    initChatUser();
    if(isFirebaseActive) {
        loadFirebaseData();
    } else {
        renderItinerary();
        renderBudget();
        let localMsgs = JSON.parse(localStorage.getItem('sa_chat_msgs')) || [];
        localMsgs.forEach(msg => renderSingleMessage(msg));
    }
    if (Notification.permission === "granted") setAlertsActive();
});
