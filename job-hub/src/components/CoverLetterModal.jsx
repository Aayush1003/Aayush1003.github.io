function CoverLetterModal({ open, companyName, profile, targetCountry, targetRole, onClose, onCopy }) {
  if (!open || !companyName) return null;

  const letter = `Dear Hiring Manager at ${companyName},

I am writing to express my strong interest in the ${targetRole} opportunities at ${companyName}. With over 4 years of hands-on experience as a Technical Lead and Software Engineer, I specialize in building enterprise-grade Java, Spring Boot microservices, Angular, and React applications deployed on cloud platforms like Azure, Docker, and Kubernetes.

In my recent projects, I successfully led monolith-to-microservice migrations, designed responsive front-end applications, and executed cloud infrastructure migrations to Azure Container Apps, optimizing scalability and CI/CD automation.

I am greatly impressed by ${companyName}'s innovation and engineering culture, and I am eager to leverage my full-stack expertise to contribute to your ${targetCountry} engineering teams.

Thank you for your time and consideration. I look forward to discussing how my experience aligns with your goals.

Sincerely,
${profile.fullName}
${profile.phone} | ${profile.email}
${profile.location} | LinkedIn: ${profile.linkedIn}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Tailored Cover Letter for {companyName}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <textarea className="cover-letter-text" readOnly value={letter} />

        <div className="modal-actions">
          <button className="action-btn btn-secondary" onClick={onClose}>Close</button>
          <button className="action-btn btn-primary" onClick={() => onCopy(letter, 'Cover Letter')}>
            Copy Cover Letter
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoverLetterModal;
