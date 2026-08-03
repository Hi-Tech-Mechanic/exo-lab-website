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

function clamp(v, a = 0, b = 1) {
    return Math.max(a, Math.min(b, v));
}

function updateExoLayers() {
    if (!exoSection) return;

    // Robust section top/height using scroll metrics
    const sectionTop = exoSection.getBoundingClientRect().top + window.scrollY;
    // number of pixels the user can scroll inside the section
    const sectionHeight = Math.max(1, exoSection.scrollHeight - window.innerHeight);

    // scrolled pixels relative to top of section, clamped
    const scrolled = clamp(window.scrollY - sectionTop, 0, sectionHeight);
    const progress = clamp(scrolled / sectionHeight, 0, 1);

    const totalLayers = bpLayers.filter(l => l).length;
    const currentLayer = Math.min(totalLayers - 1, Math.floor(progress * totalLayers));

    // Compute vertical movement for the wrapper based on actual wrapper height and available space
    const wrapperHeight = blueprintSvgWrapper ? blueprintSvgWrapper.offsetHeight : 0;
    // leave a small margin so the wrapper doesn't flush to exact bottom
    const safeMargin = 80;
    const maxVerticalMovement = Math.max(0, exoSection.offsetHeight - wrapperHeight - safeMargin);
    const verticalMovement = progress * maxVerticalMovement;

    // Apply parallax / vertical translate to the wrapper
    if (blueprintSvgWrapper) {
        // Use translateY positive — wrapper moves down as user scrolls through the section
        blueprintSvgWrapper.style.transform = `translateY(${verticalMovement}px)`;
    }

    // Per-layer progress and visual effects
    bpLayers.forEach((layer, idx) => {
        if (!layer) return;
        // How far that specific layer should be revealed (0..1)
        const layerProgress = clamp((progress * totalLayers) - idx, 0, 1);
        const yOffset = (totalLayers - 1 - idx) * 40 * (1 - layerProgress);
        const opacity = layerProgress;

        layer.style.transform = `translateY(-${yOffset}px)`;
        layer.style.opacity = Math.max(0, opacity);

        if (idx <= currentLayer) {
            const shadowStrength = 2 + (currentLayer - idx);
            const alpha = 0.3 + (currentLayer - idx) * 0.08;
            layer.style.filter = `drop-shadow(0 0 ${shadowStrength}px ${Colors.accentOrange(alpha)})`;
        } else {
            layer.style.filter = '';
        }
    });

    // Info panels / dots
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
        if (idx <= currentLayer) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (typeof animateHelmet === 'function') animateHelmet();
    }, 1000);

    // run on scroll + resize (resize can change wrapper height / available movement)
    window.addEventListener('scroll', updateExoLayers, { passive: true });
    window.addEventListener('resize', updateExoLayers, { passive: true });

    // initial run
    updateExoLayers();
});
