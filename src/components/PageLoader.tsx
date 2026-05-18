import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #1a4db5 0%, #0a1f6e 50%, #060e3a 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-80 w-80 rounded-full opacity-20 blur-[80px]"
          style={{ background: "#3b82f6" }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner + text */}
        <div className="relative flex h-36 w-36 items-center justify-center">
          {/* Outer arc — fast */}
          <div
            className="absolute inset-0 rounded-full border-[3px] animate-spin"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              borderTopColor: "#ffffff",
              animationDuration: "900ms",
            }}
          />
          {/* Inner arc — slow, reverse */}
          <div
            className="absolute inset-4 rounded-full border-[2px] animate-spin"
            style={{
              borderColor: "rgba(147,197,253,0.10)",
              borderBottomColor: "#93c5fd",
              animationDuration: "1400ms",
              animationDirection: "reverse",
            }}
          />

          {/* Center text */}
          <span
            className="relative text-lg font-black tracking-widest text-white"
            style={{ letterSpacing: "0.18em" }}
          >
            LailDev
          </span>
        </div>

        {/* Pulsing dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-white/60"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.22,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
