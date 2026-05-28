const gridCanvas = document.getElementById('gridCanvas');
const gridCtx = gridCanvas.getContext('2d');
let gridScrollY = 0;
let gridOpacity = 0.15;
let gridPulseDir = 1;
const spacing = 200;

function resizeGridCanvas() {
    gridCanvas.width = window.innerWidth;
    gridCanvas.height = window.innerHeight;
}

function drawGrid() {
    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    gridCtx.strokeStyle = `rgba(216, 219, 0, ${gridOpacity})`;
    gridCtx.lineWidth = 0.5;

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

// function drawGrid() {
//     const now = performance.now();
//     if (now - drawGrid._lastFrame < 16) { requestAnimationFrame(drawGrid); return; }
//     drawGrid._lastFrame = now;

//     const w = gridCanvas.width|0, h = gridCanvas.height|0;
//     gridCtx.clearRect(0, 0, w, h);
    
//     // Pulse logic separated
//     gridOpacity += 0.001 * gridPulseDir;
//     if (gridOpacity >= 0.25) gridPulseDir = -1;
//     else if (gridOpacity <= 0.1) gridPulseDir = 1;
    
//     gridCtx.strokeStyle = `rgba(216,219,0,${gridOpacity.toFixed(3)})`;
//     gridCtx.lineWidth = 0.5;

//     const step = spacing|0, offsetY = (gridScrollY % step)|0;
    
//     // Batch vertical lines
//     gridCtx.beginPath();
//     for (let x = 0; x <= w; x += step) {
//         gridCtx.moveTo(x|0, 0); gridCtx.lineTo(x|0, h);
//     }
//     gridCtx.stroke();
    
//     // Batch horizontal lines with parallax
//     gridCtx.beginPath();
//     for (let y = (-step + offsetY)|0; y <= h + step; y += step) {
//         gridCtx.moveTo(0, y|0); gridCtx.lineTo(w, y|0);
//     }
//     gridCtx.stroke();

//     requestAnimationFrame(drawGrid);
// }

resizeGridCanvas();
window.addEventListener('resize', resizeGridCanvas);

drawGrid();
