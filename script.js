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
});