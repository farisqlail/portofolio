import { motion } from "framer-motion";
import { Code2, Briefcase, Lightbulb, Rocket } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left - Visual */}
          <motion.div
            className="relative"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
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
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          >
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent-light">
              About Me
            </h2>
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
    </section>
  );
}
