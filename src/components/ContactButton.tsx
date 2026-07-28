import React from 'react';

const ContactButton: React.FC = () => {
  const handleClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/40 px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <span>Get in touch</span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10l4-4-4-4" />
      </svg>
    </button>
  );
};

export { ContactButton };
export default ContactButton;
