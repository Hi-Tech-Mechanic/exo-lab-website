/**
 * City Grid Animation for Video Blocks
 * Creates neon lines, scan lines, and glowing dots animation
 */
export function createCityGridAnimation(canvas) {
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

        // City grid / neon lines
        var numLines = 30;
        for (var i = 0; i < numLines; i++) {
            var lx = (Math.sin(t * 0.3 + i * 0.7) * 0.5 + 0.5) * cW;
            ctx.beginPath();
            ctx.moveTo(lx, 0);
            ctx.lineTo(lx, cH);
            ctx.strokeStyle = 'rgba(0,240,255,' + (0.02 + Math.sin(t + i) * 0.01) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Horizontal scan line
        var scanY = (t * 80) % cH;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(cW, scanY);
        ctx.strokeStyle = 'rgba(0,240,255,0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glowing dots
        for (var d = 0; d < 15; d++) {
            var dx = (Math.sin(t * 0.5 + d * 1.2) * 0.5 + 0.5) * cW;
            var dy = (Math.cos(t * 0.3 + d * 0.9) * 0.5 + 0.5) * cH;
            var r = 2 + Math.sin(t + d) * 1;
            ctx.beginPath();
            ctx.arc(dx, dy, r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,240,255,' + (0.3 + Math.sin(t * 2 + d) * 0.2) + ')';
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    return { draw: draw, resize: resize };
}