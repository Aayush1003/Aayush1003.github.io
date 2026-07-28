document.addEventListener('DOMContentLoaded', () => {
  // Loading screen
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls) {
      ls.classList.add('hidden');
      setTimeout(() => {
        ls.style.display = 'none';
      }, 700);
    }
  }, 1200);

  // Typing effect
  const typingEl = document.getElementById('typing');
  if (typingEl) {
    const texts = [
      "Building scalable web applications with Angular & Spring Boot",
      "System Engineer at TCS · Cloud & DevOps Enthusiast",
      "AI/ML Explorer · Open Source Contributor",
      "Problem solver with strong engineering fundamentals"
    ];
    let ti = 0, ci = 0, deleting = false;
    function typeWriter() {
      const cur = texts[ti];
      if (!deleting) {
        typingEl.textContent = cur.substring(0, ci + 1);
        ci++;
        if (ci === cur.length) { deleting = true; setTimeout(typeWriter, 2000); return; }
      } else {
        typingEl.textContent = cur.substring(0, ci);
        ci--;
        if (ci < 0) { deleting = false; ti = (ti + 1) % texts.length; setTimeout(typeWriter, 400); return; }
      }
      setTimeout(typeWriter, deleting ? 30 : 60);
    }
    typeWriter();
  }

  // Navbar and FAB scroll
  const navbar = document.getElementById('navbar');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const fabContainer = document.getElementById('fab-container');
  
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    if (fabContainer) fabContainer.classList.toggle('show', window.scrollY > 300);
    
    if (progressBar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (window.scrollY / h * 100) + '%';
    }
  });

  // Mobile menu toggle
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); revealObserver.unobserve(e.target); } });
  }, { threshold: 0 });
  reveals.forEach(el => {
    // Immediately activate elements already in view on page load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('active');
    } else {
      revealObserver.observe(el);
    }
  });


  // Stats counter
  const stats = document.querySelectorAll('.stat-number[data-target]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = +el.dataset.target;
        const inc = target / 60;
        let current = 0;
        const timer = setInterval(() => {
          current += inc;
          if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
          else el.textContent = Math.floor(current);
        }, 25);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(el => statsObserver.observe(el));

  // Project filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      const projectTypeEl = document.getElementById('project-type');
      const budgetEl = document.getElementById('budget');
      const projectType = projectTypeEl ? projectTypeEl.options[projectTypeEl.selectedIndex].text : '';
      const budget = budgetEl ? budgetEl.options[budgetEl.selectedIndex].text : '';
      const msgEl = document.getElementById('form-message');
      let valid = true;

      document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

      if (!name) { document.getElementById('name-error').textContent = 'Name is required'; valid = false; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('email-error').textContent = 'Valid email required'; valid = false; }
      if (!subject) { document.getElementById('subject-error').textContent = 'Subject is required'; valid = false; }
      if (!message) { document.getElementById('message-error').textContent = 'Message is required'; valid = false; }

      if (!valid) return;

      const btn = document.getElementById('submit-btn');
      const originalBtnText = btn ? btn.textContent : 'Send Message →';
      
      if (btn) {
        btn.textContent = 'Sending Message...';
        btn.disabled = true;
      }

      if (msgEl) {
        msgEl.className = 'info';
        msgEl.textContent = 'Sending your message...';
      }

      const payload = {
        name: name,
        email: email,
        _subject: `${subject} (${projectType} - Budget: ${budget})`,
        "Project Type": projectType,
        "Estimated Budget": budget,
        "Subject": subject,
        "Message": message,
        _captcha: "false",
        _template: "table"
      };

      const mailtoSubject = encodeURIComponent(`${subject} (${projectType} - Budget: ${budget})`);
      const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject Type: ${projectType}\nEstimated Budget: ${budget}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:aayushgupta047@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      try {
        const response = await fetch('https://formsubmit.co/ajax/aayushgupta047@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success === 'true' || result.success === true) {
          if (msgEl) {
            msgEl.className = 'success';
            msgEl.textContent = '✅ Message sent successfully! I will get back to you soon.';
          }
          form.reset();
        } else if (result.message && result.message.includes('Activation')) {
          if (msgEl) {
            msgEl.className = 'info';
            msgEl.innerHTML = '📧 FormSubmit sent an activation email to <strong>aayushgupta047@gmail.com</strong>. Please check your inbox and click "Activate Form" once to enable instant email delivery.';
          }
        } else {
          console.warn('FormSubmit response:', result);
          if (msgEl) {
            msgEl.className = 'error';
            msgEl.innerHTML = `⚠️ ${result.message || 'Could not send message automatically.'} <br>You can also email me directly at <a href="${mailtoLink}">aayushgupta047@gmail.com</a>.`;
          }
        }
      } catch (error) {
        console.error('Contact form submission failed:', error);
        if (msgEl) {
          msgEl.className = 'error';
          msgEl.innerHTML = `📧 Network error sending message. Please email directly at <a href="${mailtoLink}">aayushgupta047@gmail.com</a>.`;
        }
      } finally {
        if (btn) {
          btn.textContent = originalBtnText;
          btn.disabled = false;
        }
      }
    });
  }

  // Modal logic
  const resumeBtn = document.getElementById('open-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  
  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('show');
    });
    
    // Close on outside click
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('show');
      }
    });
  }

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.remove('show');
    });
  });

  // Mouse tracking for glowing cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update theme icon
    const themeIcon = themeToggle.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = currentTheme === 'light' ? '☀️' : '🌙';
    }
    
    themeToggle.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
      }
    });
  }
});