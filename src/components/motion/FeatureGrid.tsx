import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { itemVariants, staggerContainer } from "./AnimatedSection";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          className="rounded-2xl border border-border bg-surface p-5"
          variants={itemVariants}
          whileHover={{ y: -3, borderColor: "var(--accent)" }}
        >
          <item.icon size={22} className="text-accent" />
          <h4 className="mt-3 text-sm font-semibold text-foreground">
            {item.title}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {item.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
