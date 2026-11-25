import React from 'react';
import { PrismaHero } from '@/components/ui/prisma-hero';

export const HeroSection: React.FC = () => {
  return (
    <PrismaHero
      videoSrc="/hero-video.mp4"
      word="Systems"
      subtitle="Software Engineer & DevOps building cloud infrastructure across AWS, Azure & GCP, 100+ CI/CD pipelines, and production AI applications."
      ctaText="Tell me what you're building"
      ctaHref="#contact"
      secondaryCtaText="See selected work"
      secondaryCtaHref="#work"
      topBadge={
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
          <span className="font-semibold text-white">Aravind MV</span>
          <span className="text-white/40">·</span>
          <span>Software Engineer &amp; DevOps</span>
          <span className="text-white/40 hidden sm:inline">·</span>
          <span className="text-white/60 hidden sm:inline font-mono">Kochi, Kerala</span>
        </div>
      }
      footnote="* Azure AKS & AWS · 100+ CI/CD Pipelines · Applied AI"
      navItems={[
        { label: "01 // WORK", href: "#work" },
        { label: "02 // SERVICES", href: "#services" },
        { label: "03 // MANIFESTO", href: "#about" },
        { label: "04 // DISPATCH", href: "#contact" },
      ]}
    />
  );
};

export default HeroSection;
