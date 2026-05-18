import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Code2, Briefcase, Lightbulb, Rocket } from "lucide-react";
import AnimatedSection, { itemVariants } from "./motion/AnimatedSection";
import SplitHeading from "./motion/SplitHeading";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 45%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.4,
  });
  const sectionY = useTransform(progress, [0, 1], [72, 0]);
  const sectionOpacity = useTransform(progress, [0, 0.45, 1], [0, 0.78, 1]);
  const visualY = useTransform(progress, [0, 1], [56, 0]);
  const contentY = useTransform(progress, [0, 1], [82, 0]);
  const glowOpacity = useTransform(progress, [0, 1], [0.12, 0.42]);
  const bgY = useTransform(progress, [0, 1], [-30, 30]);

  return (
    <AnimatedSection
      ref={sectionRef}
      id="about"
      className="relative -mt-20 overflow-hidden px-6 pb-24 pt-36"
      style={{ y: sectionY, opacity: sectionOpacity }}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#03060b] via-background/88 to-transparent"
        style={{ opacity: glowOpacity, y: bgY }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-glow/10 blur-[88px]"
        style={{ opacity: glowOpacity, y: bgY }}
      />
      <motion.div
        className="relative mx-auto max-w-6xl"
        variants={itemVariants}
      >
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left - Visual */}
          <motion.div
            className="relative"
            variants={itemVariants}
            style={{ y: visualY }}
          >
            <div className="relative aspect-square max-w-md overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-blue-500/20" />
              <div className="flex h-full items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  {[
                    { icon: Code2, label: "Clean Code" },
                    { icon: Rocket, label: "Performance" },
                    { icon: Lightbulb, label: "Innovation" },
                    { icon: Briefcase, label: "Professional" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface-light p-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05, borderColor: "var(--accent)" }}
                    >
                      <item.icon size={28} className="text-accent" />
                      <span className="text-xs text-muted">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-accent/20 -z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={itemVariants}
            style={{ y: contentY }}
          >
            <SplitHeading
              as="h2"
              text="About Me"
              className="text-sm font-medium uppercase tracking-widest text-accent-light"
            />
            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Crafting Digital Solutions<br />
              <span className="text-muted">with Purpose</span>
            </h3>
            <p className="mt-6 leading-relaxed text-muted">
              I&apos;m Faris Rizqilail, a Software Engineer and Founder of{" "}
              <a
                href="https://www.instagram.com/laildev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-light transition-colors hover:text-accent-glow"
              >
                @LailDev
              </a>
              . With 7+ years of experience building digital products across
              government, enterprise, and startup environments.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              From backend systems at Kominfo RI to leading product development
              at InterActive Technologies Corp and mobile development at
              KirimFresh.id. I specialize in creating impactful digital solutions
              that solve real problems.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <motion.div
                className="rounded-xl border border-border bg-surface p-4"
                whileHover={{ scale: 1.02, borderColor: "var(--accent)" }}
              >
                <p className="text-2xl font-bold gradient-text">7+</p>
                <p className="mt-1 text-sm text-muted">Years Experience</p>
              </motion.div>
              <motion.div
                className="rounded-xl border border-border bg-surface p-4"
                whileHover={{ scale: 1.02, borderColor: "var(--accent)" }}
              >
                <p className="text-2xl font-bold gradient-text">9+</p>
                <p className="mt-1 text-sm text-muted">Companies & Projects</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
