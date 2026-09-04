import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';

const ContactButton: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'hello@aravindmv.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy email', e);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 rounded-full bg-accent text-bg px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(96,165,250,0.25)]"
      >
        <Mail size={15} />
        <span>Send Email</span>
      </a>

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/40 px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-95"
        title="Copy email address to clipboard"
      >
        {copied ? (
          <>
            <Check size={14} className="text-green-400 animate-bounce" />
            <span className="text-green-400">Copied to clipboard!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>Copy Email</span>
          </>
        )}
      </button>
    </div>
  );
};

export { ContactButton };
export default ContactButton;
