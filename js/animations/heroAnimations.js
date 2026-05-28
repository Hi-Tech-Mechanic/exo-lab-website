function animateHero() {
    anime({
        targets: '.hero .reveal',
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: anime.stagger(200)
    });

    // Animate hero logo
    anime({
        targets: '.hero-logo polygon',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: anime.stagger(200, { start: 500 }),
        direction: 'alternate',
        loop: false
    });
}
