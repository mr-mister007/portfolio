import { FadeIn } from './FadeIn';
import TiltCard from './TiltCard';
import SectionLabel from './SectionLabel';
import SectionCounter from './SectionCounter';
import DashboardCard from './DashboardCard';

const services = [
  {
    title: 'Cloud Infrastructure',
    description: 'Scalable, cost-effective architectures on AWS, GCP, and Azure. VPC design, hybrid networking, and multi-cloud strategies.',
  },
  {
    title: 'Kubernetes & Containers',
    description: 'Production-grade Kubernetes clusters, Docker containerisation, service mesh, Helm charts, and GitOps workflows.',
  },
  {
    title: 'CI/CD & Automation',
    description: 'End-to-end pipeline automation with GitHub Actions, GitLab CI, and Jenkins. Automated testing, security scans, and deployment gates.',
  },
  {
    title: 'Infrastructure as Code',
    description: 'Declarative infrastructure with Terraform, Pulumi, and AWS CDK. Version-controlled, repeatable, auditable deployments.',
  },
  {
    title: 'Observability & SRE',
    description: 'Monitoring, logging, and alerting with Prometheus, Grafana, ELK, and Datadog. Incident response and reliability engineering.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative min-h-screen px-6 md:px-12 py-24">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Expertise</SectionLabel>

        <FadeIn delay={0.1} y={16} variant="up" duration={0.6}>
          <h2 className="section-heading text-[clamp(2.5rem,8vw,5rem)] text-text-primary mb-1">
            What I Do
          </h2>
        </FadeIn>

        <div className="mb-14">
          <SectionCounter index={4} total={5} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={0.15 + i * 0.06} y={20} variant="up" duration={0.5}>
              <TiltCard maxTilt={5} scale={1.01} glare={true}>
                <div className="card-subtle p-6 sm:p-8 h-full group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        {/* Dashboard monitor */}
        <div className="mt-14 max-w-md">
          <FadeIn delay={0.4} y={12} variant="up" duration={0.6}>
            <DashboardCard />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
