import { forwardRef, ReactNode } from "react";
import { motion, MotionStyle } from "framer-motion";

export const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

type AnimatedSectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
  style?: MotionStyle;
};

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ id, className = "", children, style }, ref) => (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={style}
    >
      {children}
    </motion.section>
  ),
);

AnimatedSection.displayName = "AnimatedSection";

export default AnimatedSection;
