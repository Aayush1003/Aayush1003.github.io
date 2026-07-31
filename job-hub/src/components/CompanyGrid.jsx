import { Search } from 'lucide-react';

function CompanyGrid({
  companies,
  categories,
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  targetCountry,
  onCountryChange,
  targetRole,
  onRoleChange,
  statuses,
  notes,
  onStatusChange,
  onNoteChange,
  onOpenModal,
}) {
  const generateSearchUrl = (company, country, role) => {
    const query = encodeURIComponent(`site:${new URL(company.url).hostname} ${role} ${country}`);
    return `https://www.google.com/search?q=${query}`;
  };

  return (
    <div className="content-stack">
      <div className="toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search companies or sectors"
          />
        </div>

        <div className="select-group">
          <select value={targetCountry} onChange={(event) => onCountryChange(event.target.value)}>
            <option value="USA">🇺🇸 USA</option>
            <option value="India">🇮🇳 India</option>
            <option value="Canada">🇨🇦 Canada</option>
            <option value="United Kingdom">🇬🇧 UK</option>
            <option value="Germany">🇩🇪 Germany</option>
            <option value="Remote">🌐 Remote</option>
          </select>

          <select value={targetRole} onChange={(event) => onRoleChange(event.target.value)}>
            <option value="Full Stack Developer Java Spring Boot Angular React">Full Stack Developer</option>
            <option value="Java Spring Boot Microservices Developer">Backend / Java Engineer</option>
            <option value="Frontend Developer Angular React TypeScript">Frontend Engineer</option>
            <option value="Technical Lead Software Engineering">Technical Lead</option>
          </select>
        </div>
      </div>

      <div className="category-pills">
        {categories.map((category) => (
          <button
            key={category}
            className={`pill ${currentCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="company-grid">
        {companies.length === 0 ? (
          <div className="empty-state">No companies match the current search.</div>
        ) : (
          companies.map((company) => {
            const status = statuses[company.name] || 'Not Applied';
            const note = notes[company.name] || '';

            return (
              <article key={company.name} className="company-card">
                <div className="company-header">
                  <div>
                    <h3 className="company-name">{company.name}</h3>
                    <p className="company-sector">{company.category}</p>
                  </div>

                  <select
                    className={`status-badge status-${status.toLowerCase().replace(/\s+/g, '-')}`}
                    value={status}
                    onChange={(event) => onStatusChange(company.name, event.target.value)}
                  >
                    <option value="Not Applied">Not Applied</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <input
                  className="notes-input"
                  value={note}
                  placeholder="Add note (e.g. Req ID, Date)"
                  onChange={(event) => onNoteChange(company.name, event.target.value)}
                />

                <div className="card-actions">
                  <a href={generateSearchUrl(company, targetCountry, targetRole)} target="_blank" rel="noreferrer" className="action-btn btn-primary">
                    Apply / Search Jobs ↗
                  </a>
                  <button className="action-btn btn-secondary" onClick={() => onOpenModal(company.name)}>
                    Cover Letter ✉️
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CompanyGrid;
