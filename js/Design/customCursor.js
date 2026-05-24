const customCursor = document.getElementById('customCursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const trailElements = [];
const trailCount = 5;

for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = 0.3 - (i * 0.05);
    trail.style.width = (8 - i) + 'px';
    trail.style.height = (8 - i) + 'px';
    document.body.appendChild(trail);
    trailElements.push({ el: trail, x: 0, y: 0 });
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    customCursor.style.left = cursorX + 'px';
    customCursor.style.top = cursorY + 'px';

    let prevX = cursorX, prevY = cursorY;
    trailElements.forEach((t, idx) => {
        t.x += (prevX - t.x) * (0.3 - idx * 0.04);
        t.y += (prevY - t.y) * (0.3 - idx * 0.04);
        t.el.style.left = t.x + 'px';
        t.el.style.top = t.y + 'px';
        prevX = t.x;
        prevY = t.y;
    });

    requestAnimationFrame(updateCursor);
}
updateCursor();

// Hover effect for interactive elements
document.querySelectorAll('a, button, .project-card, .tech-item, .social-link, .cta-btn, .submit-btn').forEach(el => {
    el.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
});