const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate with anime.js
            anime({
                targets: entry.target,
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            });

            // Tech bar animation
            const barFill = entry.target.querySelector('.tech-item-fill');
            if (barFill) {
                const targetWidth = barFill.getAttribute('data-width');
                setTimeout(() => {
                    barFill.style.width = targetWidth + '%';
                }, 300);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});