/**
 * BM Combate Incêndio - Landing Page
 * Script principal
 */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // ANIMAÇÃO AO SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // HEADER FIXO COM SCROLL
    // ============================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================
    // MENU MOBILE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
    mobileClose.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // ============================================
    // SMOOTH SCROLL PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // ANIMAÇÃO DE NÚMEROS
    // ============================================
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(el => {
        counterObserver.observe(el);
    });

    // ============================================
    // VALIDAÇÃO DE FORMULÁRIO - REDIRECIONAR PARA WHATSAPP
    // ============================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Pegar os dados do formulário
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const email = document.getElementById('email').value;
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value;

            // Criar mensagem para WhatsApp
            let textoWhatsApp = `*Novo orçamento - BM Combate Incêndio*\n\n`;
            textoWhatsApp += `*Nome:* ${nome}\n`;
            textoWhatsApp += `*Telefone:* ${telefone}\n`;
            textoWhatsApp += `*Email:* ${email}\n`;
            textoWhatsApp += `*Serviço:* ${servico}\n`;
            textoWhatsApp += `*Mensagem:* ${mensagem}`;

            // Codificar para URL
            const mensagemEncoded = encodeURIComponent(textoWhatsApp);

            // Número do WhatsApp (sem formatação)
            const whatsappNumero = '5531997824297';

            // Redirecionar para WhatsApp
            const urlWhatsApp = `https://wa.me/${whatsappNumero}?text=${mensagemEncoded}`;
            window.open(urlWhatsApp, '_blank');

            // Feedback visual
            const btn = this.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fab fa-whatsapp"></i> Redirecionando...';
            btn.style.background = '#25D366';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // ============================================
    // MASCARAS DE TELEFONE
    // ============================================
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Remove tudo que não é número
            let value = e.target.value.replace(/\D/g, '');

            // Limita a 11 dígitos
            value = value.substring(0, 11);

            if (value.length > 0) {
                // (XX)
                if (value.length <= 2) {
                    value = '(' + value;
                }
                // (XX) XXXXX
                else if (value.length <= 7) {
                    value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
                }
                // (XX) XXXXX-XXXX
                else {
                    value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
                }
            }
            e.target.value = value;
        });
    });

    // ============================================
    // DETECTAR LINK ATIVO NO SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ============================================
    // EFEITO PARALLAX LEVE NO HERO
    // ============================================
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                const parallax = scrolled * 0.3;
                hero.style.backgroundPositionY = parallax + 'px';
            }
        });
    }

    // ============================================
    // CONTADOR DE ANIMAÇÃO NO HERO
    // ============================================
    const heroTitle = document.querySelector('.hero h1');

    if (heroTitle) {
        // Adicionar classe para iniciar animação após carregamento
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }

    // ============================================
    // CARROSSEL DE PLACAS
    // ============================================
    const plaquesTrack = document.querySelector('.carrossel-placas-track');
    const plaquesPrevBtn = document.querySelector('.placas-btn.prev');
    const plaquesNextBtn = document.querySelector('.placas-btn.next');
    const plaquesDots = document.querySelector('.placas-dots');

    if (plaquesTrack) {
        const plaques = plaquesTrack.querySelectorAll('.placa-card');
        const cardsPerView = 3;
        const totalSlides = Math.ceil(plaques.length / cardsPerView);

        // Criar dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            plaquesDots.appendChild(dot);
        }

        function updateDots() {
            const currentSlide = Math.floor(plaquesTrack.scrollLeft / (plaques[0].offsetWidth + 20));
            plaquesDots.querySelectorAll('span').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(slideIndex) {
            const cardWidth = plaques[0].offsetWidth + 20;
            plaquesTrack.scrollTo({
                left: slideIndex * cardWidth * cardsPerView,
                behavior: 'smooth'
            });
        }

        plaquesPrevBtn.addEventListener('click', () => {
            const currentSlide = Math.floor(plaquesTrack.scrollLeft / (plaques[0].offsetWidth + 20));
            if (currentSlide > 0) {
                goToSlide(currentSlide - 1);
            } else {
                goToSlide(totalSlides - 1);
            }
        });

        plaquesNextBtn.addEventListener('click', () => {
            const currentSlide = Math.floor(plaquesTrack.scrollLeft / (plaques[0].offsetWidth + 20));
            if (currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(0);
            }
        });

        plaquesTrack.addEventListener('scroll', updateDots);

        // Auto scroll a cada 5 segundos
        setInterval(() => {
            const currentSlide = Math.floor(plaquesTrack.scrollLeft / (plaques[0].offsetWidth + 20));
            const nextSlide = (currentSlide + 1) % totalSlides;
            goToSlide(nextSlide);
        }, 5000);
    }

    console.log('🚀 BM Combate Incêndio - Landing Page Carregada');
});
