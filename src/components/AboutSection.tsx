import { FadeIn } from './FadeIn';
import PipelineAnimation from './PipelineAnimation';
import SectionLabel from './SectionLabel';
import SectionCounter from './SectionCounter';
import TerminalWidget from './TerminalWidget';

const stats = [
  { value: '2+', label: 'Years in DevOps' },
  { value: '100+', label: 'Pipelines Built' },
  { value: '50+', label: 'Infra Projects' },
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center px-6 md:px-12 py-24">
      <div className="max-w-4xl mx-auto w-full">
        <SectionLabel>About</SectionLabel>

        {/* Heading */}
        <FadeIn delay={0.1} y={16} variant="up" duration={0.6}>
          <h2 className="section-heading text-[clamp(2.5rem,8vw,5rem)] text-text-primary mb-1">
            Building infrastructure<br />
            <span className="text-accent">that scales</span>
          </h2>
        </FadeIn>

        <div className="mb-8">
          <SectionCounter index={2} total={5} />
        </div>

        {/* Bio */}
        <FadeIn delay={0.2} y={16} variant="up" duration={0.6}>
          <p className="text-text-secondary text-[clamp(0.95rem,1.4vw,1.15rem)] font-light leading-relaxed max-w-2xl mb-12">
            With over two years in DevOps and platform engineering, I design and maintain cloud infrastructure,
            automate deployment pipelines, and keep production systems running smoothly. I enjoy turning complex
            infrastructure problems into simple, reliable solutions.
          </p>
        </FadeIn>

        {/* CI/CD Pipeline Visualization */}
        <FadeIn delay={0.25} y={12} variant="up" duration={0.6}>
          <div className="mb-14 py-6 px-4 rounded-xl border border-border/20 bg-white/[0.02]">
            <PipelineAnimation />
          </div>
        </FadeIn>

        {/* Stats */}
        <div className="flex gap-12 sm:gap-16 md:gap-20 mb-14">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.3 + i * 0.1} y={12} variant="up" duration={0.5}>
              <div>
                <span className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-accent block leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-text-secondary text-xs sm:text-sm font-light">
                  {stat.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Terminal Widget */}
        <FadeIn delay={0.35} y={12} variant="up" duration={0.6}>
          <TerminalWidget />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
