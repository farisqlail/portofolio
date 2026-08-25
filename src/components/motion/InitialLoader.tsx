import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InitialLoaderProps {
  onComplete?: () => void;
}

export default function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock body scroll during initial load
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
      document.body.style.overflow = "";
    }, 1800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black select-none pointer-events-auto"
        >
          {/* Subtle central glow */}
          <div className="absolute h-48 w-48 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

          {/* Minimalist Centered Editorial Name */}
          <div className="relative flex flex-col items-center space-y-3">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.2em", filter: "blur(6px)" }}
              animate={{ opacity: 1, letterSpacing: "0.38em", filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.38em] text-white pl-[0.38em]"
            >
              FARIS RIZQILAIL
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 pl-[0.25em]"
            >
              <span>Software Engineer</span>
              <span>·</span>
              <span>2026</span>
            </motion.div>

            {/* Minimal hairline progress indicator */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "36px", opacity: 0.4 }}
              transition={{ delay: 0.3, duration: 1.0, ease: "easeInOut" }}
              className="h-[1px] bg-white mt-4"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
