import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Send } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./icons";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-border bg-surface p-12 text-center md:p-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Contact
            </motion.h2>
            <motion.h3
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Let&apos;s Work Together
            </motion.h3>
            <motion.p
              className="mx-auto mt-4 max-w-lg text-muted"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Have a project in mind or just want to chat? Feel free to reach out.
              I&apos;m always open to discussing new opportunities and ideas.
            </motion.p>

            <motion.a
              href="mailto:farisqlail@gmail.com"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-medium text-white transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={16} />
              Say Hello
            </motion.a>

            <motion.div
              className="mt-10 flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-accent"
                  aria-label={link.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
