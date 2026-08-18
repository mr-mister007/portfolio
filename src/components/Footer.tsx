import { FadeIn } from './FadeIn';
import StatusBadge from './StatusBadge';

const links = [
  { label: 'GitHub', href: 'https://github.com/mr-mister007' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aravindmv03' },
  { label: 'Email', href: 'mailto:aravind@serververse.qzz.io' },
];

const Footer: React.FC = () => {
  return (
    <footer className="px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-border">
          <FadeIn delay={0} y={6} variant="up" duration={0.5}>
            <p className="text-sm text-text-secondary font-light">
              &copy; {new Date().getFullYear()} Aravind. All rights reserved.
            </p>
          </FadeIn>

          <FadeIn delay={0.05} y={6} variant="up" duration={0.5}>
            <StatusBadge />
          </FadeIn>

          <FadeIn delay={0.1} y={6} variant="up" duration={0.5}>
            <div className="flex gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors link-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
