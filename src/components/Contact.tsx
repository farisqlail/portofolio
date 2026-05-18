import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  // { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CERTIFICATIONS", href: "#certifications" },
];

const socialLinks = [
  { label: "GITHUB", href: "https://github.com/farisqlail" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/faris-rizqilail-630329194/" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/laildev/" },
  { label: "EMAIL", href: "mailto:farisqlail@gmail.com" },
];

const techStack = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "React Native", "Web3"];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-background">
      {/* 3-column main area */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start">

          {/* LEFT: Pages */}
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
              Pages
            </p>
            <nav className="flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-2xl font-black uppercase leading-snug tracking-tight text-foreground transition-colors hover:text-accent-glow"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.055 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="mailto:farisqlail@gmail.com"
                className="mt-4 text-2xl font-black uppercase tracking-tight text-accent-glow transition-colors hover:text-accent-light"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: navLinks.length * 0.055 }}
              >
                LAILDEV
              </motion.a>
            </nav>
          </div>

          {/* CENTER: Headline + Portrait */}
          <div className="flex flex-col items-center text-center">
            <motion.h2
              className="relative z-10 text-5xl font-black uppercase leading-[0.88] tracking-tighter sm:text-6xl md:text-7xl"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="block text-foreground">BRING</span>
              <span className="block text-accent-glow">COFFEE</span>
              <span className="block text-foreground">TO YOUR</span>
              <span className="block text-accent-glow">DESK.</span>
            </motion.h2>

            <motion.div
              className="relative z-0  w-56 overflow-hidden md:w-64"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Image
                src="/assets/images/faris-hero-hover.png"
                alt="Faris Rizqilail"
                width={256}
                height={384}
                className="h-auto w-full object-cover"
                priority={false}
              />
            </motion.div>
          </div>

          {/* RIGHT: Follow On */}
          <div className="md:text-right">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
              Follow On
            </p>
            <nav className="flex flex-col gap-0.5 md:items-end">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="text-2xl font-black uppercase leading-snug tracking-tight text-foreground transition-colors hover:text-accent-glow"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.055 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Tech stack logos band */}
      <div className="mt-14 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                className="text-xs font-bold uppercase tracking-[0.22em] text-muted/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-center gap-4 px-6 py-5 sm:flex-row md:px-10">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            &copy; {new Date().getFullYear()} Faris Rizqilail. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
