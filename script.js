// Effets de scroll avec Intersection Observer
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer tous les éléments avec la classe 'fade-in'
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.panel, .timeline__card, .ref');
  
  elementsToAnimate.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Effet parallax pour le hero
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');
  const heroGlow = document.querySelector('.hero__glow');

  if (hero && heroContent && heroGlow) {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;

      if (heroContent) {
        heroContent.style.transform = `translateY(${rate * 0.3}px)`;
        heroContent.style.opacity = Math.max(0, 1 - scrolled / 600);
      }

      if (heroGlow) {
        heroGlow.style.transform = `translateY(${rate * 0.2}px) scale(${1 + scrolled * 0.0003})`;
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Smooth scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Animation au scroll pour les timeline cards avec délai
  const timelineCards = document.querySelectorAll('.timeline__card');
  timelineCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // Animation pour les refs avec délai
  const refCards = document.querySelectorAll('.ref');
  refCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
  });
});

