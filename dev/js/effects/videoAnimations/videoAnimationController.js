/**
 * Video Animation Controller
 * Manages canvas animations with Intersection Observer for performance
 */
import { createCityGridAnimation } from './cityGridAnimation.js';
import { createRadarAnimation } from './radarAnimation.js';
import { createAlienTerrainAnimation } from './alienTerrainAnimation.js';

/**
 * Initializes a video canvas with the specified animation type
 * @param {string} canvasId - The ID of the canvas element
 * @param {number} type - Animation type (0: city grid, 1: radar, 2: alien terrain)
 */
function initVideoCanvas(canvasId, type) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;

    var animation;
    switch (type) {
        case 0:
            animation = createCityGridAnimation(canvas);
            break;
        case 1:
            animation = createRadarAnimation(canvas);
            break;
        case 2:
            animation = createAlienTerrainAnimation(canvas);
            break;
        default:
            animation = createCityGridAnimation(canvas);
    }

    if (!animation) return;

    // Only animate when visible (Intersection Observer)
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animation.draw();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(canvas);

    // Start initial animation
    animation.draw();
}

/**
 * Initialize all video canvases on the page
 */
export function initVideoAnimations() {
    // Initialize all video canvases with their respective animation types
    initVideoCanvas('vidCanvas1', 0);  // City grid
    initVideoCanvas('vidCanvas2', 1);  // Radar
    initVideoCanvas('vidCanvas3', 2);  // Alien terrain
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoAnimations);
} else {
    initVideoAnimations();
}