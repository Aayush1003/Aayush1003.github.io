/* Job Application Assistant & Auto-Fill Hub - JavaScript Logic */

// Candidate Profile Data (Aayush Gupta)
const CANDIDATE_PROFILE = {
  fullName: "Aayush Gupta",
  jobTitle: "Full Stack Developer / Software Engineer",
  email: "aayushgupta1003@gmail.com",
  phone: "+91 98269 36114",
  location: "Indore, Madhya Pradesh, India",
  linkedIn: "https://linkedin.com/in/aayushgupta",
  experienceYears: "4+ years",
  currentRole: "Technical Lead at Tata Consultancy Services (TCS)",
  skills: "Java, Spring Boot, Microservices, Angular, React.js, TypeScript, RESTful APIs, Node.js, Azure (AKS/ACA), Docker, Kubernetes, SQL, NoSQL, JUnit, Jenkins, CI/CD",
  education: "Bachelor of Technology in Information Technology, Medi-Caps University (2017-2021)",
  summary: "Software Developer with 4+ years of experience in Java, Angular, Spring Boot, Microservices, and cloud technologies. Proven track record delivering secure, scalable, and high-performing applications across banking, finance, airlines, and insurance domains. Adept at Agile/Scrum, CI/CD automation, and cloud deployments (Azure, Docker, Kubernetes)."
};

// 100 Companies Dataset with Categories
const COMPANIES_DATA = [
  // 1. Tech Giants
  { name: "Google", url: "https://careers.google.com", category: "Tech Giants" },
  { name: "Microsoft", url: "https://careers.microsoft.com", category: "Tech Giants" },
  { name: "Amazon", url: "https://www.amazon.jobs", category: "Tech Giants" },
  { name: "Apple", url: "https://jobs.apple.com", category: "Tech Giants" },
  { name: "Meta", url: "https://www.metacareers.com", category: "Tech Giants" },
  { name: "Sony", url: "https://sonyglobal.wd1.myworkdayjobs.com", category: "Tech Giants" },
  { name: "Panasonic", url: "https://careers.panasonic.com", category: "Tech Giants" },

  // 2. AI & Machine Learning
  { name: "NVIDIA", url: "https://www.nvidia.com/en-us/about-nvidia/careers", category: "AI & ML" },
  { name: "OpenAI", url: "https://openai.com/careers", category: "AI & ML" },
  { name: "Anthropic", url: "https://www.anthropic.com/careers", category: "AI & ML" },
  { name: "Cohere", url: "https://cohere.com/careers", category: "AI & ML" },
  { name: "Hugging Face", url: "https://huggingface.co/jobs", category: "AI & ML" },
  { name: "Databricks", url: "https://www.databricks.com/company/careers", category: "AI & ML" },

  // 3. Enterprise Software, Cloud & Data
  { name: "Oracle", url: "https://careers.oracle.com", category: "Enterprise & Cloud" },
  { name: "IBM", url: "https://www.ibm.com/careers", category: "Enterprise & Cloud" },
  { name: "Salesforce", url: "https://careers.salesforce.com", category: "Enterprise & Cloud" },
  { name: "SAP", url: "https://jobs.sap.com", category: "Enterprise & Cloud" },
  { name: "ServiceNow", url: "https://careers.servicenow.com", category: "Enterprise & Cloud" },
  { name: "Snowflake", url: "https://careers.snowflake.com", category: "Enterprise & Cloud" },
  { name: "MongoDB", url: "https://www.mongodb.com/careers", category: "Enterprise & Cloud" },
  { name: "Elastic", url: "https://www.elastic.co/careers", category: "Enterprise & Cloud" },
  { name: "Redis", url: "https://redis.io/careers", category: "Enterprise & Cloud" },
  { name: "Confluent", url: "https://careers.confluent.io", category: "Enterprise & Cloud" },
  { name: "HashiCorp", url: "https://www.hashicorp.com/careers", category: "Enterprise & Cloud" },
  { name: "Cloudflare", url: "https://www.cloudflare.com/careers", category: "Enterprise & Cloud" },
  { name: "Akamai", url: "https://careers.akamai.com", category: "Enterprise & Cloud" },
  { name: "Workday", url: "https://workday.wd5.myworkdayjobs.com", category: "Enterprise & Cloud" },
  { name: "Zendesk", url: "https://www.zendesk.com/company/careers", category: "Enterprise & Cloud" },
  { name: "Atlassian", url: "https://www.atlassian.com/company/careers", category: "Enterprise & Cloud" },

  // 4. Semiconductors, Hardware & Networking
  { name: "Intel", url: "https://jobs.intel.com", category: "Hardware & Networking" },
  { name: "Cisco", url: "https://jobs.cisco.com", category: "Hardware & Networking" },
  { name: "Adobe", url: "https://careers.adobe.com", category: "Enterprise & Cloud" },
  { name: "VMware", url: "https://careers.broadcom.com", category: "Enterprise & Cloud" },
  { name: "Qualcomm", url: "https://www.qualcomm.com/company/careers", category: "Hardware & Networking" },
  { name: "AMD", url: "https://careers.amd.com", category: "Hardware & Networking" },
  { name: "Broadcom", url: "https://careers.broadcom.com", category: "Hardware & Networking" },
  { name: "Dell Technologies", url: "https://jobs.dell.com", category: "Hardware & Networking" },
  { name: "HP Inc.", url: "https://jobs.hp.com", category: "Hardware & Networking" },
  { name: "HPE", url: "https://careers.hpe.com", category: "Hardware & Networking" },
  { name: "Lenovo", url: "https://jobs.lenovo.com", category: "Hardware & Networking" },
  { name: "Samsung Electronics", url: "https://sec.wd3.myworkdayjobs.com", category: "Hardware & Networking" },

  // 5. Developer Tools & OS
  { name: "GitHub", url: "https://github.careers", category: "Dev Tools" },
  { name: "GitLab", url: "https://about.gitlab.com/jobs", category: "Dev Tools" },
  { name: "Docker", url: "https://www.docker.com/careers", category: "Dev Tools" },
  { name: "Red Hat", url: "https://www.redhat.com/jobs", category: "Dev Tools" },
  { name: "Canonical", url: "https://canonical.com/careers", category: "Dev Tools" },
  { name: "SUSE", url: "https://www.suse.com/careers", category: "Dev Tools" },

  // 6. Fintech & Payments
  { name: "Stripe", url: "https://stripe.com/jobs", category: "Fintech" },
  { name: "PayPal", url: "https://careers.pypl.com", category: "Fintech" },
  { name: "Block", url: "https://block.xyz/careers", category: "Fintech" },
  { name: "Visa", url: "https://jobs.visa.com", category: "Fintech" },
  { name: "Mastercard", url: "https://careers.mastercard.com", category: "Fintech" },
  { name: "American Express", url: "https://careers.americanexpress.com", category: "Fintech" },
  { name: "Bloomberg", url: "https://www.bloomberg.com/company/careers", category: "Fintech" },
  { name: "Intuit", url: "https://www.intuit.com/careers", category: "Fintech" },
  { name: "Fiserv", url: "https://www.careers.fiserv.com", category: "Fintech" },
  { name: "FIS", url: "https://careers.fisglobal.com", category: "Fintech" },
  { name: "Wise", url: "https://www.wise.jobs", category: "Fintech" },
  { name: "Revolut", url: "https://www.revolut.com/careers", category: "Fintech" },
  { name: "Adyen", url: "https://careers.adyen.com", category: "Fintech" },
  { name: "Plaid", url: "https://plaid.com/careers", category: "Fintech" },
  { name: "Robinhood", url: "https://careers.robinhood.com", category: "Fintech" },
  { name: "Twilio", url: "https://www.twilio.com/company/jobs", category: "Enterprise & Cloud" },
  { name: "Okta", url: "https://www.okta.com/company/careers", category: "Enterprise & Cloud" },

  // 7. Gaming, Media & Social
  { name: "Electronic Arts", url: "https://www.ea.com/careers", category: "Gaming & Media" },
  { name: "Ubisoft", url: "https://www.ubisoft.com/en-us/company/careers", category: "Gaming & Media" },
  { name: "Riot Games", url: "https://www.riotgames.com/en/work-with-us", category: "Gaming & Media" },
  { name: "Epic Games", url: "https://www.epicgames.com/site/careers", category: "Gaming & Media" },
  { name: "Unity", url: "https://careers.unity.com", category: "Gaming & Media" },
  { name: "Roblox", url: "https://careers.roblox.com", category: "Gaming & Media" },
  { name: "Netflix", url: "https://jobs.netflix.com", category: "Gaming & Media" },
  { name: "Spotify", url: "https://www.lifeatspotify.com/jobs", category: "Gaming & Media" },
  { name: "ByteDance", url: "https://jobs.bytedance.com", category: "Gaming & Media" },
  { name: "Discord", url: "https://discord.com/jobs", category: "Gaming & Media" },

  // 8. Automotive, Autonomous & Engineering
  { name: "Tesla", url: "https://www.tesla.com/careers", category: "Automotive & Autonomous" },
  { name: "Waymo", url: "https://waymo.com/careers", category: "Automotive & Autonomous" },
  { name: "Zoox", url: "https://zoox.com/careers", category: "Automotive & Autonomous" },
  { name: "Rivian", url: "https://careers.rivian.com", category: "Automotive & Autonomous" },
  { name: "Cruise", url: "https://getcruise.com/careers", category: "Automotive & Autonomous" },
  { name: "Mobileye", url: "https://careers.mobileye.com", category: "Automotive & Autonomous" },
  { name: "Bosch", url: "https://careers.bosch.com", category: "Automotive & Autonomous" },
  { name: "Siemens", url: "https://jobs.siemens.com", category: "Automotive & Autonomous" },
  { name: "ABB", url: "https://global.abb/group/en/careers", category: "Automotive & Autonomous" },
  { name: "Schneider Electric", url: "https://careers.se.com", category: "Automotive & Autonomous" },

  // 9. IT Services & Consulting
  { name: "Accenture", url: "https://www.accenture.com/careers", category: "IT Services" },
  { name: "Capgemini", url: "https://www.capgemini.com/careers", category: "IT Services" },
  { name: "Cognizant", url: "https://careers.cognizant.com", category: "IT Services" },
  { name: "DXC", url: "https://careers.dxc.com", category: "IT Services" },
  { name: "CGI", url: "https://cgi.njoyn.com", category: "IT Services" },
  { name: "EPAM", url: "https://careers.epam.com", category: "IT Services" },
  { name: "Endava", url: "https://careers.endava.com", category: "IT Services" },
  { name: "Globant", url: "https://career.globant.com", category: "IT Services" },
  { name: "Thoughtworks", url: "https://www.thoughtworks.com/careers", category: "IT Services" },
  { name: "Luxoft", url: "https://career.luxoft.com", category: "IT Services" },
  { name: "NTT DATA", url: "https://careers.nttdata.com", category: "IT Services" },
  { name: "Fujitsu", url: "https://global.fujitsu/en/careers", category: "IT Services" },
  { name: "NEC", url: "https://www.nec.com/en/global/careers", category: "IT Services" }
];

// App State Management
let appState = {
  currentCategory: "All",
  searchQuery: "",
  targetCountry: "USA", // Default
  targetRole: "Full Stack Developer Java Spring Boot",
  statuses: JSON.parse(localStorage.getItem("job_tracker_statuses") || "{}"),
  notes: JSON.parse(localStorage.getItem("job_tracker_notes") || "{}")
};

// DOM References
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  renderProfileSection();
  renderBookmarklet();
  renderCategories();
  renderCompanyGrid();
  setupEventListeners();
  updateHeaderStats();
}

function renderProfileSection() {
  const container = document.getElementById("profileCopyList");
  if (!container) return;

  const fields = [
    { name: "Full Name", key: "fullName" },
    { name: "Email", key: "email" },
    { name: "Phone", key: "phone" },
    { name: "Job Title", key: "jobTitle" },
    { name: "Location", key: "location" },
    { name: "LinkedIn", key: "linkedIn" },
    { name: "Technical Skills", key: "skills" },
    { name: "Current Role", key: "currentRole" },
    { name: "Education", key: "education" },
    { name: "Summary", key: "summary" }
  ];

  container.innerHTML = fields.map(f => `
    <button class="copy-btn" onclick="copyToClipboard('${CANDIDATE_PROFILE[f.key]}', '${f.name}')">
      <div>
        <div class="field-name">${f.name}</div>
        <div class="field-val">${CANDIDATE_PROFILE[f.key]}</div>
      </div>
      <span class="copy-icon">📋</span>
    </button>
  `).join("");
}

function renderBookmarklet() {
  const link = document.getElementById("bookmarkletBtn");
  if (!link) return;

  const code = `javascript:(function(){
    var p = ${JSON.stringify(CANDIDATE_PROFILE)};
    var inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(function(i) {
      var n = (i.name || i.id || i.placeholder || i.getAttribute('aria-label') || '').toLowerCase();
      if(n.includes('first') || n.includes('name') && !n.includes('last')) i.value = p.fullName.split(' ')[0];
      if(n.includes('last') || n.includes('surname')) i.value = p.fullName.split(' ')[1] || '';
      if(n.includes('full') && n.includes('name')) i.value = p.fullName;
      if(n.includes('email')) i.value = p.email;
      if(n.includes('phone') || n.includes('mobile')) i.value = p.phone;
      if(n.includes('linkedin')) i.value = p.linkedIn;
      if(n.includes('location') || n.includes('city')) i.value = p.location;
      if(n.includes('summary') || n.includes('about')) i.value = p.summary;
    });
    alert('Aayush Gupta Auto-Fill Completed!');
  })();`;

  link.href = code;
}

function renderCategories() {
  const container = document.getElementById("categoryPills");
  if (!container) return;

  const categories = ["All", ...new Set(COMPANIES_DATA.map(c => c.category))];

  container.innerHTML = categories.map(cat => `
    <button class="pill ${cat === appState.currentCategory ? 'active' : ''}" onclick="selectCategory('${cat}')">
      ${cat}
    </button>
  `).join("");
}

function renderCompanyGrid() {
  const container = document.getElementById("companyGrid");
  if (!container) return;

  const filtered = COMPANIES_DATA.filter(c => {
    const matchesCategory = appState.currentCategory === "All" || c.category === appState.currentCategory;
    const matchesSearch = c.name.toLowerCase().includes(appState.searchQuery.toLowerCase()) || 
                          c.category.toLowerCase().includes(appState.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-dim);">No companies found matching your search.</div>`;
    return;
  }

  container.innerHTML = filtered.map(company => {
    const status = appState.statuses[company.name] || "Not Applied";
    const note = appState.notes[company.name] || "";
    
    // Generate Country & Role specific career search link
    const searchUrl = generateJobSearchUrl(company.name, company.url, appState.targetCountry, appState.targetRole);

    return `
      <div class="company-card">
        <div>
          <div class="company-header">
            <div>
              <div class="company-name">${company.name}</div>
              <div class="company-sector">${company.category}</div>
            </div>
            <select class="status-badge status-${status.toLowerCase().replace(" ", "-")}" onchange="updateStatus('${company.name}', this.value)">
              <option value="Not Applied" ${status === "Not Applied" ? "selected" : ""}>Not Applied</option>
              <option value="Applied" ${status === "Applied" ? "selected" : ""}>Applied</option>
              <option value="Interviewing" ${status === "Interviewing" ? "selected" : ""}>Interviewing</option>
              <option value="Offer" ${status === "Offer" ? "selected" : ""}>Offer</option>
              <option value="Rejected" ${status === "Rejected" ? "selected" : ""}>Rejected</option>
            </select>
          </div>
        </div>

        <div>
          <input type="text" class="notes-input" placeholder="Add note (e.g. Req ID, Date)..." value="${note}" onchange="updateNote('${company.name}', this.value)" />
        </div>

        <div class="card-actions">
          <a href="${searchUrl}" target="_blank" class="action-btn btn-primary">
            <span>Apply / Search Jobs</span> ↗
          </a>
          <button class="action-btn btn-secondary" onclick="openCoverLetterModal('${company.name}')">
            <span>Cover Letter</span> ✉️
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function generateJobSearchUrl(companyName, baseCareerUrl, country, role) {
  // Use Google search query directly targeting company career portal with target country & role keyword for instant matching!
  const query = encodeURIComponent(`site:${new URL(baseCareerUrl).hostname} ${role} ${country}`);
  return `https://www.google.com/search?q=${query}`;
}

function selectCategory(category) {
  appState.currentCategory = category;
  renderCategories();
  renderCompanyGrid();
}

function setupEventListeners() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      appState.searchQuery = e.target.value;
      renderCompanyGrid();
    });
  }

  const countrySelect = document.getElementById("countrySelect");
  if (countrySelect) {
    countrySelect.addEventListener("change", (e) => {
      appState.targetCountry = e.target.value;
      renderCompanyGrid();
    });
  }

  const roleSelect = document.getElementById("roleSelect");
  if (roleSelect) {
    roleSelect.addEventListener("change", (e) => {
      appState.targetRole = e.target.value;
      renderCompanyGrid();
    });
  }
}

function updateStatus(companyName, newStatus) {
  appState.statuses[companyName] = newStatus;
  localStorage.setItem("job_tracker_statuses", JSON.stringify(appState.statuses));
  renderCompanyGrid();
  updateHeaderStats();
  showToast(`Updated status for ${companyName} to '${newStatus}'`);
}

function updateNote(companyName, noteText) {
  appState.notes[companyName] = noteText;
  localStorage.setItem("job_tracker_notes", JSON.stringify(appState.notes));
}

function updateHeaderStats() {
  const total = COMPANIES_DATA.length;
  const applied = Object.values(appState.statuses).filter(s => s === "Applied").length;
  const interviewing = Object.values(appState.statuses).filter(s => s === "Interviewing").length;

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statApplied").textContent = applied;
  document.getElementById("statInterviewing").textContent = interviewing;
}

function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${label} to clipboard!`);
  }).catch(err => {
    console.error('Copy failed: ', err);
  });
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✅</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Cover Letter Generator
function openCoverLetterModal(companyName) {
  const modal = document.getElementById("coverLetterModal");
  const modalTitle = document.getElementById("modalCompanyTitle");
  const textarea = document.getElementById("coverLetterText");

  modalTitle.textContent = `Tailored Cover Letter for ${companyName}`;

  const letter = `Dear Hiring Manager at ${companyName},

I am writing to express my strong interest in the Full Stack / Software Engineer positions at ${companyName}. With over 4 years of hands-on experience as a Technical Lead and Software Engineer at Tata Consultancy Services (TCS), I specialize in building enterprise-grade Java, Spring Boot microservices, Angular, and React applications deployed on cloud platforms like Azure, Docker, and Kubernetes.

In my recent projects (including Nexus 2.0 and airline/banking client applications), I successfully:
• Led monolith-to-microservice migrations from Node.js to Java Spring Boot, boosting API scalability and performance.
• Designed responsive front-end applications using Angular, TypeScript, and React.js.
• Executed cloud infrastructure migrations to Azure Container Apps (ACA), optimizing cloud cost efficiency and CI/CD automation.

I am greatly impressed by ${companyName}'s innovation and engineering culture, and I am eager to leverage my full-stack expertise to drive high-quality software solutions in your ${appState.targetCountry} teams.

Thank you for your time and consideration. I look forward to discussing how my experience aligns with your engineering goals.

Sincerely,
Aayush Gupta
+91 98269 36114 | aayushgupta1003@gmail.com
Indore, India | LinkedIn: https://linkedin.com/in/aayushgupta`;

  textarea.value = letter;
  modal.classList.add("active");
}

function closeModal() {
  document.getElementById("coverLetterModal").classList.remove("active");
}

function copyCoverLetter() {
  const textarea = document.getElementById("coverLetterText");
  copyToClipboard(textarea.value, "Cover Letter");
  closeModal();
}
