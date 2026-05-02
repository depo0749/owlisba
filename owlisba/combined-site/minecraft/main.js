// OWLISBA - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  
  if (cursor && cursorTrail && window.innerWidth > 640) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorTrail.style.left = trailX + 'px';
      cursorTrail.style.top = trailY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects for cursor
    const interactiveElements = document.querySelectorAll('a, button, .video-card, .game-card, .social-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.3)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Stats Counter Animation
  const statNums = document.querySelectorAll('.stat-num');
  const statsSection = document.querySelector('.stats-bar');
  
  if (statsSection && statNums.length > 0) {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNums.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    statsObserver.observe(statsSection);
  }
  
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = formatNumber(target);
        clearInterval(timer);
      } else {
        element.textContent = formatNumber(Math.floor(current));
      }
    }, stepTime);
  }
  
  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  }

  // Particles
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    createParticles(particlesContainer);
  }
  
  function createParticles(container) {
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(255, 95, 31, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        25% { transform: translateY(-30px) translateX(10px); opacity: 0.8; }
        50% { transform: translateY(-20px) translateX(-10px); opacity: 0.5; }
        75% { transform: translateY(-40px) translateX(5px); opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
  }

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Copy Button functionality
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.previousElementSibling;
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
          const originalText = btn.textContent;
          btn.textContent = '✓ Kopyalandı!';
          btn.style.background = 'var(--green)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
          }, 2000);
        });
      }
    });
  });

  // Video Card Click
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const playBtn = card.querySelector('.play-btn');
      if (playBtn) {
        playBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
          playBtn.style.transform = 'scale(1)';
        }, 150);
      }
    });
  });

  // Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const videoItems = document.querySelectorAll('.video-item');
  
  if (filterTabs.length > 0 && videoItems.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const filter = tab.getAttribute('data-filter');
        videoItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.3s ease';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Parallax effect for hero
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroBg = hero.querySelector('.hero-bg');
      if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // FAQ Accordion (for server page)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // Server Status Check (Simulated)
  const serverStatus = document.querySelector('.server-status');
  if (serverStatus) {
    checkServerStatus();
    setInterval(checkServerStatus, 30000); // Check every 30 seconds
  }

  function checkServerStatus() {
    // Simulated server status - in real implementation, this would fetch from an API
    const isOnline = Math.random() > 0.1; // 90% chance online
    const statusElement = document.querySelector('.status-indicator');
    const playerCount = document.querySelector('.player-count');
    
    if (statusElement) {
      if (isOnline) {
        statusElement.textContent = '● ÇEVRIMIÇI';
        statusElement.style.color = 'var(--green)';
      } else {
        statusElement.textContent = '● ÇEVRIMDIŞI';
        statusElement.style.color = '#e74c3c';
      }
    }
    
    if (playerCount && isOnline) {
      const randomPlayers = Math.floor(Math.random() * 50) + 20;
      playerCount.textContent = `${randomPlayers}/100`;
    }
  }

  // Live Player Count Animation
  const livePlayerCount = document.querySelector('.live-player-count');
  if (livePlayerCount) {
    setInterval(() => {
      const currentCount = parseInt(livePlayerCount.textContent);
      const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
      const newCount = Math.max(0, Math.min(100, currentCount + change));
      livePlayerCount.textContent = newCount;
    }, 5000);
  }
});

// Add fadeIn animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(fadeInStyle);
