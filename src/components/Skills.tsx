import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Users,
  Brain,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/*
  Folder shape: tab raised at top-left (80px wide, 20px tall),
  diagonal transition at 96px, then body starts.
  polygon: top-left tab → diagonal → full-width body → box close
*/
const FOLDER =
  "polygon(0 0, 80px 0, 96px 20px, 100% 20px, 100% 100%, 0 100%)";

interface SkillCat {
  title: string;
  label: string;
  icon: LucideIcon;
  skills: string[];
}

const skillCategories: SkillCat[] = [
  {
    title: "Frontend",
    label: "Development",
    icon: Layout,
    skills: [
      "React.js",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "PWAs",
      "Responsive Design",
    ],
  },
  {
    title: "Backend",
    label: "APIs",
    icon: Server,
    skills: [
      "PHP",
      "Laravel",
      "CodeIgniter",
      "REST APIs",
      "GraphQL",
      "JWT",
      "OAuth",
    ],
  },
  {
    title: "Database",
    label: "Storage",
    icon: Database,
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
  },
  {
    title: "Mobile",
    label: "Dev",
    icon: Code2,
    skills: ["React Native", "Flutter"],
  },
  {
    title: "Version Ctrl",
    label: "DevOps",
    icon: Wrench,
    skills: ["Git", "GitHub", "GitLab", "Docker"],
  },
  {
    title: "Soft Skills",
    label: "Management",
    icon: Users,
    skills: [
      "Communication",
      "Coaching",
      "Project Management",
      "Analytical Skills",
    ],
  },
  {
    title: "Architecture",
    label: "SDLC",
    icon: Brain,
    skills: ["OOP", "SDLC", "Web Applications", "Project Risk", "Software Dev"],
  },
];

function SkillCard({ cat, index }: { cat: SkillCat; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/*
        Outer: clip-path=FOLDER + animates background = border color.
        Inner: margin 1.5px reveals 1.5px gap = full border along all
        edges including tab diagonal.
      */}
      <motion.div
        style={{ clipPath: FOLDER }}
        animate={{
          background: hovered ? "var(--accent-glow)" : "var(--border)",
        }}
        transition={{ duration: 0.18 }}
      >
        {/* Inner card — pt-8 pushes content below the 20px tab clip area */}
        <div
          className="relative flex flex-col bg-surface px-5 pb-5 pt-8"
          style={{ margin: "1.5px" }}
        >
          {/* Category label sits in the tab area (absolute, above clip boundary) */}
          <span className="absolute left-3 top-1.5 text-[9px] font-bold uppercase tracking-widest text-accent-glow opacity-80">
            {cat.label}
          </span>

          {/* Icon + title */}
          <div className="mb-4 flex items-center gap-3">
            <motion.div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-light"
              animate={{
                borderColor: hovered ? "var(--accent-glow)" : "var(--border)",
              }}
              transition={{ duration: 0.18 }}
            >
              <cat.icon
                size={18}
                className="text-accent-glow"
                strokeWidth={1.5}
              />
            </motion.div>
            <p className="text-sm font-bold text-foreground">{cat.title}</p>
          </div>

          {/* All skills — always visible, card height = content height = masonry */}
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map((skill) => (
              <motion.span
                key={skill}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium text-muted transition-colors"
                animate={{
                  borderColor: hovered ? "var(--accent-glow)" : "var(--border)",
                  color: hovered ? "var(--foreground)" : "var(--muted)",
                }}
                transition={{ duration: 0.15 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-light">
            Skills &amp; Technologies
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            My Tech Stack
          </h2>
        </div>

        {/* Pinterest masonry via CSS columns — each card height = content → auto masonry */}
        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [column-gap:12px]">
          {skillCategories.map((cat, i) => (
            <div key={cat.title} className="mb-3 break-inside-avoid">
              <SkillCard cat={cat} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
