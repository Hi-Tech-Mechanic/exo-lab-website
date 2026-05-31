window.animateHelmet = function animateHelmet() {
    const layers = [
        { id: '#helmetOuter', delay: 200 },
        { id: '#helmetFacePlate', delay: 600 },
        { id: '#helmetVisor', delay: 1000 },
        { id: '#helmetJaw', delay: 1400 },
        { id: '#helmetSides', delay: 1800 },
        { id: '#helmetDetails', delay: 2200 },
        { id: '#helmetParticles', delay: 2500 },
        { id: '#helmetAnnotations', delay: 2800 }
    ];

    layers.forEach((layer) => {
        const paths = document.querySelectorAll(`${layer.id} path, ${layer.id} line, ${layer.id} rect, ${layer.id} ellipse`);

        setTimeout(() => {
            anime({
                targets: layer.id,
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutQuad'
            });

            paths.forEach(path => {
                const length = path.getTotalLength ? path.getTotalLength() : 500;
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;

                anime({
                    targets: path,
                    strokeDashoffset: [length, 0],
                    duration: 1200,
                    easing: 'easeInOutSine'
                });
            });
        }, layer.delay);
    });
}