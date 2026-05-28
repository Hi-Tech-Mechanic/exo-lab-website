const noiseCanvas = document.getElementById('noiseCanvas');
const noiseCtx = noiseCanvas.getContext('2d');
let noiseOffsetX = 0, noiseOffsetY = 0;

function resizeNoiseCanvas() {
    noiseCanvas.width = window.innerWidth / 2;
    noiseCanvas.height = window.innerHeight / 2;
}
resizeNoiseCanvas();
window.addEventListener('resize', resizeNoiseCanvas);

function generateNoise() {
    const w = noiseCanvas.width;
    const h = noiseCanvas.height;
    const imageData = noiseCtx.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 255;
    }

    noiseCtx.putImageData(imageData, 0, 0);
}

let noiseFrame = 0;
function animateNoise() {
    noiseOffsetX += 0.3;
    noiseOffsetY += 0.5;

    noiseCanvas.style.transform = `translate(${noiseOffsetX % 10}px, ${noiseOffsetY % 10}px)`;

    noiseFrame++;
    if (noiseFrame % 3 === 0) {
        generateNoise();
    }

    requestAnimationFrame(animateNoise);
}
animateNoise();