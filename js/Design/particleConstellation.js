const particlesCanvas = document.getElementById('particlesCanvas');
const pCtx = particlesCanvas.getContext('2d');
let particleList = [];
const particleCount = 50;
const connectionDist = 120;

function resizeParticlesCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}
resizeParticlesCanvas();
window.addEventListener('resize', resizeParticlesCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = particlesCanvas.width;
        if (this.x > particlesCanvas.width) this.x = 0;
        if (this.y < 0) this.y = particlesCanvas.height;
        if (this.y > particlesCanvas.height) this.y = 0;
    }

    draw() {
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(216, 219, 0, ${this.opacity})`;
        pCtx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particleList.push(new Particle());
}

function drawParticles() {
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    // Update and draw particles
    particleList.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connections
    for (let i = 0; i < particleList.length; i++) {
        for (let j = i + 1; j < particleList.length; j++) {
            const dx = particleList[i].x - particleList[j].x;
            const dy = particleList[i].y - particleList[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
                const opacity = (1 - dist / connectionDist) * 0.15;
                pCtx.beginPath();
                pCtx.moveTo(particleList[i].x, particleList[i].y);
                pCtx.lineTo(particleList[j].x, particleList[j].y);
                pCtx.strokeStyle = `rgba(216, 219, 0, ${opacity})`;
                pCtx.lineWidth = 0.5;
                pCtx.stroke();
            }
        }
    }

    requestAnimationFrame(drawParticles);
}
drawParticles();