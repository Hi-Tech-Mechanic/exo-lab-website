// Lightweight device adaptation: sets a global flag and a CSS class for touch devices.
// Load this before heavy effects so modules can check window.__isTouchDevice.

(function() {
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    if (isTouch) {
        document.documentElement.classList.add('is-touch');
        window.__isTouchDevice = true;
    } else {
        window.__isTouchDevice = false;
    }

    // Accessibility warm-up: ensure touch-action on body to avoid some platform issues
    document.addEventListener('DOMContentLoaded', () => {
        if (!document.body.style.touchAction) {
            document.body.style.touchAction = 'manipulation';
        }
    }, { once: true });

    // Small helper for other modules
    window.MobileAdapt = {
        isTouch: () => !!window.__isTouchDevice
    };
})();
