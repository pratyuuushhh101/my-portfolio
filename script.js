/**
 * Portfolio — Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initActiveNavLink();
    initScramble();
    initInteractiveTerminal();
});

/* ===============================
   Cursor Glow
   =============================== */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) {
        if (glow) glow.style.display = 'none';
        return;
    }

    let mx = 0, my = 0, gx = 0, gy = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
    });

    (function loop() {
        gx += (mx - gx) * 0.07;
        gy += (my - gy) * 0.07;
        glow.style.left = gx + 'px';
        glow.style.top = gy + 'px';
        requestAnimationFrame(loop);
    })();
}

/* ===============================
   Navbar Scroll
   =============================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

/* ===============================
   Mobile Menu
   =============================== */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            menu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* ===============================
   Scroll Reveal
   =============================== */
function initScrollReveal() {
    const selectors = [
        '.section-header',
        '.about-content',
        '.marquee-wrap',
        '.skills-col',
        '.project-card',
        '.contact-simple',
    ];

    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('reveal');
        });
    });

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ===============================
   Smooth Scroll
   =============================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/* ===============================
   Active Nav on Scroll
   =============================== */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-72px 0px -50% 0px' });

    sections.forEach(s => obs.observe(s));
}

/* ===============================
   Letter Scramble Effect
   =============================== */
function initScramble() {
    const el = document.getElementById('heroName');
    if (!el) return;

    const finalText = el.dataset.text || el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    const len = finalText.length;

    // Build array of letter states
    const letters = [];
    for (let i = 0; i < len; i++) {
        letters.push({
            final: finalText[i],
            resolved: false,
            resolveAt: 200 + Math.random() * 600, // ms from start
            current: chars[Math.floor(Math.random() * chars.length)],
        });
    }

    // Start cycling
    el.textContent = letters.map(l => l.current).join('');
    const start = performance.now();
    const cycleInterval = 40; // ms between character swaps

    function tick() {
        const elapsed = performance.now() - start;
        let allDone = true;

        for (let i = 0; i < len; i++) {
            if (letters[i].resolved) continue;

            if (elapsed >= letters[i].resolveAt) {
                letters[i].current = letters[i].final;
                letters[i].resolved = true;
            } else {
                letters[i].current = chars[Math.floor(Math.random() * chars.length)];
                allDone = false;
            }
        }

        el.textContent = letters.map(l => l.current).join('');

        if (!allDone) {
            setTimeout(tick, cycleInterval);
        }
    }

    // Delay before starting the scramble
    setTimeout(tick, 400);
}

/* ===============================
   Stat Counter (kept for reuse)
   =============================== */
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 40;
    const stepTime = 1500 / 40;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}
/* ===============================
   Interactive Terminal
   =============================== */
function initInteractiveTerminal() {
    const input = document.getElementById('terminalInput');
    const history = document.getElementById('terminalHistory');
    const body = document.getElementById('terminalBody');
    if (!input || !history || !body) return;

    const scrollSection = (id, msg) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
        return msg;
    };

    const commands = {
        help: () => 'Available commands: about, skills, projects, datatalk, trialmatch, contact, whoami, ls, cat, git, clear, help',
        about: () => scrollSection('about', 'Navigating to about section...'),
        skills: () => scrollSection('skills', 'Navigating to skills section...'),
        projects: () => scrollSection('projects', 'Navigating to projects section...'),
        datatalk: () => scrollSection('project-datatalk', 'Navigating to DataTalk-AI...'),
        trialmatch: () => scrollSection('project-trialmatch', 'Navigating to TrialMatch AI...'),
        contact: () => scrollSection('contact', 'Navigating to contact section...'),
        whoami: () => 'pratz — full-stack dev & AI engineer. 4th sem CS student. I build multi-agent pipelines and ambient intelligence systems.',
        ls: (args) => {
            if (args && args.includes('skills')) return 'Frontend: React, Next.js, Tailwind\nBackend: Node.js, Express, Django, Java\nOthers: Python, PostgreSQL, Docker, Git';
            if (args && args.includes('projects')) return 'trialmatch/  datatalk/  ieee-ctf/  hotel-system/';
            return 'skills/  projects/  about/  contact/  passion.txt';
        },
        cat: (args) => {
            const file = args ? args[0] : '';
            if (file === 'passion.txt') return 'building things people actually use.';
            if (file === 'projects/trialmatch') return 'TrialMatch AI: Multi-agent clinical trial matching engine.';
            if (file === 'projects/datatalk') return 'DataTalk-AI: Natural language to SQL analytics engine.';
            return `cat: ${file || 'file'}: not found`;
        },
        git: (args) => {
            if (args && args.includes('log')) {
                return 'a3f9c21 shipped arena @ hack2skill\n7b2e891 built ctf site for ieee techweek\n0f2b1d3 added trialmatch-ai to portfolio\ne4c2a11 released datatalk-ai (ambient intel for retail stores)';
            }
            return 'Usage: git log --oneline';
        },
        clear: () => {
            history.innerHTML = '';
            return null;
        }
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const fullValue = input.value.trim();
            const parts = fullValue.split(' ');
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            // Echo command
            const echo = document.createElement('div');
            echo.className = 't-history-line';
            echo.innerHTML = `<span class="t-prompt">$</span> <span class="t-cmd">${fullValue}</span>`;
            history.appendChild(echo);

            // Process command
            if (cmd) {
                const output = commands[cmd] ? commands[cmd](args) : `command not found: ${cmd}`;
                if (output !== null) {
                    const result = document.createElement('div');
                    result.className = 't-history-line';
                    result.innerHTML = `<span class="t-output">> ${output.replace(/\n/g, '<br>> ')}</span>`;
                    history.appendChild(result);
                }
            }

            input.value = '';
            body.scrollTop = body.scrollHeight;
        }
    });

    // Focus input on click
    body.addEventListener('click', () => input.focus());
}
