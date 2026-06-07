const customCursor = document.getElementById('customCursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const trailElements = [];
const TRAIL_COUNT = 5;

// === Настройки (привязаны к 60 FPS как базовой частоте) ===
const BASE_FPS = 60;
const BASE_SMOOTHING = 0.4;      // коэффициент для основного курсора
const TRAIL_SMOOTHING_BASE = 0.3; // базовый коэффициент для трейла
const TRAIL_DECAY = 0.04;         // затухание для каждого следующего элемента

let lastTime = performance.now();

// === Создание элементов трейла ===
for (let i = 0; i < TRAIL_COUNT; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = 0.3 - (i * 0.05);
    trail.style.width = (8 - i) + 'px';
    trail.style.height = (8 - i) + 'px';
    trail.style.pointerEvents = 'none'; // важно: не блокирует клики
    document.body.appendChild(trail);
    trailElements.push({ el: trail, x: 0, y: 0 });
}

// === Отслеживание мыши ===
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}, { passive: true });

// === Функция плавного приближения с учётом deltaTime ===
function lerpTimeBased(current, target, baseCoefficient, deltaTime) {
    // Нормализуем коэффициент под текущий FPS: 
    // coefficient * (deltaTime * BASE_FPS) даёт одинаковую скорость при любой герцовке
    const factor = baseCoefficient * (deltaTime * BASE_FPS);
    return current + (target - current) * Math.min(factor, 1);
}

// === Основной цикл анимации ===
function updateCursor(timestamp) {
    const now = timestamp || performance.now();
    let deltaTime = (now - lastTime) / 1000; // в секундах
    lastTime = now;

    // Защита от "скачков" при переключении вкладок / тормозах
    if (deltaTime > 0.25) deltaTime = 0.25;

    // Плавное движение основного курсора (time-based)
    cursorX = lerpTimeBased(cursorX, mouseX, BASE_SMOOTHING, deltaTime);
    cursorY = lerpTimeBased(cursorY, mouseY, BASE_SMOOTHING, deltaTime);
    
    // Используем left/top — CSS центрирует через translate(-50%, -50%)
    customCursor.style.left = cursorX + 'px';
    customCursor.style.top = cursorY + 'px';

    // Обновление трейла
    let prevX = cursorX, prevY = cursorY;
    for (let i = 0; i < trailElements.length; i++) {
        const t = trailElements[i];
        const trailFactor = (TRAIL_SMOOTHING_BASE - i * TRAIL_DECAY);
        t.x = lerpTimeBased(t.x, prevX, trailFactor, deltaTime);
        t.y = lerpTimeBased(t.y, prevY, trailFactor, deltaTime);
        t.el.style.left = t.x + 'px';
        t.el.style.top = t.y + 'px';
        prevX = t.x;
        prevY = t.y;
    }

    requestAnimationFrame(updateCursor);
}

// === Hover-эффекты ===
const interactiveSelectors = 'a, button, .project-card, .tech-item, .photo-item, .social-link, .cta-btn, .submit-btn, [data-cursor="hover"]';
document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => customCursor.classList.add('hovering'), { passive: true });
    el.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'), { passive: true });
});

// === Инициализация ===
// Устанавливаем начальную позицию, чтобы не было скачка при первом рендере
cursorX = mouseX; cursorY = mouseY;
trailElements.forEach(t => { t.x = mouseX; t.y = mouseY; });
requestAnimationFrame(updateCursor);