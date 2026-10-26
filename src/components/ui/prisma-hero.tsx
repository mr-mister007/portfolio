import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";

/* ---------------- WordsPullUp ---------------- */
export interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="inline-block relative -top-[0.35em] ml-1 text-[0.42em] select-none leading-none font-mono text-[var(--accent)]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
export interface Segment {
  text: string;
  className?: string;
}

export interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
export interface NavItem {
  label: string;
  href: string;
}

const defaultNavItems: (string | NavItem)[] = [
  { label: "01 // Work", href: "#work" },
  { label: "02 // Services", href: "#services" },
  { label: "03 // Manifesto", href: "#about" },
  { label: "04 // Dispatch", href: "#contact" },
];

export interface PrismaHeroProps {
  word?: string;
  subtitle?: string;
  videoSrc?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  navItems?: (string | NavItem)[];
  topBadge?: React.ReactNode;
  footnote?: string;
  className?: string;
}

const PrismaHero = ({
  word = "Systems",
  subtitle = "Backend architectures, applied AI engineering, and production cloud deployments — from first prototype to mission-critical scale.",
  videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
  ctaText = "Tell me what you're building",
  ctaHref = "#contact",
  secondaryCtaText = "See selected work",
  secondaryCtaHref = "#work",
  navItems = defaultNavItems,
  topBadge,
  footnote = "* High-concurrency backends, LLM agents, and distributed infra.",
  className = "",
}: PrismaHeroProps) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className={`relative h-[92vh] sm:h-screen min-h-[620px] max-h-[1080px] w-full pt-16 sm:pt-20 pb-2 sm:pb-4 ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl bg-black">

        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          src={videoSrc}
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.6] mix-blend-overlay" />

        {/* Cinematic gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/85" />

        {/* Top Navbar Notch */}
        {navItems && navItems.length > 0 && (
          <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
            <div className="flex items-center gap-3 sm:gap-6 md:gap-10 rounded-b-2xl md:rounded-b-3xl bg-black/90 backdrop-blur-md border-b border-x border-white/10 px-4 py-2 sm:px-7 md:px-9 shadow-lg">
              {navItems.map((item, idx) => {
                const label = typeof item === "string" ? item : item.label;
                const href = typeof item === "string" ? "#" : item.href;
                return (
                  <a
                    key={idx}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="text-[10px] sm:text-xs md:text-sm font-mono tracking-wider transition-colors no-underline"
                    style={{ color: "rgba(225, 224, 204, 0.75)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.75)")}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </nav>
        )}

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 sm:pb-6 md:px-10 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-5 md:gap-6 lg:gap-8 xl:gap-12">

            {/* Monumental Left Title */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-8">
              <h1
                className="font-medium leading-[0.84] tracking-[-0.06em] text-[clamp(2.75rem,14vw,4.5rem)] sm:text-[clamp(3.75rem,13vw,6.5rem)] md:text-[clamp(4.5rem,12vw,7.5rem)] lg:text-[clamp(4.25rem,9vw,7.5rem)] xl:text-[clamp(5.25rem,10.2vw,9.5rem)] 2xl:text-[clamp(6rem,11vw,11rem)] select-none break-normal"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text={word} showAsterisk />
              </h1>
            </div>

            {/* Right Column: Subtitle, CTAs & Footnote */}
            <div className="col-span-12 flex flex-col gap-3.5 sm:gap-4 md:gap-5 pb-1 sm:pb-2 lg:col-span-5 xl:col-span-4 lg:pb-4">

              {topBadge && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/80 flex items-center gap-2"
                >
                  {topBadge}
                </motion.div>
              )}

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs text-white/85 sm:text-sm md:text-base font-sans max-w-xl lg:max-w-none"
                style={{ lineHeight: 1.4 }}
              >
                {subtitle}
              </motion.p>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                <motion.a
                  href={ctaHref}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-[#E1E0CC] py-1 pl-5 pr-1 text-xs sm:text-sm font-semibold text-black transition-all hover:gap-3 hover:bg-white no-underline shadow-lg cursor-pointer"
                >
                  {ctaText}
                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                  </span>
                </motion.a>

                {secondaryCtaText && secondaryCtaHref && (
                  <motion.a
                    href={secondaryCtaHref}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-xs sm:text-sm font-mono text-[#E1E0CC] hover:bg-white/10 transition-colors no-underline cursor-pointer"
                  >
                    {secondaryCtaText}
                  </motion.a>
                )}
              </div>

              {footnote && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.85 }}
                  className="text-[11px] font-mono text-white/60 tracking-tight pt-1"
                >
                  {footnote}
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
export default PrismaHero;
