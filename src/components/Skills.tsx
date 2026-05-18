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
import AnimatedSection, { itemVariants, staggerContainer } from "./motion/AnimatedSection";
import SplitHeading from "./motion/SplitHeading";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Layout,
    skills: [
      "React.js",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "Responsive Web Design",
      "Front-End Development",
      "Front-end Engineering",
      "Progressive Web Applications (PWAs)",
    ],
  },
  {
    title: "Backend & APIs",
    icon: Server,
    skills: [
      "PHP",
      "Laravel",
      "CodeIgniter",
      "REST APIs",
      "REST",
      "GraphQL",
      "OAuth",
      "JSON Web Token (JWT)",
    ],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
  },
  {
    title: "Mobile Development",
    icon: Code2,
    skills: ["React Native"],
  },
  {
    title: "Version Control",
    icon: Wrench,
    skills: ["Git", "GitHub", "GitLab"],
  },
  {
    title: "Soft Skills & Management",
    icon: Users,
    skills: [
      "Communication",
      "Coaching",
      "Project Management",
      "Analytical Skills",
    ],
  },
  {
    title: "Software Development",
    icon: Brain,
    skills: [
      "Software Development",
      "Object-Oriented Programming (OOP)",
      "Software Development Life Cycle (SDLC)",
      "Web Applications",
      "Project Risk",
    ],
  },
];

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <SplitHeading
            as="h2"
            text="Skills & Technologies"
            className="text-sm font-medium uppercase tracking-widest text-accent-light"
          />
          <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            My Tech Stack
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="group rounded-2xl border border-border bg-surface p-6 transition-all"
              variants={itemVariants}
              whileHover={{
                y: -4,
                boxShadow: "0 20px 40px rgba(30, 58, 95, 0.12)",
                borderColor: "var(--accent)",
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <category.icon size={20} className="text-accent" />
                </div>
                <h4 className="text-lg font-semibold">{category.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="rounded-full border border-border bg-surface-light px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                    variants={itemVariants}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
