document.addEventListener('DOMContentLoaded', () => {
    // GSAP animations for dashboard cards when not using AOS
    if (typeof gsap !== 'undefined') {
        if (document.querySelector('.stat-card')) {
            gsap.from('.stat-card', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }

        if (document.querySelector('.action-card')) {
            gsap.fromTo('.action-card', 
                { x: -20, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.4,
                    ease: 'power2.out'
                }
            );
        }
    }

    // Update progress bars dynamically
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 500); // Trigger after slight delay for visual effect
    });

    // Handle Authentication Display
    const userDataStr = localStorage.getItem('adviseAiUser');
    if (userDataStr) {
        try {
            const userData = JSON.parse(userDataStr);
            const welcomeHeading = document.getElementById('welcome-heading');
            
            if (welcomeHeading && userData.name) {
                const formattedName = userData.name.charAt(0).toUpperCase() + userData.name.slice(1);
                welcomeHeading.innerHTML = `Welcome Back, <span class="text-gradient-purple">${formattedName}</span>! 👋`;
            }

            // Also update the Login / Register button to show profile/logout
            const loginBtn = document.querySelector('a[href="login.html"]');
            if(loginBtn) {
                const formattedName = userData.name ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1) : 'User';
                loginBtn.href = "#";
                loginBtn.innerText = "Logout (" + formattedName + ")";
                loginBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('adviseAiUser');
                    localStorage.removeItem('adviseAiToken');
                    window.location.reload();
                });
            }

        } catch (e) {
            console.error('Error parsing user data', e);
        }
    }

    // Dashboard Slider Logic
    const slider = document.getElementById('dashboard-slider');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dots = document.querySelectorAll('.slide-dot');
    
    if (slider && prevBtn && nextBtn) {
        let currentSlide = 0;
        const totalSlides = 3;
        
        const updateSlider = () => {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                if(index === currentSlide) {
                    dot.classList.remove('bg-gray-500');
                    dot.classList.add('bg-indigo-500');
                    dot.classList.add('w-4'); // Make active dot wider
                } else {
                    dot.classList.remove('bg-indigo-500');
                    dot.classList.remove('w-4');
                    dot.classList.add('bg-gray-500');
                }
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        };
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentSlide = parseInt(e.target.getAttribute('data-index'));
                updateSlider();
            });
        });

        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Initial setup for dots
        updateSlider();
    }
});
