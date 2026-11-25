/* =========================================================
   KIRTHI RAJAKUMAR — PORTFOLIO INTERACTIONS & ANIMATIONS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader & Initial Hero Reveal
  const preloader = document.getElementById('preloader');
  const heroReveals = document.querySelectorAll('.reveal-hero');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      heroReveals.forEach((el) => el.classList.add('visible'));
    }, 550);
  });

  // Fallback in case load already fired
  if (document.readyState === 'complete') {
    setTimeout(() => {
      preloader.classList.add('hidden');
      heroReveals.forEach((el) => el.classList.add('visible'));
    }, 450);
  }

  // 2. Cursor Glow (Desktop)
  const cursorGlow = document.getElementById('cursorGlow');
  if (window.matchMedia('(pointer: fine)').matches && cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // 3. Scroll Progress & Navbar Active State
  const scrollProgress = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;

    navbar.classList.toggle('scrolled', scrollTop > 40);

    let currentId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      if (scrollTop >= top) {
        currentId = sec.getAttribute('id');
      }
    });

    navItems.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  // Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // 4. Role Typewriter Cycler
  const typedEl = document.getElementById('typedText');
  const roles = [
    'AI & ML Developer',
    'Python & Django Backend Engineer',
    'Generative AI & RAG Builder',
    'Data Intern @ RNTBCI',
    'Multi-Agent Systems Developer'
  ];
  let roleIdx = 0;
  let charIdx = roles[0].length;
  let isDeleting = true;

  function typeLoop() {
    const current = roles[roleIdx];
    if (isDeleting) {
      charIdx--;
      typedEl.textContent = current.substring(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeLoop, 350);
        return;
      }
      setTimeout(typeLoop, 38);
    } else {
      charIdx++;
      typedEl.textContent = current.substring(0, charIdx);
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      setTimeout(typeLoop, 68);
    }
  }
  setTimeout(typeLoop, 2000);

  // 5. Scroll Reveal & Animated Counters
  const revealEls = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (counter) => {
    const target = parseFloat(counter.dataset.target);
    const decimals = parseInt(counter.dataset.decimals || '0', 10);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = target * eased;
      counter.textContent = val.toFixed(decimals);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = target.toFixed(decimals);
      }
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const counter = entry.target.querySelector('.counter');
          if (counter && !counter.dataset.animated) {
            counter.dataset.animated = 'true';
            animateCounter(counter);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealEls.forEach((el) => observer.observe(el));

  // 6. Skill Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      skillCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('hide');
          card.classList.remove('visible');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => card.classList.add('visible'));
          });
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // 7. 3D Tilt Effect on Cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 8. Magnetic Buttons
  const magneticBtns = document.querySelectorAll('.magnetic');
  if (window.matchMedia('(pointer: fine)').matches) {
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) * 0.22;
        const dy = (e.clientY - rect.top - rect.height / 2) * 0.22;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // 9. Copy to Clipboard & Toast
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer;

  function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  document.querySelectorAll('[data-copy]').forEach((el) => {
    el.addEventListener('click', async () => {
      const text = el.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(text);
        showToast(`Copied: ${text}`);
      } catch {
        showToast(`Contact: ${text}`);
      }
    });
  });

  // 10. Project Architecture Modal
  const projectData = {
    zkp: {
      tag: 'SECURITY & BACKEND ARCHITECTURE',
      title: 'Zero Knowledge Proof Authentication System',
      desc: 'A privacy-preserving authentication platform built with Python, Django, and Django REST Framework that verifies user identity without transmitting raw secrets.',
      highlights: [
        'Implemented Zero Knowledge Proof-based challenge-response authentication flow.',
        'Built RESTful APIs with JWT access tokens, refresh token rotation, and role-based authorization.',
        'Secured session management backed by MySQL relational schemas.',
        'Tested and validated all authentication workflows and edge cases using Postman.'
      ],
      tech: ['Python', 'Django', 'Django REST Framework', 'JWT', 'REST APIs', 'MySQL', 'Postman']
    },
    lms: {
      tag: 'FULL-STACK LEARNING PLATFORM',
      title: 'Online Course Enrolment & Progress Tracking System',
      desc: 'A multi-role e-learning web application built with Python Flask and MySQL, delivering real-time learner engagement tracking and automated assessment.',
      highlights: [
        'Role-based access control supporting Admin, Instructor, and Student portals.',
        'Course enrolment workflows with embedded YouTube video lecture integration.',
        'AJAX-powered real-time learning progress tracking without full page reloads.',
        'Automated quiz evaluation and score calculation workflows for learner assessment.'
      ],
      tech: ['Python Flask', 'MySQL', 'HTML5', 'CSS3', 'AJAX']
    }
  };

  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalTech = document.getElementById('modalTech');

  document.querySelectorAll('.project-detail-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const data = projectData[btn.dataset.project];
      if (!data) return;

      modalTag.textContent = data.tag;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      modalHighlights.innerHTML = data.highlights
        .map((item) => `<div class="modal-highlight-item">${item}</div>`)
        .join('');
      modalTech.innerHTML = data.tech.map((t) => `<span>${t}</span>`).join('');

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // 11. Contact Form Feedback
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    showToast(`Thanks ${name || 'there'}! Message ready — or email Kirthirajakumar2230@gmail.com.`);
    contactForm.reset();
  });

  // 12. Neural Network / Particle Constellation Canvas
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles;
    const mouse = { x: null, y: null, radius: 140 };

    const initCanvas = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      const count = Math.min(68, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: Math.random() * 1.8 + 1
      }));
    };

    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.55)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.22 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (mouse.x !== null) {
          const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (md < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.35 * (1 - md / mouse.radius)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    initCanvas();
    draw();
  }
});
