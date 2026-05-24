const gridCanvas = document.getElementById('gridCanvas');
const gridCtx = gridCanvas.getContext('2d');
let gridScrollY = 0;
let gridOpacity = 0.15;
let gridPulseDir = 1;

function resizeGridCanvas() {
    gridCanvas.width = window.innerWidth;
    gridCanvas.height = window.innerHeight;
}
resizeGridCanvas();
window.addEventListener('resize', resizeGridCanvas);

function drawGrid() {
    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    gridCtx.strokeStyle = `rgba(216, 219, 0, ${gridOpacity})`;
    gridCtx.lineWidth = 0.5;

    const spacing = 60;
    const offsetY = (gridScrollY % spacing);

    // Vertical lines
    for (let x = 0; x < gridCanvas.width; x += spacing) {
        gridCtx.beginPath();
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, gridCanvas.height);
        gridCtx.stroke();
    }

    // Horizontal lines with parallax
    for (let y = -spacing + offsetY; y < gridCanvas.height + spacing; y += spacing) {
        gridCtx.beginPath();
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(gridCanvas.width, y);
        gridCtx.stroke();
    }

    // Pulsing effect
    gridOpacity += 0.001 * gridPulseDir;
    if (gridOpacity >= 0.25) gridPulseDir = -1;
    if (gridOpacity <= 0.1) gridPulseDir = 1;

    requestAnimationFrame(drawGrid);
}
drawGrid();
