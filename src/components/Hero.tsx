import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const wrapperRef = useRef(null);
  const [sceneProgress, setSceneProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 22,
    stiffness: 90,
    mass: 0.5,
  });

  // Pass live scroll value into Scene3D via state
  useMotionValueEvent(smoothProgress, "change", (v) => {
    setSceneProgress(v);
  });

  const scale       = useTransform(smoothProgress, [0, 0.85], [1, 2.6]);
  const opacity     = useTransform(smoothProgress, [0.5, 0.85], [1, 0]);
  const blur        = useTransform(smoothProgress, [0.4, 0.85], [0, 14]);
  const vigOpacity  = useTransform(smoothProgress, [0.2, 0.85], [0, 1]);
  const indicatorOp = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  return (
    <div ref={wrapperRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* 3D Background — camera zoom handled inside Scene3D */}
        <div className="absolute inset-0 z-0">
          <Scene3D scrollProgress={sceneProgress} />
        </div>

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/40 to-background" />

        {/* Orbs */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <motion.div
            className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.1, 1, 1.1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 flex h-full items-center justify-center px-6"
          style={{
            scale,
            opacity,
            filter: useTransform(blur, (v) => `blur(${v}px)`),
            transformOrigin: "center center",
          }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent-light">
                Software Engineer
              </p>
            </motion.div>

            <motion.h1
              className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">Faris Rizqilail</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Software Engineer & Founder of{" "}
              <a
                href="https://www.instagram.com/laildev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-light transition-colors hover:text-accent-glow"
              >
                @LailDev
              </a>
              . I build robust, scalable software and craft elegant digital
              experiences turning ideas into products that make a real impact.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <motion.a
                href="#projects"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-medium text-white transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex h-12 items-center rounded-full border border-border px-8 text-sm font-medium text-foreground transition-all hover:border-accent hover:text-accent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              style={{ opacity: indicatorOp }}
            >
              <motion.div
                className="mx-auto flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={12} className="text-accent" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Vignette tunnel */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            opacity: vigOpacity,
            background: "radial-gradient(ellipse at center, transparent 20%, var(--background) 80%)",
          }}
        />
      </div>
    </div>
  );
}
