import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import TiltCard from './TiltCard';
import SectionLabel from './SectionLabel';
import SectionCounter from './SectionCounter';
import GitHubStats from './GitHubStats';

const projects = [
  {
    number: '01',
    title: 'Kubernetes Cluster Migration',
    description: 'Migrated 50+ microservices from a legacy data center to auto-scaling EKS clusters with zero downtime. Implemented canary deployments and automated rollback strategies.',
    tech: 'AWS · EKS · Terraform · ArgoCD',
  },
  {
    number: '02',
    title: 'CI/CD Pipeline Platform',
    description: 'Built a self-serve CI/CD platform serving 15 engineering teams. Integrated security scanning, artifact management, and deployment gates with full audit trail.',
    tech: 'GitHub Actions · Docker · Helm · Prometheus',
  },
  {
    number: '03',
    title: 'Cloud Cost Optimisation',
    description: 'Reduced monthly cloud spend by 40% through right-sizing, spot instances, and automated resource scheduling. Built real-time cost dashboards with Grafana.',
    tech: 'AWS · Terraform · Python · Grafana',
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="work" className="relative min-h-screen px-6 md:px-12 py-24">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Selected Work</SectionLabel>

        <FadeIn delay={0.1} y={16} variant="up" duration={0.6}>
          <h2 className="section-heading text-[clamp(2.5rem,8vw,5rem)] text-text-primary mb-1">
            Projects
          </h2>
        </FadeIn>

        <div className="mb-14">
          <SectionCounter index={3} total={5} />
        </div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <FadeIn key={project.number} delay={0.2 + i * 0.1} y={24} variant="up" duration={0.6}>
              <TiltCard maxTilt={6} scale={1.01} glare={true}>
                <motion.div
                  className="card p-6 sm:p-8 group cursor-default"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    <span className="text-4xl sm:text-5xl font-bold text-accent/30 sm:min-w-[80px]">
                      {project.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary font-light leading-relaxed mb-4 text-[clamp(0.85rem,1.1vw,1rem)]">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-text-secondary font-mono">
                          {project.tech}
                        </span>
                        <LiveProjectButton />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        {/* GitHub repos */}
        <div className="mt-14">
          <FadeIn delay={0.5} y={12} variant="up" duration={0.6}>
            <GitHubStats />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
