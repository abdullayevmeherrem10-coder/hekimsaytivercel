/* ============================================================
   PREMIUM MYSTICAL WEBSITE - JavaScript
   Parapsixoloq Şahsəddin İmanlı
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
    });

    // ─── Mobile Menu Toggle ───
    const toggleButton = document.getElementById('mobile-menu-btn');
    const navbarLinks = document.getElementById('navbar-links-container');

    if (toggleButton && navbarLinks) {
        toggleButton.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            toggleButton.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navbarLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbarLinks.classList.remove('active');
                toggleButton.classList.remove('active');
            });
        });
    }

    // ─── Header Scroll Effect ───
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ─── Hero Particles ───
    const particleContainer = document.getElementById('hero-particles');
    if (particleContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = (40 + Math.random() * 50) + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (5 + Math.random() * 6) + 's';

            const size = 2 + Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // Random color between gold, amber, and purple
            const colors = [
                'rgba(204, 164, 59, 0.6)',
                'rgba(217, 119, 6, 0.5)',
                'rgba(168, 85, 247, 0.4)',
                'rgba(45, 212, 191, 0.3)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            particleContainer.appendChild(particle);
        }
    }

    // ─── Smooth Scroll for Anchor Links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = targetEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── 432 Hz Ambient Sound (Web Audio API) ───
    const soundBanner = document.getElementById('sound-banner');
    const enableSoundBtn = document.getElementById('enable-sound');
    const disableSoundBtn = document.getElementById('disable-sound');
    const soundToggle = document.getElementById('sound-toggle');
    let audioContext = null;
    let oscillator = null;
    let oscillator2 = null;
    let gainNode = null;
    let gainNode2 = null;
    let soundEnabled = false;
    let soundMuted = false;

    // Show sound banner after short delay
    setTimeout(() => {
        if (soundBanner) {
            soundBanner.classList.add('visible');
        }
    }, 3000);

    function create432HzAmbient() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Main 432 Hz tone
        oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(432, audioContext.currentTime);

        // Very low volume
        gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 3);

        // Second harmonic for richness
        oscillator2 = audioContext.createOscillator();
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(216, audioContext.currentTime); // Sub-harmonic

        gainNode2 = audioContext.createGain();
        gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode2.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 3);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);

        oscillator.start();
        oscillator2.start();

        soundEnabled = true;
    }

    if (enableSoundBtn) {
        enableSoundBtn.addEventListener('click', () => {
            create432HzAmbient();
            soundBanner.classList.remove('visible');
            // Show the toggle button
            if (soundToggle) {
                soundToggle.classList.add('visible');
            }
        });
    }

    if (disableSoundBtn) {
        disableSoundBtn.addEventListener('click', () => {
            soundBanner.classList.remove('visible');
        });
    }

    // Sound toggle (mute/unmute)
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            if (!audioContext || !soundEnabled) return;

            if (soundMuted) {
                // Resume sound
                audioContext.resume();
                gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 0.5);
                gainNode2.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                soundToggle.classList.remove('muted');
                soundToggle.setAttribute('aria-label', 'Səsi dayandır');
                soundMuted = false;
            } else {
                // Mute sound
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
                gainNode2.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
                soundToggle.classList.add('muted');
                soundToggle.setAttribute('aria-label', 'Səsi açmaq');
                soundMuted = true;
            }
        });
    }

    // ─── Aurora Background Color Shift on Scroll ───
    const auroraBg = document.getElementById('aurora-bg');

    function updateAuroraOnScroll() {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);

        if (auroraBg) {
            // Shift from purple (top) to warm amber/orange (middle/tantra) to mint (bottom/aura)
            const purpleIntensity = Math.max(0.05, 0.15 - scrollPercent * 0.2);
            const amberIntensity = Math.max(0, Math.min(0.12, scrollPercent * 0.3 - 0.02));
            const mintIntensity = Math.max(0, Math.min(0.1, scrollPercent * 0.25 - 0.08));

            auroraBg.style.background = `
                radial-gradient(ellipse at 20% 50%, rgba(30, 27, 75, 0.8) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, ${purpleIntensity}) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 80%, rgba(45, 212, 191, ${mintIntensity}) 0%, transparent 50%),
                radial-gradient(ellipse at 10% 90%, rgba(217, 119, 6, ${amberIntensity}) 0%, transparent 40%),
                #0a0a1a
            `;
        }
    }

    window.addEventListener('scroll', updateAuroraOnScroll);

    // ─── Active Navigation Link Highlight ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a');

    function highlightNavLink() {
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.style.color = '#cca43b';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
});
