document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
    }

    // Handle Loading Screen
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 1000); // Minimum 1s load time for effect
    }

    // Common GSAP entrance animation for hero sections if GSAP exists
    if (typeof gsap !== 'undefined') {
        if (document.querySelector('.hero-content')) {
            gsap.from('.hero-content', {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: 'power3.out'
            });
        }
    }
});
