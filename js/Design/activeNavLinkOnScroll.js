const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        link.style.textShadow = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--accent)';
            link.style.textShadow = '0 0 10px var(--neon-50)';
        }
    });
});

