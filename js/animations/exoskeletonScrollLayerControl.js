import Colors from '../utils/colors.js';

const bpLayers = [
    document.getElementById('bpLayer1'),
    document.getElementById('bpLayer2'),
    document.getElementById('bpLayer3'),
    document.getElementById('bpLayer4'),
    document.getElementById('bpLayer5'),
    document.getElementById('bpLayer6'),
    document.getElementById('bpLayer7')
];

const layerInfos = document.querySelectorAll('.layer-info');
const layerDots = document.querySelectorAll('.layer-dot');
const exoSection = document.getElementById('exoskeleton');
const blueprintSvgWrapper = document.querySelector('.blueprint-svg-wrapper');

function updateExoLayers() {
    if (!exoSection) return;
    const sectionRect = exoSection.getBoundingClientRect();
    const sectionHeight = exoSection.offsetHeight - window.innerHeight;
    const scrolled = -sectionRect.top;
    const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));

    const currentLayer = Math.min(6, Math.floor(progress * 7));

    // Calculate vertical movement based on scroll progress
    const maxVerticalMovement = exoSection.offsetHeight; 
    const verticalMovement = progress * maxVerticalMovement;

    // Apply parallax effect to blueprint viewer and SVG wrapper
    if (blueprintSvgWrapper) {
        blueprintSvgWrapper.style.transform = `translateY(${verticalMovement * 0.42}px)`;
    }

    bpLayers.forEach((layer, idx) => {
        if (!layer) return;
        const layerProgress = Math.max(0, Math.min(1, (progress * 7) - idx));
        const yOffset = (6 - idx) * 40 * (1 - layerProgress);
        const opacity = layerProgress;

        layer.style.transform = `translateY(-${yOffset}px)`;
        layer.style.opacity = Math.max(0, opacity);

        if (idx <= currentLayer) {
            layer.style.filter = `drop-shadow(0 0 ${2 + (currentLayer - idx)}px ${Colors.accentOrange(0.3 + (currentLayer - idx) * 0.1)})`;
        } else {
            layer.style.filter = '';
        }
    });

    layerInfos.forEach((info, idx) => {
        if (idx === currentLayer) {
            info.classList.add('visible');
            info.style.borderColor = Colors.accentOrange(0.4);
            info.style.boxShadow = `0 0 15px ${Colors.accentOrange(0.1)}`;
        } else if (idx < currentLayer) {
            info.classList.add('visible');
            info.style.borderColor = Colors.accentOrange(0.2);
            info.style.boxShadow = 'none';
        } else {
            info.classList.remove('visible');
            info.style.borderColor = '';
            info.style.boxShadow = '';
        }
    });

    layerDots.forEach((dot, idx) => {
        if (idx <= currentLayer) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animateHelmet();
    }, 1000);

    window.addEventListener('scroll', updateExoLayers);
    updateExoLayers();
});
