import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div
      key="global-pageloader"
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black select-none pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Subtle ambient light */}
      <div className="absolute h-64 w-64 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

      {/* Tao Tajima-Style Minimalist Centered Typography */}
      <div className="relative flex flex-col items-center space-y-3">
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.22em", filter: "blur(6px)" }}
          animate={{ opacity: 1, letterSpacing: "0.38em", filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.38em] text-white pl-[0.38em]"
        >
          FARIS RIZQILAIL
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 pl-[0.25em]"
        >
          <span>Software Engineer</span>
          <span>·</span>
          <span>2026</span>
        </motion.div>

        {/* Minimal hairline progress indicator */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "36px", opacity: 0.35 }}
          transition={{ delay: 0.3, duration: 1.0, ease: "easeInOut" }}
          className="h-[1px] bg-white mt-4"
        />
      </div>
    </motion.div>
  );
}
