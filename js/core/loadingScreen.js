const loadingBarFill = document.getElementById('loadingBarFill');
const loadingScreen = document.getElementById('loadingScreen');

let loadProgress = 0;
const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 15 + 5;
    if (loadProgress >= 100) {
        loadProgress = 100;
        clearInterval(loadInterval);
        setTimeout(() => {
            anime({
                targets: loadingScreen,
                opacity: 0,
                duration: 800,
                easing: 'easeInOutQuad',
                complete: () => {
                    loadingScreen.style.display = 'none';
                    animateHero();
                }
            });
        }, 300);
    }
    loadingBarFill.style.width = loadProgress + '%';
}, 150);