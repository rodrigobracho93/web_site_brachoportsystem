// ================================================================
// BRACHO PORT SYSTEM — Master Script
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. THEME TOGGLE (Dark/Light) + View Transitions API
    // ============================================================
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleBtn = document.getElementById('theme-toggle');

    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            themeToggleDarkIcon?.classList.add('hidden');
            themeToggleLightIcon?.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleDarkIcon?.classList.remove('hidden');
            themeToggleLightIcon?.classList.add('hidden');
        }
        localStorage.setItem('color-theme', theme);
    }

    // Init theme
    if (localStorage.getItem('color-theme') === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (document.startViewTransition) {
                document.startViewTransition(() => toggleTheme());
            } else {
                toggleTheme();
            }
        });
    }

    // ============================================================
    // 2. MOBILE MENU (Drawer from right)
    // ============================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openDrawer() {
        mobileMenu.classList.remove('hidden');
        mobileOverlay.classList.remove('hidden');
        // Trigger transition on next frame
        requestAnimationFrame(() => {
            mobileMenu.classList.add('mobile-drawer-open');
            mobileOverlay.classList.add('mobile-overlay-visible');
        });
        menuIcon.classList.replace('fa-bars', 'fa-xmark');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileMenu.classList.remove('mobile-drawer-open');
        mobileOverlay.classList.remove('mobile-overlay-visible');
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
        document.body.style.overflow = '';
        // Hide after transition completes
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            mobileOverlay.classList.add('hidden');
        }, 300);
    }

    if (mobileMenuBtn && mobileMenu && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('hidden')) {
                openDrawer();
            } else {
                closeDrawer();
            }
        });

        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', closeDrawer);
        }

        mobileOverlay.addEventListener('click', closeDrawer);

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    }

    // ============================================================
    // 3. BACK TO TOP
    // ============================================================
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleBackToTop, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================================
    // 4. TYPING EFFECT (Hero subtitle)
    // ============================================================
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const phrases = JSON.parse(typedElement.dataset.text || '[""]');
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        function type() {
            if (isPaused) return;

            const current = phrases[phraseIndex];
            if (!isDeleting) {
                typedElement.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    isPaused = true;
                    setTimeout(() => { isPaused = false; isDeleting = true; type(); }, 2000);
                    return;
                }
                setTimeout(type, 60);
            } else {
                typedElement.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, 400);
                    return;
                }
                setTimeout(type, 30);
            }
        }

        // Small delay before starting
        setTimeout(type, 1000);
    }

    // ============================================================
    // 5. COUNTER ANIMATION (Stats section)
    // ============================================================
    const counters = document.querySelectorAll('.counter-value');

    if (counters.length > 0) {
        const animateCounter = (el) => {
            const target = parseFloat(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = eased * target;

                if (target % 1 === 0) {
                    el.textContent = Math.floor(current) + suffix;
                } else {
                    el.textContent = current.toFixed(1) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target + suffix;
                }
            }

            requestAnimationFrame(update);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }

    // ============================================================
    // 6. MAGNETIC BUTTON EFFECT
    // ============================================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================================
    // 7. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================================
    // 8. FORM HANDLER (Contacto) — via FormSubmit.co
    // ============================================================
    const form = document.querySelector('#contacto form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = {
                nombre: document.getElementById('nombre').value.trim(),
                empresa: document.getElementById('empresa').value.trim(),
                email: document.getElementById('email').value.trim(),
                telefono: document.getElementById('telefono').value.trim()
            };

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            const originalBg = btn.style.background;

            // Validation
            if (!data.nombre || !data.empresa || !data.email || !data.telefono) {
                btn.textContent = 'Completa todos los campos';
                btn.style.opacity = '0.7';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.opacity = '1';
                }, 2000);
                return;
            }

            // Submit via AJAX to FormSubmit
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            const params = new URLSearchParams();
            params.append('nombre', data.nombre);
            params.append('empresa', data.empresa);
            params.append('email', data.email);
            params.append('telefono', data.telefono);
            params.append('_captcha', 'false');
            params.append('_subject', 'Nuevo contacto - Bracho Port System');

            fetch(form.action, {
                method: 'POST',
                mode: 'no-cors',
                body: params,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(() => {
                btn.textContent = '✓ Enviado';
                btn.style.background = '#16a34a';
                setTimeout(() => {
                    form.reset();
                    btn.textContent = originalText;
                    btn.style.background = originalBg;
                    btn.disabled = false;
                }, 3000);
            })
            .catch(() => {
                btn.textContent = 'Error, intenta de nuevo';
                btn.style.background = '#dc2626';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = originalBg;
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

});
