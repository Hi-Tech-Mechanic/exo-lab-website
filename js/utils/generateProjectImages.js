function generateProjectImage(canvasId, color1, color2, pattern) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 600, 400);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 400);

    // Grid overlay
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < 600; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 400);
        ctx.stroke();
    }
    for (let y = 0; y < 400; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(600, y);
        ctx.stroke();
    }

    if (pattern === 'city') {
        // Cyberpunk city silhouette
        for (let i = 0; i < 15; i++) {
            const bx = Math.random() * 600;
            const bw = 20 + Math.random() * 40;
            const bh = 80 + Math.random() * 200;
            ctx.fillStyle = `rgba(0, 20, 10, ${0.6 + Math.random() * 0.4})`;
            ctx.fillRect(bx, 400 - bh, bw, bh);

            // Windows
            for (let wy = 400 - bh + 10; wy < 400; wy += 15) {
                for (let wx = bx + 5; wx < bx + bw - 5; wx += 12) {
                    if (Math.random() > 0.3) {
                        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 255, 136, 0.6)' : 'rgba(255, 107, 0, 0.5)';
                        ctx.fillRect(wx, wy, 6, 8);
                    }
                }
            }
        }
    } else if (pattern === 'network') {
        // Network nodes
        const nodes = [];
        for (let i = 0; i < 20; i++) {
            nodes.push({
                x: Math.random() * 600,
                y: Math.random() * 400,
                r: 3 + Math.random() * 5
            });
        }
        nodes.forEach((n, idx) => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 136, 0.7)';
            ctx.fill();

            nodes.forEach((m, jdx) => {
                if (jdx > idx) {
                    const d = Math.hypot(n.x - m.x, n.y - m.y);
                    if (d < 150) {
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(m.x, m.y);
                        ctx.strokeStyle = `rgba(0, 255, 136, ${0.3 * (1 - d / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
        });
    } else if (pattern === 'data') {
        // Data visualization bars
        for (let i = 0; i < 20; i++) {
            const bx = 20 + i * 28;
            const bh = 30 + Math.random() * 250;
            ctx.fillStyle = `rgba(0, 255, 136, ${0.2 + Math.random() * 0.5})`;
            ctx.fillRect(bx, 400 - bh, 20, bh);
        }
        // Line chart
        ctx.beginPath();
        ctx.moveTo(20, 300);
        for (let i = 1; i < 20; i++) {
            ctx.lineTo(20 + i * 28, 100 + Math.random() * 200);
        }
        ctx.strokeStyle = 'rgba(255, 107, 0, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
    } else if (pattern === 'wave') {
        // Waveform / synthwave
        ctx.beginPath();
        ctx.moveTo(0, 200);
        for (let x = 0; x < 600; x += 2) {
            const y = 200 + Math.sin(x * 0.02) * 50 + Math.sin(x * 0.05) * 30;
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 250);
        for (let x = 0; x < 600; x += 2) {
            const y = 250 + Math.sin(x * 0.03 + 1) * 40 + Math.cos(x * 0.06) * 20;
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255, 107, 0, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Sun
        ctx.beginPath();
        ctx.arc(300, 200, 80, 0, Math.PI * 2);
        const sunGrad = ctx.createRadialGradient(300, 200, 0, 300, 200, 80);
        sunGrad.addColorStop(0, 'rgba(255, 204, 0, 0.3)');
        sunGrad.addColorStop(1, 'rgba(255, 107, 0, 0)');
        ctx.fillStyle = sunGrad;
        ctx.fill();
    }

    return canvas.toDataURL();
}

// Set project images
document.getElementById('projImg1').src = generateProjectImage('projImg1', '#0a1a0a', '#001122', 'city');
document.getElementById('projImg2').src = generateProjectImage('projImg2', '#0a0a1a', '#110022', 'network');
document.getElementById('projImg3').src = generateProjectImage('projImg3', '#0a1a1a', '#002211', 'data');
document.getElementById('projImg4').src = generateProjectImage('projImg4', '#1a0a0a', '#220011', 'wave');