import Colors from '../utils/colors.js';

const particlesCanvas = document.getElementById('particlesCanvas');
const pCtx = particlesCanvas ? particlesCanvas.getContext('2d', { alpha: true, desynchronized: true }) : null;

let particleList = [];

// Touch-aware constants
const isTouch = (typeof window !== 'undefined') && (window.__isTouchDevice || ('ontouchstart' in window) || navigator.maxTouchPoints > 0);
const PARTICLE_COUNT = isTouch ? 24 : 80;          // reduce particles on touch
const CONNECTION_DIST = isTouch ? 160 : 300;       // shorter connections on touch
const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
const MAX_FPS = isTouch ? 30 : 60;
const FRAME_DELAY = 1000 / MAX_FPS;

let lastFrame = 0;
let canvasW = 0, canvasH = 0;

class Particle {
    constructor(w, h) {
        this.reset(w, h);
        this.vx = (Math.random() - 0.5) * (isTouch ? 0.6 : 0.3);
        this.vy = (Math.random() - 0.5) * (isTouch ? 0.6 : 0.3);
        this.radius = Math.random() * (isTouch ? 1.6 : 2) + (isTouch ? 0.6 : 1);
        this.alpha = Math.random() * 0.5 + 0.15;
        this._color = Colors.getNeonRgb();
    }

    reset(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
    }

    update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        // Wrap around edges
        if (this.x < 0) this.x = w;
        else if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        else if (this.y > h) this.y = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this._color},${this.alpha})`;
        ctx.fill();
    }
}

function resizeCanvas() {
    if (!particlesCanvas) return;
    canvasW = particlesCanvas.width = window.innerWidth;
    canvasH = particlesCanvas.height = window.innerHeight;
    // Re-init particles on resize to avoid off-screen positions
    initParticles();
}

function initParticles() {
    particleList = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particleList.push(new Particle(canvasW, canvasH));
    }
}

function drawParticles(timestamp) {
    if (!pCtx) return;

    // FPS limiter
    if (timestamp - lastFrame < FRAME_DELAY) {
        requestAnimationFrame(drawParticles);
        return;
    }
    lastFrame = timestamp;

    pCtx.clearRect(0, 0, canvasW, canvasH);

    // Update + draw particles
    for (let i = 0; i < particleList.length; i++) {
        const p = particleList[i];
        p.update(canvasW, canvasH);
        p.draw(pCtx);
    }

    // Draw connections — skip heavy connections on tiny touch devices
    if (!isTouch || (canvasW > 480)) {
        pCtx.lineWidth = 0.5;
        for (let i = 0; i < particleList.length; i++) {
            const p1 = particleList[i];
            for (let j = i + 1; j < particleList.length; j++) {
                const p2 = particleList[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < CONNECTION_DIST_SQ) {
                    const opacity = (1 - distSq / CONNECTION_DIST_SQ) * 0.15;
                    pCtx.beginPath();
                    pCtx.moveTo(p1.x, p1.y);
                    pCtx.lineTo(p2.x, p2.y);
                    pCtx.strokeStyle = `rgba(${p1._color},${opacity})`;
                    pCtx.stroke();
                }
            }
        }
    }

    requestAnimationFrame(drawParticles);
}

function init() {
    if (!particlesCanvas) return;
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    requestAnimationFrame(drawParticles);
}

init();

// === Cleanup (for SPA / HMR) ===
export function destroyParticles() {
    window.removeEventListener('resize', resizeCanvas);
    particleList = [];
}
