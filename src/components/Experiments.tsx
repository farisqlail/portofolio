import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Terminal, Brain, Boxes, ArrowUpRight } from "lucide-react";

const experiments = [
  {
    title: "Generative Art Engine",
    description:
      "A creative coding experiment using WebGL and GLSL shaders to generate procedural art in real-time.",
    category: "Creative Coding",
    icon: Sparkles,
  },
  {
    title: "CLI Task Runner",
    description:
      "A Rust-based CLI tool for automating repetitive development tasks with parallel execution support.",
    category: "Developer Tools",
    icon: Terminal,
  },
  {
    title: "Neural Style Transfer",
    description:
      "Experimenting with deep learning models to apply artistic styles to photographs in the browser.",
    category: "Machine Learning",
    icon: Brain,
  },
  {
    title: "Micro-Frontend Architecture",
    description:
      "Exploring module federation and micro-frontend patterns for building scalable enterprise applications.",
    category: "Architecture",
    icon: Boxes,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Experiments() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experiments" className="px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-medium uppercase tracking-widest text-accent-light">
            Lab
          </h2>
          <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Experiments
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Side projects and explorations where I push boundaries and learn new
            things.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {experiments.map((exp) => (
            <motion.div
              key={exp.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all"
              variants={itemVariants}
              whileHover={{
                y: -6,
                boxShadow: "0 25px 50px rgba(30, 58, 95, 0.15)",
                borderColor: "var(--accent)",
              }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <motion.span
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light"
                    whileHover={{ scale: 1.05 }}
                  >
                    {exp.category}
                  </motion.span>
                  <motion.div
                    className="text-muted transition-colors group-hover:text-accent"
                    whileHover={{ rotate: 15 }}
                  >
                    <exp.icon size={24} />
                  </motion.div>
                </div>

                <h4 className="text-lg font-semibold">{exp.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {exp.description}
                </p>

                <motion.div
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="opacity-0 transition-opacity group-hover:opacity-100">
                    Explore
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
