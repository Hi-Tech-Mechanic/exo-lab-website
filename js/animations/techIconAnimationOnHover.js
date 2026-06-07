document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.tech-item-icon');
        anime({
            targets: icon,
            scale: [1, 1.15],
            duration: 300,
            easing: 'easeOutElastic(1, .5)'
        });
    });
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.tech-item-icon');
        anime({
            targets: icon,
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});