import { Copy, Sparkles } from 'lucide-react';

function Sidebar({ profile, onCopy }) {
  const fields = [
    { label: 'Full Name', value: profile.fullName },
    { label: 'Email', value: profile.email },
    { label: 'Phone', value: profile.phone },
    { label: 'Location', value: profile.location },
    { label: 'LinkedIn', value: profile.linkedIn },
    { label: 'Role', value: profile.currentRole },
    { label: 'Skills', value: profile.skills },
  ];

  const bookmarklet = `javascript:(function(){var p=${JSON.stringify(profile)};var inputs=document.querySelectorAll('input, textarea');inputs.forEach(function(i){var n=(i.name||i.id||i.placeholder||i.getAttribute('aria-label')||'').toLowerCase();if(n.includes('first')||n.includes('name')&&!n.includes('last'))i.value=p.fullName.split(' ')[0];if(n.includes('last')||n.includes('surname'))i.value=p.fullName.split(' ')[1]||'';if(n.includes('full')&&n.includes('name'))i.value=p.fullName;if(n.includes('email'))i.value=p.email;if(n.includes('phone')||n.includes('mobile'))i.value=p.phone;if(n.includes('linkedin'))i.value=p.linkedIn;if(n.includes('location')||n.includes('city'))i.value=p.location;if(n.includes('summary')||n.includes('about'))i.value=p.summary;});alert('Auto-fill completed');})();`;

  return (
    <aside className="sidebar">
      <div className="panel-card profile-card">
        <div className="profile-header">
          <div className="avatar">AG</div>
          <div>
            <h2 className="candidate-name">{profile.fullName}</h2>
            <p className="candidate-title">{profile.jobTitle}</p>
          </div>
        </div>

        <div className="section-label">⚡ Quick profile copy</div>
        <div className="copy-list">
          {fields.map((field) => (
            <button key={field.label} className="copy-btn" onClick={() => onCopy(field.value, field.label)}>
              <div>
                <div className="field-name">{field.label}</div>
                <div className="field-val">{field.value}</div>
              </div>
              <Copy size={16} />
            </button>
          ))}
        </div>
      </div>

      <div className="panel-card tool-card">
        <div className="section-label">🪄 Auto-fill bookmarklet</div>
        <a className="bookmarklet-link" href={bookmarklet}>
          <Sparkles size={16} />
          Auto-fill form
        </a>
        <p className="bookmarklet-desc">
          Drag this to your bookmarks bar and use it on any application page to pre-fill your profile instantly.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
