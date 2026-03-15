console.log('Its working')

// Theme switching
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
		console.log('Option clicked:', mode)
		setTheme(mode)
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

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', async function(e) {
	e.preventDefault();

	const submitBtn = document.getElementById('submit-btn');
	const messageDiv = document.getElementById('form-message');

	submitBtn.value = 'Sending...';
	submitBtn.disabled = true;

	const formData = {
		name: document.getElementById('name').value,
		email: document.getElementById('email').value,
		subject: document.getElementById('subject').value,
		message: document.getElementById('message').value,
		timestamp: new Date()
	};

	try {
		// Check if Firebase is initialized
		if (!window.db) {
			throw new Error('Firebase not initialized. Please configure your Firebase project.');
		}

		await addDoc(collection(window.db, 'contacts'), formData);

		messageDiv.innerHTML = '<p style="color: green;">Message sent successfully!</p>';
		this.reset();
	} catch (error) {
		console.error('Error sending message:', error);
		messageDiv.innerHTML = '<p style="color: red;">Error sending message. Please try again or contact directly.</p>';
	} finally {
		submitBtn.value = 'Send';
		submitBtn.disabled = false;
	}
});

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
	fetchGitHubRepos();
	fetchGitHubStats();
	initializeAnimations();
	setupProjectFilters();
	setupScrollProgress();
	setupSmoothScrolling();
	
	// Hide loading screen after everything is loaded
	window.addEventListener('load', () => {
		setTimeout(() => {
			const loadingScreen = document.getElementById('loading-screen');
			loadingScreen.style.opacity = '0';
			setTimeout(() => {
				loadingScreen.style.display = 'none';
			}, 500);
		}, 1000);
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
	
	counters.forEach(counter => {
		const target = parseInt(counter.getAttribute('data-target'));
		const increment = target / 100;
		let current = 0;
		
		const timer = setInterval(() => {
			current += increment;
			if (current >= target) {
				counter.textContent = target;
				clearInterval(timer);
			} else {
				counter.textContent = Math.floor(current);
			}
		}, 30);
	});
}

// Skill Progress Bars Animation
function animateSkillBars() {
	const skillBars = document.querySelectorAll('.skill-fill');
	
	skillBars.forEach(bar => {
		const width = bar.getAttribute('data-width');
		bar.style.width = width + '%';
	});
}

// Intersection Observer for Animations
function initializeAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				if (entry.target.classList.contains('stats-section')) {
					animateCounters();
				}
				if (entry.target.classList.contains('about-me')) {
					setTimeout(animateSkillBars, 500);
				}
			}
		});
	}, observerOptions);
	
	// Observe sections
	document.querySelectorAll('.stats-section, .about-me').forEach(section => {
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