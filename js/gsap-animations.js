/* gsap-animations.js — Premium corporate animations using GSAP & Lenis */

(function () {
    // ── Mobile Performance Guard ─────────────────────────────────────────────────
    // Disable heavy animations on mobile for better battery and scroll performance
    const IS_MOBILE = window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    if (IS_MOBILE) {
        console.log("Mobile detected: Premium animations disabled for performance.");
        return;
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);



    // ============================================================
    // 2. HERO SECTION ANIMATION (Initial Load)
    // ============================================================
    function animateHero() {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Wait for a tiny bit so the page renders first
        tl.delay(0.2);

        // Animate the navbar (logo) dropping in
        tl.fromTo("#shared-nav",
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, clearProps: "y,opacity" },
            0
        );

        // Animate the hero avatar scaling up and fading in
        tl.fromTo(".hero-avatar",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.75)" },
            0.3
        );

        // Animate the text lines (greeting, name, badges) sliding up
        tl.fromTo(".hero-title > *",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
            0.5
        );

        // Fade in the scroll indicator at the bottom
        tl.fromTo(".scroll-indicator",
            { opacity: 0 },
            { opacity: 0.3, duration: 2 },
            1.5
        );
    }

    // ============================================================
    // 3. STAGGERED CARDS ANIMATION (ScrollTrigger)
    // ============================================================
    function animateCards() {
        // Find the cards container and individual cards
        const cards = gsap.utils.toArray('.section-cards > a, .section-cards > div');

        if (cards.length > 0) {
            gsap.fromTo(cards,
                {
                    y: 80,
                    opacity: 0,
                    scale: 0.98
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.1, // Wait 0.1s between each card
                    scrollTrigger: {
                        trigger: ".section-cards",
                        start: "top 85%", // Trigger when top of container hits 85% of viewport height
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Animate the recommended list (if it exists)
        const recommended = gsap.utils.toArray('#recommended-list > div');
        if (recommended.length > 0) {
            gsap.fromTo(recommended,
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: "#recommended-list",
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }

    // ============================================================
    // INIT
    // ============================================================
    function initAnimations() {
        setTimeout(() => {
            animateHero();
            animateCards();
        }, 100);
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }

})();
