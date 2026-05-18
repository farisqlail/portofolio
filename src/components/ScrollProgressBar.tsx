import { motion, useScroll } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-[#3b82f6]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
