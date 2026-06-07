/**
 * Radar Animation for Video Blocks
 * Creates circular UI with rotating radar arm and blips
 */
export function createRadarAnimation(canvas) {
    if (!canvas) return null;
    
    var ctx = canvas.getContext('2d');
    var cW, cH;
    var t = Math.random() * 1000;

    /** Resize canvas to fit parent */
    function resize() {
        var rect = canvas.parentElement.getBoundingClientRect();
        cW = canvas.width = rect.width;
        cH = canvas.height = rect.height;
    }
    
    resize();
    window.addEventListener('resize', resize);

    /** Main draw function */
    function draw() {
        t += 0.016;
        ctx.clearRect(0, 0, cW, cH);

        // Dark background
        ctx.fillStyle = '#08080e';
        ctx.fillRect(0, 0, cW, cH);

        // Radar center
        var cx = cW * 0.5, cy = cH * 0.5;
        var maxR = Math.min(cW, cH) * 0.35;

        // Concentric rings
        for (var ring = 0; ring < 4; ring++) {
            var r = maxR * (ring + 1) / 4;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0,240,255,' + (0.08 - ring * 0.01) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Rotating radar arm
        var angle = t * 0.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.strokeStyle = 'rgba(0,240,255,0.2)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Sweep area
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, angle - 0.8, angle);
        ctx.closePath();
        var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
        grad.addColorStop(0, 'rgba(0,240,255,0.06)');
        grad.addColorStop(1, 'rgba(0,240,255,0)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Blips
        for (var b = 0; b < 8; b++) {
            var bx = cx + Math.cos(t * 0.15 + b * 1.5) * (maxR * 0.6 + Math.sin(b) * 20);
            var by = cy + Math.sin(t * 0.2 + b * 1.3) * (maxR * 0.6 + Math.cos(b) * 15);
            ctx.beginPath();
            ctx.arc(bx, by, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(180,0,255,' + (0.4 + Math.sin(t + b) * 0.2) + ')';
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    return { draw: draw, resize: resize };
}