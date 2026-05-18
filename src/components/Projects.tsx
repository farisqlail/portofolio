import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import { itemVariants, staggerContainer } from "./motion/AnimatedSection";
import SplitHeading from "./motion/SplitHeading";

const projects = [
  {
    title: "ExpoRease",
    description:
      "A modern web application for seamless exploration and management. Built with performance and user experience in mind.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://exporease-web.vercel.app/",
  },
  {
    title: "EARS Template",
    description:
      "A professional template system designed for rapid development and consistent UI/UX across web applications.",
    tags: ["Next.js", "React", "Template System", "UI/UX"],
    link: "https://ears-template.vercel.app/",
  },
  {
    title: "Photobooth",
    description:
      "Interactive photobooth web application with camera integration, filters, and instant photo capture capabilities.",
    tags: ["React", "WebRTC", "Canvas API", "PWA"],
    link: "https://photobooth-laildev.vercel.app/",
  },
  {
    title: "Lail Builder",
    description:
      "A visual website builder tool that allows users to create stunning web pages with drag-and-drop functionality.",
    tags: ["Next.js", "React", "Builder Tool", "Visual Editor"],
    link: "https://lail-builder.vercel.app/",
  },
  {
    title: "Cariir",
    description:
      "Job search and career platform connecting job seekers with opportunities. Features job listings and application tracking.",
    tags: ["React", "Job Platform", "REST API", "Responsive Design"],
    link: "https://cariir.vercel.app/",
  },
  {
    title: "Review Code AI",
    description:
      "AI-powered code review tool that analyzes code quality, suggests improvements, and helps developers write better code.",
    tags: ["Next.js", "AI Integration", "Code Analysis", "Developer Tools"],
    link: "https://review-code-ai.vercel.app/",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.div
      className="group rounded-2xl border border-border bg-surface p-6 transition-all"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{
        y: -6,
        boxShadow: "0 25px 50px rgba(30, 58, 95, 0.15)",
        borderColor: "var(--accent)",
      }}
      style={{ clipPath: "inset(0 0% 0 0)" }}
    >
      <div className="mb-5 aspect-video overflow-hidden rounded-xl bg-surface-light">
        <motion.div
          className="flex h-full items-center justify-center bg-gradient-to-br from-accent/5 to-blue-500/5"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Globe
            size={40}
            className="text-muted/30 transition-colors group-hover:text-accent"
          />
        </motion.div>
      </div>

      <h4 className="text-xl font-semibold">{project.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-light"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
          whileHover={{ x: 3 }}
        >
          <ExternalLink size={14} />
          Visit Website
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-58%"]);

  return (
    <section id="projects" className="px-6 py-24 md:h-[280vh] md:py-0" ref={ref}>
      <div className="mx-auto max-w-6xl md:sticky md:top-0 md:flex md:h-screen md:max-w-none md:flex-col md:justify-center md:overflow-hidden">
        <motion.div
          className="mx-auto max-w-6xl text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent-light">
            Portfolio
          </h2>
          <SplitHeading
            as="h3"
            text="Featured Projects"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          />
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            A selection of live projects I&apos;ve built and deployed.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 md:hidden"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 hidden gap-6 pl-[max(2rem,calc((100vw-72rem)/2))] md:flex"
          style={{ x }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="w-[34rem] shrink-0"
              initial={{ opacity: 0, y: 40, clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
