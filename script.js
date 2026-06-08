document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Dark Mode / Light Mode Toggle Logic
    // ==========================================
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Check initial state
    if (localStorage.getItem('color-theme') === 'light' || (!('color-theme' in localStorage) && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.remove('dark');
        themeToggleDarkIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.add('dark');
        themeToggleLightIcon.classList.remove('hidden');
    }

    // Listen for toggle click
    themeToggleBtn.addEventListener('click', function() {
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    });

    // ==========================================
    // 2. Intersection Observer for Scroll Reveals
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only reveal once
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 3. Subtle Canvas Background Animation (Nodes)
    // ==========================================
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        // Configuration
        const particleCount = 45; // Keep low for subtlety
        const connectionDistance = 150;
        const speed = 0.3;

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * speed;
                this.vy = (Math.random() - 0.5) * speed;
                this.radius = Math.random() * 1.5 + 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                // Determine color based on theme
                const isDark = document.documentElement.classList.contains('dark');
                ctx.fillStyle = isDark ? 'rgba(13, 148, 136, 0.8)' : 'rgba(15, 118, 110, 0.5)';
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            const isDark = document.documentElement.classList.contains('dark');
            const lineColor = isDark ? '13, 148, 136' : '15, 118, 110';

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${lineColor}, ${1 - distance / connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        resizeCanvas();
        initParticles();
        animate();
    }
});