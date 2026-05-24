window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    gridScrollY = scrollY * 0.3;

    // Header background
    const header = document.getElementById('header');
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});