/**
 * Alien Terrain Animation for Video Blocks
 * Creates wave patterns and floating orbs
 */
export function createAlienTerrainAnimation(canvas) {
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

        // Wave patterns (alien terrain)
        var waveCount = 20;
        for (var w = 0; w < waveCount; w++) {
            ctx.beginPath();
            var baseY = (w / waveCount) * cH;
            for (var x = 0; x <= cW; x += 3) {
                var y = baseY + Math.sin(x * 0.01 + t * 0.5 + w * 0.8) * (15 + w * 2);
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'rgba(180,0,255,' + (0.03 + w * 0.005) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Floating orbs
        for (var o = 0; o < 12; o++) {
            var ox = (Math.sin(t * 0.2 + o * 0.9) * 0.5 + 0.5) * cW;
            var oy = (Math.cos(t * 0.15 + o * 1.1) * 0.5 + 0.5) * cH;
            var or = 3 + Math.sin(t + o * 2) * 2;
            var orbGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, or * 4);
            orbGrad.addColorStop(0, 'rgba(0,240,255,' + (0.5 + Math.sin(t + o) * 0.2) + ')');
            orbGrad.addColorStop(1, 'rgba(0,240,255,0)');
            ctx.beginPath();
            ctx.arc(ox, oy, or * 4, 0, Math.PI * 2);
            ctx.fillStyle = orbGrad;
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    return { draw: draw, resize: resize };
}