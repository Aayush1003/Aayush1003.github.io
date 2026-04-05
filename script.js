// script loaded

// Theme switching with enhanced feedback
let theme = localStorage.getItem('theme')

if(theme == null){
	// Check for system preference
	if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
		setTheme('blue') // Default dark theme
	} else {
		setTheme('light')
	}
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')

for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode
		console.log('Theme selected:', mode)
		setTheme(mode)
		// Add visual feedback
		this.style.transform = 'scale(1.2)';
		setTimeout(() => {
			this.style.transform = 'scale(1)';
		}, 300);
	})
}

function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'default.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = 'green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = 'purple.css'
	}

	localStorage.setItem('theme', mode)
}

// Contact Form Interactivity - Make form more engaging
function setupContactFormInteractivity() {
	const form = document.getElementById('contact-form');
	if (!form) return;

	const fields = form.querySelectorAll('.input-field');
	const container = form.closest('.main-container');

	// Add focus effects to form fields
	fields.forEach(field => {
		field.addEventListener('focus', function() {
			this.parentElement.classList.add('focused');
			// Add glow effect
			this.style.boxShadow = '0 0 20px rgba(23, 162, 184, 0.4), inset 0 0 10px rgba(23, 162, 184, 0.1)';
		});

		field.addEventListener('blur', function() {
			this.parentElement.classList.remove('focused');
			if (!this.value) {
				this.style.boxShadow = '';
			}
		});

		// Create floating label effect
		field.addEventListener('input', function() {
			const label = this.previousElementSibling;
			if (label && this.value) {
				label.style.transform = 'translateY(-25px) scale(0.9)';
				label.style.color = '#17a2b8';
			} else if (label) {
				label.style.transform = 'translateY(0) scale(1)';
				label.style.color = 'inherit';
			}
		});
	});

	// Add particle effect on form interaction
	form.addEventListener('click', function(e) {
		if (e.target.classList.contains('input-field')) {
			createFloatingParticles(e.clientX, e.clientY);
		}
	});

	// Animate form on page load
	form.style.animation = 'slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
}

// Create floating particles on interaction
function createFloatingParticles(x, y) {
	const particleCount = 8;
	for (let i = 0; i < particleCount; i++) {
		const particle = document.createElement('div');
		particle.style.cssText = `
			position: fixed;
			left: ${x}px;
			top: ${y}px;
			width: 6px;
			height: 6px;
			background: linear-gradient(135deg, #17a2b8, #28a745);
			border-radius: 50%;
			pointer-events: none;
			z-index: 1000;
			animation: particleFloat 1s ease-out forwards;
		`;

		const angle = (i / particleCount) * Math.PI * 2;
		const velocity = 50 + Math.random() * 100;

		particle.style.setProperty('--tx', Math.cos(angle) * velocity);
		particle.style.setProperty('--ty', Math.sin(angle) * velocity);

		document.body.appendChild(particle);

		setTimeout(() => particle.remove(), 1000);
	}
}

// Add particle animation keyframes
function initializeParticleAnimations() {
	if (document.getElementById('particle-animations')) return;

	const style = document.createElement('style');
	style.id = 'particle-animations';
	style.textContent = `
		@keyframes particleFloat {
			0% {
				transform: translate(0, 0);
				opacity: 1;
			}
			100% {
				transform: translate(var(--tx, 0), var(--ty, 0));
				opacity: 0;
			}
		}

		.form-group.focused label {
			color: #17a2b8 !important;
		}

		.input-field:valid {
			border-color: #28a745;
		}
	`;
	document.head.appendChild(style);
}

// Contact Form Interactivity
if (contactForm) {
	// Real-time validation
	const fields = ['name', 'email', 'subject', 'message'];
	
	fields.forEach(fieldId => {
		const field = document.getElementById(fieldId);
		if (field) {
			field.addEventListener('blur', () => validateField(field));
			field.addEventListener('input', () => {
				if (field.classList.contains('error')) {
					validateField(field);
				}
			});
		}
	});

	function validateField(field) {
		const errorEl = document.getElementById(field.id + '-error');
		let isValid = true;
		let errorMessage = '';

		if (field.id === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			isValid = emailRegex.test(field.value.trim());
			errorMessage = 'Please enter a valid email address';
		} else if (field.id === 'name') {
			isValid = field.value.trim().length >= 2;
			errorMessage = 'Name must be at least 2 characters';
		} else if (field.id === 'subject') {
			isValid = field.value.trim().length >= 3;
			errorMessage = 'Subject must be at least 3 characters';
		} else if (field.id === 'message') {
			isValid = field.value.trim().length >= 10;
			errorMessage = 'Message must be at least 10 characters';
		}

		if (!field.value.trim()) {
			isValid = false;
			errorMessage = 'This field is required';
		}

		if (isValid) {
			field.classList.remove('error');
			if (errorEl) errorEl.textContent = '';
		} else {
			field.classList.add('error');
			if (errorEl) errorEl.textContent = errorMessage;
		}

		return isValid;
	}

	contactForm.addEventListener('submit', async function(e) {
		e.preventDefault();

		// Validate all fields
		let allValid = true;
		fields.forEach(fieldId => {
			if (!validateField(document.getElementById(fieldId))) {
				allValid = false;
			}
		});

		if (!allValid) return;

		const submitBtn = document.getElementById('submit-btn');
		const messageDiv = document.getElementById('form-message');

		const name = document.getElementById('name').value.trim();
		const email = document.getElementById('email').value.trim();
		const subject = document.getElementById('subject').value.trim();
		const message = document.getElementById('message').value.trim();

		submitBtn.textContent = '✉️ Sending...';
		submitBtn.disabled = true;
		messageDiv.innerHTML = '';

		try {
			// Send via EmailJS
			const response = await emailJS.send('service_rqo828j', 'template_w87qlwp', {
				to_email: 'aayushgupta047@gmail.com',
				from_name: name,
				from_email: email,
				subject: subject,
				message: message,
				reply_to: email
			});

			if (response.status === 200) {
				// Trigger confetti celebration
				createConfetti();

				// Show success message with animation
				messageDiv.innerHTML = `
					<div class="success-message">
						<div class="success-icon">✓</div>
						<div class="success-text">
							<h4>Message Delivered Successfully! 🎉</h4>
							<p>Thank you <strong>${name}</strong>! Your message has been sent to aayushgupta047@gmail.com</p>
							<p class="delivery-time">I'll get back to you within 24 hours.</p>
						</div>
					</div>
				`;
				messageDiv.classList.add('show');

				// Reset form
				this.reset();
				fields.forEach(fieldId => document.getElementById(fieldId).classList.remove('error'));

				// Auto-hide message after 5 seconds
				setTimeout(() => {
					messageDiv.classList.remove('show');
				}, 5000);
			}
		} catch (error) {
			console.error('Email sending error:', error);
			
			// Fallback: Store locally
			const backupKey = 'contacts_backup';
			const existing = JSON.parse(localStorage.getItem(backupKey) || '[]');
			existing.push({ name, email, subject, message, timestamp: new Date() });
			localStorage.setItem(backupKey, JSON.stringify(existing));

			messageDiv.innerHTML = `
				<div class="warning-message">
					<div class="warning-icon">⚠️</div>
					<div class="warning-text">
						<p><strong>Message Saved Locally</strong></p>
						<p>Email service temporarily unavailable. Your message has been saved and will be reviewed.</p>
					</div>
				</div>
			`;
			messageDiv.classList.add('show');
		} finally {
			submitBtn.textContent = 'Send Message';
			submitBtn.disabled = false;
		}
	});
}

// Contact form handling

// GitHub API integration
async function fetchGitHubRepos() {
	try {
		const response = await fetch('https://api.github.com/users/Aayush1003/repos?sort=updated&per_page=6');
		const repos = await response.json();

		const reposContainer = document.createElement('div');
		reposContainer.id = 'github-repos';
		reposContainer.innerHTML = '<h4>Recent Repositories</h4>';

		repos.forEach(repo => {
			if (!repo.fork) { // Exclude forks
				const repoDiv = document.createElement('div');
				repoDiv.className = 'repo-item';
				repoDiv.innerHTML = `
					<h5><a href="${repo.html_url}" target="_blank">${repo.name}</a></h5>
					<p>${repo.description || 'No description available'}</p>
					<div class="repo-stats">
						<span>⭐ ${repo.stargazers_count}</span>
						<span>🍴 ${repo.forks_count}</span>
						<span>${repo.language || 'N/A'}</span>
					</div>
				`;
				reposContainer.appendChild(repoDiv);
			}
		});

		document.getElementById('github-stats').appendChild(reposContainer);
	} catch (error) {
		console.error('Error fetching GitHub repos:', error);
	}
}

// Load GitHub data on page load
document.addEventListener('DOMContentLoaded', function() {
	initializeParticleAnimations();
	setupContactFormInteractivity();
	fetchGitHubRepos();
	fetchGitHubStats();
	fetchYouTubeStats();
	initializeAnimations();
	setupProjectFilters();
	setupProjectModalListeners();
	setupResumeModalListeners();
	setupScrollProgress();
	setupSmoothScrolling();
	setupDynamicProjectCards();
	addHoverEffects();
	
	// Engagement features
	setupTestimonialsCarousel();
	setupSkillInteraction();
	initializeActivityFeed();
	setupSocialSharing();
	setupNewsletterPopup();
	trackEngagement();
	setupSupportWidget();
	
	// Extra cool features
	initializeExtraFeatures();
	
	// Handle loading screen fade out
	window.addEventListener('load', () => {
		setTimeout(() => {
			const loadingScreen = document.getElementById('loading-screen');
			if (loadingScreen) {
				loadingScreen.style.transition = 'opacity 0.5s ease-out';
				loadingScreen.style.opacity = '0';
				loadingScreen.style.pointerEvents = 'none';
				setTimeout(() => {
					loadingScreen.style.display = 'none';
				}, 500);
			}
		}, 800); // Reduced delay for faster transition
	});
});

// Scroll Progress Bar
function setupScrollProgress() {
	const progressBar = document.querySelector('.scroll-progress-bar');
	
	window.addEventListener('scroll', () => {
		const scrollTop = window.pageYOffset;
		const docHeight = document.body.offsetHeight - window.innerHeight;
		const scrollPercent = (scrollTop / docHeight) * 100;
		
		progressBar.style.width = scrollPercent + '%';
	});
}

// Project Modal Handlers
function setupProjectModalListeners(){
	const modal = document.getElementById('project-modal');
	const closeBtn = modal.querySelector('.modal-close');

	// Close when clicking close button
	closeBtn.addEventListener('click', () => closeProjectModal());

	// Close when clicking outside content
	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeProjectModal();
	});

	// Intercept project links
	document.querySelectorAll('.post-preview a').forEach(link => {
		link.addEventListener('click', function(e){
			e.preventDefault();
			const card = this.closest('.project-card');
			if (!card) return;
			const titleEl = card.querySelector('.post-title');
			const introEl = card.querySelector('.post-intro');
			const imgEl = card.querySelector('.thumbnail');
			const techEl = card.querySelector('.project-tech');

			const data = {
				title: titleEl ? titleEl.textContent : 'Project',
				intro: introEl ? introEl.textContent : '',
				img: imgEl ? imgEl.src : '',
				tech: techEl ? techEl.textContent : ''
			};

			openProjectModal(data);
		});
	});
}

function setupResumeModalListeners(){
	const modal = document.getElementById('resume-modal');
	const closeBtn = modal.querySelector('.modal-close');

	// Close when clicking close button
	closeBtn.addEventListener('click', () => closeResumeModal());

	// Close when clicking outside content
	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeResumeModal();
	});
}

function openProjectModal(data){
	const modal = document.getElementById('project-modal');
	modal.querySelector('.modal-title').textContent = data.title || '';
	modal.querySelector('.modal-intro').textContent = data.intro || '';
	const img = modal.querySelector('.modal-img');

	// Show project image if available; fall back cleanly if it can't be loaded.
	if (data.img) {
		img.src = data.img;
		img.alt = `${data.title || 'Project'} image`;
		img.style.display = 'block';
		img.onerror = () => {
			// Hide broken image and show a fallback placeholder (inlined SVG avoids external network requests)
			img.onerror = null;
			img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22280%22%20height%3D%22180%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f2f2f2%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23999%22%20font-family%3D%22system-ui%2C%20sans-serif%22%20font-size%3D%2216%22%3ENo%20image%3C/text%3E%3C/svg%3E';
			img.alt = 'No project image available';
		};
	} else {
		img.style.display = 'none';
	}

	modal.querySelector('.modal-tech').textContent = data.tech || '';
	modal.classList.add('open');
	modal.setAttribute('aria-hidden','false');
}

function closeProjectModal(){
	const modal = document.getElementById('project-modal');
	modal.classList.remove('open');
	modal.setAttribute('aria-hidden','true');
}

// Resume Modal Handlers
function openResumeModal(){
	const modal = document.getElementById('resume-modal');
	modal.classList.add('open');
	modal.setAttribute('aria-hidden','false');
}

function closeResumeModal(){
	const modal = document.getElementById('resume-modal');
	modal.classList.remove('open');
	modal.setAttribute('aria-hidden','true');
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
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
}

// Animated Counters
function animateCounters() {
	const counters = document.querySelectorAll('.stat-number');
	
	counters.forEach((counter, index) => {
		// Add staggered animation
		setTimeout(() => {
			const target = parseInt(counter.getAttribute('data-target'));
			let current = 0;
			const duration = 2000; // 2 seconds
			const increment = target / (duration / 16); // Assuming 60fps
			
			const timer = setInterval(() => {
				current += increment;
				if (current >= target) {
					counter.textContent = target.toLocaleString();
					clearInterval(timer);
				} else {
					counter.textContent = Math.floor(current).toLocaleString();
				}
			}, 16);
		}, index * 100); // Stagger each counter by 100ms
	});
}

// Enhanced Skill Progress Bars Animation
function animateSkillBars() {
	const skillFills = document.querySelectorAll('.skill-fill');
	
	skillFills.forEach((bar, index) => {
		// Set initial width to 0
		bar.style.width = '0%';
		
		// Trigger animation with stagger
		setTimeout(() => {
			const width = bar.getAttribute('data-width');
			bar.style.transition = 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
			bar.style.width = width + '%';
		}, index * 100);
	});
}

// Enhanced Initialize Animations
function initializeAnimations() {
	const observerOptions = {
		threshold: 0.15,
		rootMargin: '0px 0px -100px 0px'
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Animate stats
				if (entry.target.classList.contains('stats-section')) {
					animateCounters();
					observer.unobserve(entry.target);
				}
				// Animate skill bars
				if (entry.target.classList.contains('about-me')) {
					setTimeout(() => animateSkillBars(), 200);
					observer.unobserve(entry.target);
				}
				// Animate sections on scroll
				if (entry.target.classList.contains('s1') || entry.target.classList.contains('s2')) {
					entry.target.style.opacity = '1';
					entry.target.style.transform = 'translateY(0)';
				}
			}
		});
	}, observerOptions);
	
	// Observe sections for stats and skills
	document.querySelectorAll('.stats-section, .about-me').forEach(section => {
		observer.observe(section);
	});
	
	// Observe all sections for fade-in effect
	document.querySelectorAll('.s1, .s2').forEach(section => {
		section.style.opacity = '0.7';
		section.style.transform = 'translateY(20px)';
		section.style.transition = 'all 0.6s ease-out';
		observer.observe(section);
	});
}

// Project Filtering
function setupProjectFilters() {
	const filterButtons = document.querySelectorAll('.filter-btn');
	const projectCards = document.querySelectorAll('.project-card');
	
	filterButtons.forEach(button => {
		button.addEventListener('click', () => {
			// Remove active class from all buttons
			filterButtons.forEach(btn => btn.classList.remove('active'));
			// Add active class to clicked button
			button.classList.add('active');
			
			const filterValue = button.getAttribute('data-filter');
			
			projectCards.forEach(card => {
				if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
					card.style.display = 'block';
					setTimeout(() => card.style.opacity = '1', 10);
				} else {
					card.style.opacity = '0';
					setTimeout(() => card.style.display = 'none', 300);
				}
			});
		});
	});
}

// Enhanced GitHub Stats
async function fetchGitHubStats() {
	try {
		const userResponse = await fetch('https://api.github.com/users/Aayush1003');
		const userData = await userResponse.json();
		
		document.getElementById('repo-count').textContent = userData.public_repos;
		document.getElementById('followers-count').textContent = userData.followers;
		
		// Get total stars and forks
		const reposResponse = await fetch('https://api.github.com/users/Aayush1003/repos?per_page=100');
		const repos = await reposResponse.json();
		
		let totalStars = 0;
		let totalForks = 0;
		
		repos.forEach(repo => {
			totalStars += repo.stargazers_count;
			totalForks += repo.forks_count;
		});
		
		document.getElementById('stars-count').textContent = totalStars;
		document.getElementById('forks-count').textContent = totalForks;
		
	} catch (error) {
		console.error('Error fetching GitHub stats:', error);
	}
}

// YouTube Channel Stats Integration
async function fetchYouTubeStats() {
	try {
		// Since YouTube API requires API key, using alternative approach with RSS feed parsing
		const channelName = 'AayushGupta04';
		const youtubeLink = document.querySelector('.youtube-link');
		
		// Add animated loading state
		if (youtubeLink) {
			youtubeLink.style.transition = 'all 0.3s ease';
			youtubeLink.addEventListener('mouseenter', function() {
				this.style.transform = 'translateX(5px)';
				this.style.boxShadow = '0 8px 20px rgba(255, 0, 0, 0.3)';
			});
			youtubeLink.addEventListener('mouseleave', function() {
				this.style.transform = 'translateX(0)';
				this.style.boxShadow = 'none';
			});
		}
	} catch (error) {
		console.error('Error fetching YouTube stats:', error);
	}
}

// Dynamic Project Cards from GitHub
async function setupDynamicProjectCards() {
	try {
		const response = await fetch('https://api.github.com/users/Aayush1003/repos?sort=stars&per_page=6');
		const repos = await response.json();
		
		if (!repos || repos.length === 0) return;
		
		// Add a 'Featured Projects' badge animation
		const projectCards = document.querySelectorAll('.project-card');
		projectCards.forEach((card, index) => {
			// Add stagger animation
			card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
			
			// Add hover glow effect
			card.addEventListener('mouseenter', function() {
				this.style.transform = 'translateY(-8px)';
				this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
			});
			
			card.addEventListener('mouseleave', function() {
				this.style.transform = 'translateY(0)';
				this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
			});
		});
	} catch (error) {
		console.error('Error setting up dynamic project cards:', error);
	}
}

// Enhanced Hover Effects for Interactive Elements
function addHoverEffects() {
	// Skill category cards with glow
	document.querySelectorAll('.skill-category').forEach(category => {
		category.style.transition = 'all 0.3s ease';
		category.addEventListener('mouseenter', function() {
			this.style.transform = 'scale(1.05)';
			this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
		});
		category.addEventListener('mouseleave', function() {
			this.style.transform = 'scale(1)';
			this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
		});
	});
	
	// Achievement items with slide effect
	document.querySelectorAll('.achievement-item').forEach(item => {
		item.style.transition = 'all 0.4s ease';
		item.addEventListener('mouseenter', function() {
			this.style.transform = 'translateY(-5px) scale(1.02)';
			this.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
		});
		item.addEventListener('mouseleave', function() {
			this.style.transform = 'translateY(0) scale(1)';
			this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
		});
	});
	
	// GitHub stat cards with bounce
	document.querySelectorAll('.github-stat-card').forEach(card => {
		card.style.transition = 'all 0.3s ease';
		card.addEventListener('mouseenter', function() {
			this.style.transform = 'translateY(-10px) scale(1.05)';
			this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
		});
		card.addEventListener('mouseleave', function() {
			this.style.transform = 'translateY(0) scale(1)';
			this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
		});
	});
	
	// Experience items with left border highlight
	document.querySelectorAll('.experience-item').forEach(item => {
		item.style.transition = 'all 0.3s ease';
		item.addEventListener('mouseenter', function() {
			this.style.borderLeftColor = 'var(--accentColor)';
			this.style.paddingLeft = '20px';
			this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
		});
		item.addEventListener('mouseleave', function() {
			this.style.borderLeftColor = 'var(--borderColor)';
			this.style.paddingLeft = '15px';
			this.style.boxShadow = 'none';
		});
	});
	
	// Social links with icon animation
	document.querySelectorAll('.social-links a').forEach(link => {
		link.style.transition = 'all 0.3s ease';
		link.addEventListener('mouseenter', function() {
			this.style.color = 'var(--accentColor)';
			this.style.transform = 'translateX(8px)';
		});
		link.addEventListener('mouseleave', function() {
			this.style.color = 'var(--mainColor)';
			this.style.transform = 'translateX(0)';
		});
	});
}

// Floating Action Button
function scrollToContact() {
	document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Confetti animation for successful message send
function createConfetti() {
	const confettiContainer = document.createElement('div');
	confettiContainer.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 10000;
	`;
	document.body.appendChild(confettiContainer);

	const colors = ['#17a2b8', '#28a745', '#FFD700', '#FF69B4', '#87CEEB'];
	
	for (let i = 0; i < 30; i++) {
		const confetti = document.createElement('div');
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		const randomX = Math.random() * window.innerWidth;
		const randomDelay = Math.random() * 0.3;
		const randomDuration = 2 + Math.random() * 1;

		confetti.style.cssText = `
			position: absolute;
			left: ${randomX}px;
			top: -10px;
			width: 10px;
			height: 10px;
			background: ${randomColor};
			border-radius: 50%;
			opacity: 1;
			animation: fall ${randomDuration}s ease-in forwards;
			animation-delay: ${randomDelay}s;
		`;

		confettiContainer.appendChild(confetti);
	}

	// Add animation keyframes if not exists
	if (!document.getElementById('confetti-keyframes')) {
		const style = document.createElement('style');
		style.id = 'confetti-keyframes';
		style.textContent = `
			@keyframes fall {
				to {
					transform: translateY(${window.innerHeight}px) rotate(360deg);
					opacity: 0;
				}
			}
		`;
		document.head.appendChild(style);
	}

	// Clean up after animation
	setTimeout(() => {
		confettiContainer.remove();
	}, 3500);
}

// ==================== ENGAGEMENT FEATURES ====================

// 1. TESTIMONIALS CAROUSEL
function setupTestimonialsCarousel() {
	const testimonialItems = document.querySelectorAll('.testimonial-item');
	if (testimonialItems.length === 0) return;
	
	let currentIndex = 0;
	
	function showTestimonial(index) {
		testimonialItems.forEach((item, i) => {
			item.style.display = i === index ? 'block' : 'none';
			if (i === index) {
				item.style.animation = 'slideInUp 0.6s ease-out';
			}
		});
	}
	
	// Auto-rotate testimonials every 8 seconds
	setInterval(() => {
		currentIndex = (currentIndex + 1) % testimonialItems.length;
		const container = document.querySelector('.testimonials-grid');
		if (container) {
			container.style.opacity = '0.5';
			setTimeout(() => {
				showTestimonial(currentIndex);
				container.style.opacity = '1';
			}, 300);
		}
	}, 8000);
	
	showTestimonial(0);
}

// 2. SKILL PROGRESS TRACKER WITH INTERACTION
function setupSkillInteraction() {
	const skillItems = document.querySelectorAll('.skill-item');
	
	skillItems.forEach(item => {
		item.style.cursor = 'pointer';
		item.style.paddingBottom = '10px';
		
		item.addEventListener('click', function() {
			const skillName = this.querySelector('.skill-name span').textContent;
			const percentage = this.querySelector('.skill-percentage').textContent;
			
			// Show interaction feedback
			showNotification(`Master in ${skillName} - ${percentage}!`, 'success');
			
			// Animate bar fill
			const bar = this.querySelector('.skill-fill');
			bar.style.animation = 'pulse 0.6s ease';
		});
		
		item.addEventListener('mouseenter', function() {
			this.style.transform = 'translateX(10px)';
			this.style.boxShadow = '0 4px 15px rgba(23, 162, 184, 0.2)';
		});
		
		item.addEventListener('mouseleave', function() {
			this.style.transform = 'translateX(0)';
			this.style.boxShadow = 'none';
		});
	});
}

// 3. VISITOR ACTIVITY FEED
function initializeActivityFeed() {
	const activityData = JSON.parse(localStorage.getItem('activityFeed') || '[]');
	const maxActivities = 5;
	
	// Add current visit
	const now = new Date();
	const activity = {
		time: now.toLocaleTimeString(),
		action: 'Visited Portfolio',
		timestamp: now.getTime()
	};
	
	activityData.unshift(activity);
	if (activityData.length > maxActivities) {
		activityData.pop();
	}
	
	localStorage.setItem('activityFeed', JSON.stringify(activityData));
	
	// Display activity feed
	const feedContainer = document.querySelector('.activity-feed');
	if (feedContainer) {
		feedContainer.innerHTML = '<h5 style="margin-bottom: 15px; color: var(--mainText);">Recent Visits</h5>';
		
		activityData.forEach((item, index) => {
			const feedItem = document.createElement('div');
			feedItem.className = 'feed-item';
			feedItem.style.cssText = `
				padding: 10px;
				border-left: 3px solid #17a2b8;
				margin-bottom: 8px;
				font-size: 0.85rem;
				opacity: 0;
				animation: slideInLeft 0.5s ease-out ${index * 0.1}s forwards;
			`;
			feedItem.innerHTML = `<span style="color: #17a2b8;">●</span> ${item.action} at ${item.time}`;
			feedContainer.appendChild(feedItem);
		});
	}
}

// 4. SOCIAL SHARING BUTTONS
function setupSocialSharing() {
	const projectCards = document.querySelectorAll('.project-card');
	
	projectCards.forEach(card => {
		const shareBtn = document.createElement('button');
		shareBtn.className = 'share-btn';
		shareBtn.innerHTML = '📤 Share';
		shareBtn.style.cssText = `
			position: absolute;
			top: 10px;
			right: 10px;
			background: rgba(23, 162, 184, 0.9);
			color: white;
			border: none;
			padding: 6px 12px;
			border-radius: 5px;
			cursor: pointer;
			font-size: 0.85rem;
			opacity: 0;
			transition: all 0.3s ease;
			z-index: 10;
		`;
		
		card.style.position = 'relative';
		card.appendChild(shareBtn);
		
		card.addEventListener('mouseenter', () => {
			shareBtn.style.opacity = '1';
		});
		
		card.addEventListener('mouseleave', () => {
			shareBtn.style.opacity = '0';
		});
		
		shareBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			const title = card.querySelector('.post-title').textContent;
			const projectUrl = window.location.href;
			
			// Copy to clipboard
			const text = `Check out my project: "${title}" - ${projectUrl}`;
			navigator.clipboard.writeText(text).then(() => {
				showNotification('Project link copied! 🎉', 'success');
			});
		});
	});
}

// 5. NEWSLETTER SUBSCRIPTION POPUP
function setupNewsletterPopup() {
	// Check if user has already subscribed
	if (localStorage.getItem('newsletterSubscribed')) return;
	
	// Show popup after 15 seconds
	setTimeout(() => {
		const popup = document.createElement('div');
		popup.className = 'newsletter-popup';
		popup.style.cssText = `
			position: fixed;
			bottom: 20px;
			left: 20px;
			background: white;
			padding: 25px;
			border-radius: 12px;
			box-shadow: 0 10px 40px rgba(0,0,0,0.25);
			z-index: 3000;
			max-width: 320px;
			animation: slideInUp 0.5s ease-out;
		`;
		
		popup.innerHTML = `
			<button style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.2rem; cursor: pointer;">×</button>
			<h4 style="margin: 0 0 10px 0; color: black;">Stay Updated! 🚀</h4>
			<p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">Get notified about new projects and updates.</p>
			<input type="email" placeholder="your@email.com" class="newsletter-email" style="
				width: 100%;
				padding: 10px;
				border: 1px solid #ddd;
				border-radius: 5px;
				margin-bottom: 10px;
				box-sizing: border-box;
			" />
			<button class="newsletter-btn" style="
				width: 100%;
				padding: 10px;
				background: #17a2b8;
				color: white;
				border: none;
				border-radius: 5px;
				cursor: pointer;
				font-weight: bold;
				transition: all 0.3s;
			">Subscribe Now</button>
		`;
		
		document.body.appendChild(popup);
		
		// Close button
		popup.querySelector('button:first-of-type').addEventListener('click', () => {
			popup.style.animation = 'slideOutDown 0.4s ease-out forwards';
			setTimeout(() => popup.remove(), 400);
		});
		
		// Subscribe button
		const subscribeBtn = popup.querySelector('.newsletter-btn');
		subscribeBtn.addEventListener('mouseover', function() {
			this.style.transform = 'scale(1.05)';
			this.style.boxShadow = '0 5px 15px rgba(23, 162, 184, 0.4)';
		});
		subscribeBtn.addEventListener('mouseout', function() {
			this.style.transform = 'scale(1)';
			this.style.boxShadow = 'none';
		});
		
		subscribeBtn.addEventListener('click', () => {
			const email = popup.querySelector('.newsletter-email').value;
			if (email && email.includes('@')) {
				localStorage.setItem('newsletterSubscribed', 'true');
				localStorage.setItem('subscriberEmail', email);
				popup.style.animation = 'slideOutDown 0.4s ease-out forwards';
				setTimeout(() => {
					popup.remove();
					showNotification('Welcome to updates! 📧', 'success');
				}, 400);
			} else {
				showNotification('Please enter a valid email', 'error');
			}
		});
	}, 15000);
}

// 9. SUPPORT/HELP WIDGET
function setupSupportWidget() {
	const widget = document.createElement('div');
	widget.className = 'support-widget';
	widget.style.cssText = `
		position: fixed;
		bottom: 20px;
		left: 20px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 5px 20px rgba(0,0,0,0.15);
		z-index: 2500;
		max-width: 350px;
		overflow: hidden;
		transition: all 0.3s ease;
	`;
	
	widget.innerHTML = `
		<div style="background: #17a2b8; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
			<div>
				<h4 style="margin: 0; font-size: 1rem;">💬 Quick Help</h4>
				<p style="margin: 0; font-size: 0.8rem; opacity: 0.9;">Ask me anything</p>
			</div>
			<button class="widget-close" style="background: none; border: none; color: white; font-size: 1.3rem; cursor: pointer;">−</button>
		</div>
		<div class="widget-content" style="padding: 15px; display: none;">
			<p style="margin: 0 0 10px 0; font-size: 0.9rem; color: #333;">Popular questions:</p>
			<div class="help-items">
				<button class="help-btn" style="
					display: block;
					width: 100%;
					text-align: left;
					background: #f5f5f5;
					border: 1px solid #ddd;
					padding: 10px;
					margin-bottom: 8px;
					border-radius: 5px;
					cursor: pointer;
					transition: all 0.3s;
					font-size: 0.85rem;
				" data-answer="Sure! Check my GitHub profile for all my projects, or explore the 'Projects' section above.">
					📁 Where can I see your projects?
				</button>
				<button class="help-btn" style="
					display: block;
					width: 100%;
					text-align: left;
					background: #f5f5f5;
					border: 1px solid #ddd;
					padding: 10px;
					margin-bottom: 8px;
					border-radius: 5px;
					cursor: pointer;
					transition: all 0.3s;
					font-size: 0.85rem;
				" data-answer="I'm a Full Stack Developer at TCS with expertise in Angular, Spring Boot, and cloud technologies. Let's connect!">
					👨‍💼 Tell me about yourself
				</button>
				<button class="help-btn" style="
					display: block;
					width: 100%;
					text-align: left;
					background: #f5f5f5;
					border: 1px solid #ddd;
					padding: 10px;
					margin-bottom: 8px;
					border-radius: 5px;
					cursor: pointer;
					transition: all 0.3s;
					font-size: 0.85rem;
				" data-answer="Fill out the contact form below or reach out on LinkedIn @Aayush Gupta. I'd love to hear from you!">
					💌 How can I contact you?
				</button>
			</div>
		</div>
	`;
	
	document.body.appendChild(widget);
	
	// Toggle widget
	const header = widget.querySelector('div:first-child');
	const content = widget.querySelector('.widget-content');
	const closeBtn = widget.querySelector('.widget-close');
	
	header.addEventListener('click', () => {
		const isOpen = content.style.display === 'block';
		content.style.display = isOpen ? 'none' : 'block';
		closeBtn.textContent = isOpen ? '−' : '✕';
	});
	
	closeBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		widget.style.opacity = '0';
		widget.style.pointerEvents = 'none';
		setTimeout(() => {
			widget.remove();
		}, 300);
	});
	
	// Help button actions
	document.querySelectorAll('.help-btn').forEach(btn => {
		btn.addEventListener('mouseenter', function() {
			this.style.background = '#e0e0e0';
		});
		btn.addEventListener('mouseleave', function() {
			this.style.background = '#f5f5f5';
		});
		btn.addEventListener('click', function() {
			const answer = this.getAttribute('data-answer');
			showNotification(answer, 'info');
		});
	});
}

// ==================== EXTRA COOL FEATURES ====================

// 10. CONFETTI ANIMATION
function createConfetti() {
	const confettiPiece = document.createElement('div');
	const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	
	confettiPiece.style.cssText = `
		position: fixed;
		width: 10px;
		height: 10px;
		background: ${randomColor};
		pointer-events: none;
		z-index: 9999;
		animation: confettiFall 3s ease-out forwards;
	`;
	
	confettiPiece.style.left = Math.random() * window.innerWidth + 'px';
	confettiPiece.style.top = '50%';
	document.body.appendChild(confettiPiece);
	
	setTimeout(() => confettiPiece.remove(), 3000);
}

function triggerConfetti() {
	for (let i = 0; i < 50; i++) {
		setTimeout(() => createConfetti(), i * 30);
	}
}

// 11. KEYBOARD SHORTCUTS
function setupKeyboardShortcuts() {
	document.addEventListener('keydown', (e) => {
		if (e.key === '?') {
			e.preventDefault();
			showShortcutsHelp();
		} else if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			showCommandPalette();
		} else if (e.key === 'Escape') {
			// Hide open modals
			const modals = document.querySelectorAll('.modal.open');
			modals.forEach(modal => modal.classList.remove('open'));
		}
	});
}

function showShortcutsHelp() {
	const shortcuts = `
		⌨️ KEYBOARD SHORTCUTS
		━━━━━━━━━━━━━━━━━━━━
		? - Show this help
		K - Command palette
		Esc - Close modals
		↓ - Scroll down
		↑ - Scroll up
	`;
	showNotification(shortcuts, 'info');
}

function showCommandPalette() {
	showNotification('💪 Power user mode activated!', 'info');
}

// 12. RIPPLE EFFECT
function setupRippleEffects() {
	document.querySelectorAll('button, .theme-dot, .filter-btn, .help-btn').forEach(el => {
		el.addEventListener('click', function(e) {
			const ripple = document.createElement('span');
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;
			
			ripple.style.cssText = `
				position: absolute;
				width: ${size}px;
				height: ${size}px;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 50%;
				transform: scale(0);
				animation: ripple 0.6s ease-out;
				pointer-events: none;
				left: ${x}px;
				top: ${y}px;
			`;
			
			this.style.position = 'relative';
			this.style.overflow = 'hidden';
			this.appendChild(ripple);
			
			setTimeout(() => ripple.remove(), 600);
		});
	});
}

// 13. SCROLL-TRIGGERED ANIMATIONS
function setupScrollAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -100px 0px'
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);
	
	// Observe all sections and cards
	document.querySelectorAll('section, .project-card, .experience-item, .achievement-item').forEach(el => {
		el.style.opacity = '0';
		observer.observe(el);
	});
}

// 14. INTERACTIVE TIMELINE
function setupInteractiveTimeline() {
	const timelineItems = document.querySelectorAll('.timeline-item');
	
	timelineItems.forEach((item, index) => {
		item.style.cursor = 'pointer';
		item.style.transition = 'all 0.3s ease';
		
		const content = item.querySelector('.timeline-content');
		const initialHeight = content.scrollHeight;
		content.style.maxHeight = initialHeight + 'px';
		
		item.addEventListener('click', function() {
			this.classList.toggle('expanded');
			
			if (this.classList.contains('expanded')) {
				content.style.maxHeight = initialHeight + 'px';
				this.style.transform = 'scale(1.02)';
			} else {
				content.style.maxHeight = '0';
				this.style.transform = 'scale(1)';
			}
		});
		
		item.addEventListener('mouseenter', function() {
			if (!this.classList.contains('expanded')) {
				this.style.boxShadow = '0 8px 20px rgba(23, 162, 184, 0.2)';
			}
		});
		
		item.addEventListener('mouseleave', function() {
			if (!this.classList.contains('expanded')) {
				this.style.boxShadow = 'none';
			}
		});
		
		// Mark first item as expanded by default
		if (index === 0) {
			item.classList.add('expanded');
		}
	});
}

// 15. GLITCH TEXT EFFECT (Easter Egg)
function setupGlitchEffect() {
	const headings = document.querySelectorAll('h1, h2, h3');
	
	headings.forEach(heading => {
		heading.addEventListener('mouseenter', function() {
			if (Math.random() > 0.7) { // 30% chance
				this.classList.add('glitch');
				setTimeout(() => {
					this.classList.remove('glitch');
				}, 600);
			}
		});
	});
}

// 16. EASTER EGG ON PROFILE
function setupProfilePicEasterEgg() {
	const profilePic = document.getElementById('profile_pic');
	if (!profilePic) return;
	
	let clickCount = 0;
	profilePic.style.cursor = 'pointer';
	
	profilePic.addEventListener('click', () => {
		clickCount++;
		
		if (clickCount === 1) {
			profilePic.style.transform = 'rotate(5deg)';
		} else if (clickCount === 2) {
			profilePic.style.transform = 'rotate(-5deg)';
		} else if (clickCount === 3) {
			profilePic.style.transform = 'rotate(0deg) scale(1.1)';
		} else if (clickCount >= 5) {
			triggerConfetti();
			showNotification('🎉 You found the Easter egg!', 'achievement');
			clickCount = 0;
		}
	});
	
	profilePic.addEventListener('mouseenter', function() {
		this.style.filter = 'brightness(1.2)';
	});
	
	profilePic.addEventListener('mouseleave', function() {
		this.style.filter = 'brightness(1)';
	});
}

// 17. PROJECT HOVER ENHANCEMENT (Removed flip for better UX with current structure)
function setupProjectHoverEnhancement() {
	const projectCards = document.querySelectorAll('.project-card');
	
	projectCards.forEach(card => {
		const post = card.querySelector('.post');
		
		card.addEventListener('mouseenter', function() {
			post.style.transform = 'scale(1.03) translateY(-5px)';
			post.style.boxShadow = '0 20px 50px rgba(23, 162, 184, 0.3)';
		});
		
		card.addEventListener('mouseleave', function() {
			post.style.transform = 'scale(1) translateY(0)';
			post.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
		});
	});
}

// 18. ENHANCED PARTICLES MOVEMENT
function enhanceParticles() {
	// Particles already setup, but let's add more interactivity
	if (window.pJSDom && window.pJSDom[0]) {
		const pJS = window.pJSDom[0].pJS;
		
		document.addEventListener('mousemove', (e) => {
			if (pJS && pJS.particles) {
				const x = (e.clientX) / window.innerWidth;
				const y = (e.clientY) / window.innerHeight;
				
				pJS.particles.array.forEach(p => {
					p.vx += (x - 0.5) * 0.1;
					p.vy += (y - 0.5) * 0.1;
				});
			}
		});
	}
}

// Initialize all extra features
function initializeExtraFeatures() {
	setupKeyboardShortcuts();
	setupRippleEffects();
	setupScrollAnimations();
	setupInteractiveTimeline();
	setupGlitchEffect();
	setupProfilePicEasterEgg();
	setupProjectHoverEnhancement();
	enhanceParticles();
}

// 7. NOTIFICATION SYSTEM
function showNotification(message, type = 'info') {
	const notification = document.createElement('div');
	notification.style.cssText = `
		position: fixed;
		top: 20px;
		right: 20px;
		background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : type === 'achievement' ? '#FF9800' : '#2196F3'};
		color: white;
		padding: 16px 24px;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.25);
		z-index: 10000;
		animation: slideInRight 0.4s ease-out;
		font-weight: bold;
		max-width: 300px;
	`;
	notification.textContent = message;
	document.body.appendChild(notification);
	
	// Auto-remove after 4 seconds
	setTimeout(() => {
		notification.style.animation = 'slideOutRight 0.4s ease-out forwards';
		setTimeout(() => notification.remove(), 400);
	}, 4000);
}

// 8. ENGAGEMENT TRACKING
function trackEngagement() {
	let timeOnSite = 0;
	
	setInterval(() => {
		timeOnSite += 1;
		localStorage.setItem('timeOnSite', timeOnSite);
		
		// Update display
		const timeSpent = document.getElementById('time-spent');
		if (timeSpent) {
			if (timeOnSite < 60) {
				timeSpent.textContent = timeOnSite + 's';
			} else if (timeOnSite < 3600) {
				const minutes = Math.floor(timeOnSite / 60);
				const seconds = timeOnSite % 60;
				timeSpent.textContent = minutes + 'm ' + seconds + 's';
			} else {
				const hours = Math.floor(timeOnSite / 3600);
				const minutes = Math.floor((timeOnSite % 3600) / 60);
				timeSpent.textContent = hours + 'h ' + minutes + 'm';
			}
		}
	}, 1000);
	
	// Track interactions
	document.addEventListener('click', () => {
		const clicks = parseInt(localStorage.getItem('interactions') || 0) + 1;
		localStorage.setItem('interactions', clicks);
		
		// Update interaction count display
		const interactionCount = document.getElementById('interaction-count');
		if (interactionCount) {
			interactionCount.textContent = clicks;
		}
		
		// Milestone notifications
		if (clicks === 5) showNotification('You\'re exploring well! 👀', 'info');
		if (clicks === 10) showNotification('You\'re really interested! 🎯', 'info');
		if (clicks === 20) showNotification('Impressive engagement! Keep going! 🚀', 'info');
	});
	
	// Update initial values
	const savedInteractions = localStorage.getItem('interactions') || 0;
	const achievementCount = document.getElementById('achievement-count');
	const interactionCount = document.getElementById('interaction-count');
	
	if (interactionCount) {
		interactionCount.textContent = savedInteractions;
	}
	
	// Count unlocked achievements
	if (achievementCount) {
		let count = 0;
		if (localStorage.getItem('achievement_firstVisit')) count++;
		if (localStorage.getItem('achievement_scrolled')) count++;
		if (localStorage.getItem('achievement_visitedProjects')) count++;
		if (localStorage.getItem('achievement_contactForm')) count++;
		if (localStorage.getItem('achievement_darkMode')) count++;
		achievementCount.textContent = count;
	}
}

// Floating Action Button
function scrollToContact() {
	document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Particles.js Configuration
particlesJS('particles-js', {
	particles: {
		number: {
			value: 80,
			density: {
				enable: true,
				value_area: 800
			}
		},
		color: {
			value: '#000000'
		},
		shape: {
			type: 'circle',
			stroke: {
				width: 0,
				color: '#000000'
			}
		},
		opacity: {
			value: 0.1,
			random: false,
			anim: {
				enable: false
			}
		},
		size: {
			value: 3,
			random: true,
			anim: {
				enable: false
			}
		},
		line_linked: {
			enable: true,
			distance: 150,
			color: '#000000',
			opacity: 0.1,
			width: 1
		},
		move: {
			enable: true,
			speed: 2,
			direction: 'none',
			random: false,
			straight: false,
			out_mode: 'out',
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200
			}
		}
	},
	interactivity: {
		detect_on: 'canvas',
		events: {
			onhover: {
				enable: true,
				mode: 'repulse'
			},
			onclick: {
				enable: true,
				mode: 'push'
			}
		},
		modes: {
			repulse: {
				distance: 100,
				duration: 0.4
			},
			push: {
				particles_nb: 4
			}
		}
	},
	retina_detect: true
});