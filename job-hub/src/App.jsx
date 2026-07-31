import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import CompanyGrid from './components/CompanyGrid';
import CoverLetterModal from './components/CoverLetterModal';
import { profileData, companiesData } from './data/profile';

const STORAGE_KEYS = {
  statuses: 'job_tracker_statuses',
  notes: 'job_tracker_notes',
};

function readStoredValue(key, fallback) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [targetCountry, setTargetCountry] = useState('USA');
  const [targetRole, setTargetRole] = useState('Full Stack Developer Java Spring Boot Angular React');
  const [statuses, setStatuses] = useState(() => readStoredValue(STORAGE_KEYS.statuses, {}));
  const [notes, setNotes] = useState(() => readStoredValue(STORAGE_KEYS.notes, {}));
  const [coverLetterCompany, setCoverLetterCompany] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.statuses, JSON.stringify(statuses));
  }, [statuses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timer = window.setTimeout(() => setToastMessage(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const categories = useMemo(() => ['All', ...new Set(companiesData.map((company) => company.category))], []);

  const filteredCompanies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return companiesData.filter((company) => {
      const matchesCategory = currentCategory === 'All' || company.category === currentCategory;
      const matchesSearch =
        !query ||
        company.name.toLowerCase().includes(query) ||
        company.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [currentCategory, searchQuery]);

  const headerStats = useMemo(() => {
    const applied = Object.values(statuses).filter((value) => value === 'Applied').length;
    const interviewing = Object.values(statuses).filter((value) => value === 'Interviewing').length;

    return {
      total: companiesData.length,
      applied,
      interviewing,
    };
  }, [statuses]);

  const showToast = (message) => setToastMessage(message);

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied ${label} to clipboard`);
    } catch (error) {
      console.error('Clipboard copy failed', error);
      showToast('Copy failed. Please try again.');
    }
  };

  const handleStatusChange = (companyName, newStatus) => {
    setStatuses((previous) => ({ ...previous, [companyName]: newStatus }));
    showToast(`Updated ${companyName} to ${newStatus}`);
  };

  const handleNoteChange = (companyName, value) => {
    setNotes((previous) => ({ ...previous, [companyName]: value }));
  };

  const handleOpenModal = (companyName) => setCoverLetterCompany(companyName);
  const handleCloseModal = () => setCoverLetterCompany(null);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-container">
          <div className="logo-group">
            <div className="logo-icon">🚀</div>
            <div>
              <h1 className="app-title">Job Application Hub</h1>
              <p className="subtitle">100 top tech companies • 1-click auto-fill assistance</p>
            </div>
          </div>

          <div className="header-stats">
            <div className="stat-chip">
              <div className="stat-value">{headerStats.total}</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-chip">
              <div className="stat-value">{headerStats.applied}</div>
              <div className="stat-label">Applied</div>
            </div>
            <div className="stat-chip">
              <div className="stat-value">{headerStats.interviewing}</div>
              <div className="stat-label">Interviewing</div>
            </div>
          </div>
        </div>
      </header>

      <div className="main-container">
        <Sidebar profile={profileData} onCopy={handleCopy} />

        <main className="content-area">
          <CompanyGrid
            companies={filteredCompanies}
            categories={categories}
            currentCategory={currentCategory}
            onSelectCategory={setCurrentCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            targetCountry={targetCountry}
            onCountryChange={setTargetCountry}
            targetRole={targetRole}
            onRoleChange={setTargetRole}
            statuses={statuses}
            notes={notes}
            onStatusChange={handleStatusChange}
            onNoteChange={handleNoteChange}
            onOpenModal={handleOpenModal}
          />
        </main>
      </div>

      <CoverLetterModal
        open={Boolean(coverLetterCompany)}
        companyName={coverLetterCompany}
        profile={profileData}
        targetCountry={targetCountry}
        targetRole={targetRole}
        onClose={handleCloseModal}
        onCopy={handleCopy}
      />

      {toastMessage ? <div className="toast">{toastMessage}</div> : null}
    </div>
  );
}

export default App;
