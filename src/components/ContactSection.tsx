import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import SectionLabel from './SectionLabel';
import SectionCounter from './SectionCounter';

const links = [
  { label: 'GitHub', href: 'https://github.com/mr-mister007', desc: 'github.com/mr-mister007' },
  { label: 'Email', href: 'mailto:aravind@serververse.qzz.io', desc: 'aravind@serververse.qzz.io' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aravindmv03', desc: 'linkedin.com/in/aravindmv03' },
];

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative min-h-screen flex items-center px-6 md:px-12 py-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section label */}
        <SectionLabel>Contact</SectionLabel>

        {/* Heading */}
        <FadeIn delay={0.1} y={16} variant="up" duration={0.6}>
          <h2 className="section-heading text-[clamp(2.5rem,8vw,5rem)] text-text-primary mb-1">
            Let&apos;s <span className="text-accent">talk</span>
          </h2>
        </FadeIn>

        <div className="mb-6">
          <SectionCounter index={5} total={5} />
        </div>

        <FadeIn delay={0.2} y={14} variant="up" duration={0.6}>
          <p className="text-text-secondary font-light leading-relaxed max-w-lg mb-10">
            Have a platform to build, a pipeline to unclog, or an infrastructure problem to solve?
            I&apos;m always open to interesting work.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={12} variant="up" duration={0.5}>
          <ContactButton />
        </FadeIn>

        {/* Links */}
        <div className="flex flex-wrap gap-8 mt-16">
          {links.map((link, i) => (
            <FadeIn key={link.label} delay={0.35 + i * 0.08} y={10} variant="up" duration={0.5}>
              <a
                href={link.href}
                className="group"
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className="text-sm text-text-secondary block mb-1 group-hover:text-text-primary transition-colors">
                  {link.label}
                </span>
                <span className="text-sm text-text-primary font-medium link-underline">
                  {link.desc}
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
