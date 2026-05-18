import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Mail, Send } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./icons";
import AnimatedSection, { itemVariants, staggerContainer } from "./motion/AnimatedSection";
import SplitHeading from "./motion/SplitHeading";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const socialLinks: { label: string; href: string; icon: IconComponent }[] = [
  {
    label: "GitHub",
    href: "https://github.com/farisqlail",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/faris-rizqilail-630329194/",
    icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/laildev/",
    icon: InstagramIcon,
  },
  {
    label: "Email",
    href: "mailto:farisqlail@gmail.com",
    icon: Mail as unknown as IconComponent,
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.4,
  });
  const bgY = useTransform(progress, [0, 1], [-30, 30]);

  return (
    <AnimatedSection id="contact" className="relative overflow-hidden px-6 py-24" ref={ref}>
      <motion.div
        className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/10 blur-[90px]"
        style={{ y: bgY }}
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-border bg-surface p-12 text-center md:p-20"
          variants={staggerContainer}
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          <div className="relative">
            <motion.h2
              className="text-sm font-medium uppercase tracking-widest text-accent-light"
              variants={itemVariants}
            >
              Contact
            </motion.h2>
            <SplitHeading
              as="h3"
              text="Let's Work Together"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            />
            <motion.p
              className="mx-auto mt-4 max-w-lg text-muted"
              variants={itemVariants}
            >
              Have a project in mind or just want to chat? Feel free to reach out.
              I&apos;m always open to discussing new opportunities and ideas.
            </motion.p>

            <motion.a
              href="mailto:farisqlail@gmail.com"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-medium text-white transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={16} />
              Say Hello
            </motion.a>

            <motion.div
              className="mt-10 flex items-center justify-center gap-4"
              variants={staggerContainer}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-accent"
                  aria-label={link.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  variants={itemVariants}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
