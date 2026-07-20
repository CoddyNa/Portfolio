const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = document.querySelector(".site-nav");
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    window.addEventListener("scroll", () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 18);
    }, { passive: true });

    if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
      let mouseX = innerWidth / 2;
      let mouseY = innerHeight / 2;
      let ringX = mouseX;
      let ringY = mouseY;

      window.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      });

      gsap.ticker.add(() => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      });

      document.querySelectorAll(".hoverable, button, input, textarea").forEach((item) => {
        item.addEventListener("mouseenter", () => ring.classList.add("is-active"));
        item.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
      });
    }

    const countUp = () => {
      document.querySelectorAll(".counter").forEach((counter) => {
        const target = Number(counter.dataset.target);
        const tween = { value: 0 };
        gsap.to(tween, {
          value: target,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => {
            counter.textContent = Math.round(tween.value);
          }
        });
      });
    };

    if (!prefersReducedMotion && window.gsap) {
      gsap.registerPlugin(ScrollTrigger);

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-eyebrow", { opacity: 0, y: 18, duration: 0.7 })
        .from(".title-line span", { yPercent: 112, duration: 1.05, stagger: 0.13 }, "-=0.28")
        .from(".hero-copy", { opacity: 0, y: 24, duration: 0.7 }, "-=0.45")
        .from(".hero-actions .btn", { opacity: 0, y: 18, duration: 0.55, stagger: 0.08 }, "-=0.35")
        .from(".portrait-wrap", { opacity: 0, x: 34, duration: 0.9 }, "-=0.72")
        .from(".scroll-indicator, .stat", { opacity: 0, y: 18, duration: 0.65, stagger: 0.08, onComplete: countUp }, "-=0.28");

      gsap.to(".hero-grid", {
        yPercent: 14,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".hero-ambient", {
        yPercent: -10,
        xPercent: 5,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".glow-amber", {
        yPercent: -18,
        xPercent: 8,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".glow-blue", {
        yPercent: 20,
        xPercent: -7,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });

      gsap.utils.toArray(".reveal").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 82%" }
        });
      });

      gsap.utils.toArray(".section-title, .contact-title").forEach((title) => {
        gsap.from(title, {
          scale: 0.94,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: title, start: "top 86%" }
        });
      });

      gsap.utils.toArray(".progress span").forEach((bar) => {
        gsap.to(bar, {
          width: `${bar.dataset.progress}%`,
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: { trigger: bar, start: "top 88%" }
        });
      });
    } else {
      document.querySelectorAll(".progress span").forEach((bar) => {
        bar.style.width = `${bar.dataset.progress}%`;
      });
      document.querySelectorAll(".counter").forEach((counter) => {
        counter.textContent = counter.dataset.target;
      });
    }

    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        if (prefersReducedMotion) return;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 16;
        const rotateX = ((0.5 - (y / rect.height)) * 10);
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
      });
    });

    document.getElementById("contactForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} <${data.get("email")}>`);
      window.location.href = `mailto:nakielyaw@gmail.com?subject=${subject}&body=${body}`;
    });