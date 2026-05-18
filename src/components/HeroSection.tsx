import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Briefcase, Menu } from "lucide-react";

const floatingLabels = [
  { text: "CODE", className: "left-[7%] top-[31%]" },
  { text: "PRODUCT", className: "right-[8%] top-[38%]" },
  { text: "IMPACT", className: "right-[15%] bottom-[24%]" },
];

const codeSnippets = [
  { text: "const vision = ship()", className: "left-[8%] top-[19%]" },
  { text: "product.fit === true", className: "right-[5%] top-[21%]" },
  { text: "latency < 80ms", className: "left-[5%] bottom-[20%]" },
  { text: "deploy --precise", className: "right-[9%] bottom-[15%]" },
];

function FloatingLabel({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <motion.span
      className={`pointer-events-none absolute z-30 hidden rounded-full border border-[#2F80FF]/20 bg-[#05070c]/45 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-tight text-white/65 backdrop-blur-md md:block ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      &gt; {text}
    </motion.span>
  );
}

function CodeSnippet({ text, className }: { text: string; className: string }) {
  return (
    <motion.span
      className={`pointer-events-none absolute z-30 hidden rounded-md bg-white/[0.035] px-2.5 py-1 text-[0.58rem] font-semibold tracking-tight text-[#9fc6ff]/70 backdrop-blur-md lg:block ${className}`}
      animate={{ y: [0, -8, 0], opacity: [0.42, 0.76, 0.42] }}
      transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.span>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const portraitContainerRef = useRef<HTMLDivElement>(null);

  const [isOver, setIsOver] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const hoverLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const setSpotlight = useCallback((x: number, y: number) => {
    if (!hoverLayerRef.current) return;
    const mask = `radial-gradient(circle 380px at ${x}px ${y}px, black 0%, black 40%, transparent 78%)`;
    hoverLayerRef.current.style.maskImage = mask;
    hoverLayerRef.current.style.webkitMaskImage = mask;
  }, []);

  const handleImageMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !portraitContainerRef.current) return;
      const rect = portraitContainerRef.current.getBoundingClientRect();
      setSpotlight(e.clientX - rect.left, e.clientY - rect.top);
      setIsOver(true);
    },
    [isTouchDevice, setSpotlight],
  );

  const handleImageMouseLeave = useCallback(() => {
    setIsOver(false);
  }, []);

  const handleImageMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!portraitContainerRef.current || isTouchDevice) return;
      const rect = portraitContainerRef.current.getBoundingClientRect();
      setSpotlight(e.clientX - rect.left, e.clientY - rect.top);
    },
    [isTouchDevice, setSpotlight],
  );

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const portraitRotateX = useMotionValue(0);
  const portraitRotateY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });

  const portraitScale = useTransform(progress, [0, 0.45, 1], [1, 1.05, 1.13]);
  const portraitY = useTransform(progress, [0, 1], [0, -64]);
  const portraitOpacity = useTransform(progress, [0, 0.86, 1], [1, 1, 0.55]);
  const portraitFilter = useTransform(
    progress,
    [0, 0.35, 0.72, 1],
    [
      "contrast(0.94) saturate(0.92) brightness(0.88)",
      "contrast(1.06) saturate(1.04) brightness(1)",
      "contrast(1.12) saturate(1.08) brightness(1.04)",
      "contrast(1.02) saturate(0.98) brightness(0.9)",
    ],
  );

  const titleLeftX = useTransform(progress, [0, 1], [0, -165]);
  const titleRightX = useTransform(progress, [0, 1], [0, 145]);
  const titleScale = useTransform(progress, [0, 1], [1, 1.1]);
  const titleOpacity = useTransform(progress, [0, 0.72, 1], [0.12, 0.2, 0.035]);
  const titleBlur = useTransform(
    progress,
    [0, 0.58, 1],
    ["blur(0px)", "blur(1px)", "blur(6px)"],
  );

  const glowScale = useTransform(progress, [0, 0.55, 1], [0.92, 1.12, 1.25]);
  const glowOpacity = useTransform(progress, [0, 0.55, 1], [0.36, 0.72, 0.28]);
  const contourX = useTransform(progress, [0, 1], [0, -48]);
  const contourY = useTransform(progress, [0, 1], [0, 28]);
  const hudOpacity = useTransform(
    progress,
    [0, 0.18, 0.72, 1],
    [0.28, 0.92, 0.55, 0],
  );
  const metaY = useTransform(progress, [0, 0.65, 1], [0, -34, -96]);
  const metaOpacity = useTransform(progress, [0, 0.72, 1], [1, 0.82, 0]);
  const foregroundMask = useTransform(
    progress,
    [0, 0.45, 1],
    [
      "linear-gradient(180deg, black 0%, black 88%, transparent 100%)",
      "linear-gradient(180deg, black 0%, black 74%, transparent 100%)",
      "linear-gradient(180deg, black 0%, black 56%, transparent 100%)",
    ],
  );

  useEffect(() => {
    const tick = () => {
      const current = pointerCurrentRef.current;
      const target = pointerTargetRef.current;
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      pointerX.set(current.x * 18);
      pointerY.set(current.y * 12);
      portraitRotateX.set(current.y * -3.2);
      portraitRotateY.set(current.x * 3.8);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [pointerX, pointerY, portraitRotateX, portraitRotateY]);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerTargetRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }

  function handleMouseLeave() {
    pointerTargetRef.current = { x: 0, y: 0 };
  }

  return (
    <section ref={heroRef} className="relative h-[150vh] bg-[#03060b] sm:h-[185vh]">
      <div
        className="hero-scroll-stage sticky top-0 isolate h-screen overflow-hidden text-white"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="scroll-hero-contours pointer-events-none absolute inset-0 -z-30 opacity-80"
          style={{ x: contourX, y: contourY }}
        />
        <motion.div
          className="scroll-hero-grid pointer-events-none absolute inset-0 -z-20"
          style={{ opacity: hudOpacity }}
        />
        <div className="scroll-hero-grain pointer-events-none absolute inset-0 z-50" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_44%,rgba(47,128,255,0.22),transparent_34%),radial-gradient(circle_at_12%_18%,rgba(47,128,255,0.13),transparent_22%),linear-gradient(135deg,#03060b_0%,#05070c_52%,#020308_100%)]" />

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F80FF]/24 blur-[118px]"
          style={{ scale: glowScale, opacity: glowOpacity }}
        />

        <motion.header
          className="absolute inset-x-0 top-0 z-40 flex items-start justify-between px-5 py-5 sm:px-8 lg:px-10"
          style={{ y: metaY, opacity: metaOpacity }}
        >
          <a href="#" className="group leading-none" aria-label="Go to home">
            <span className="gradient-text block text-[2.2rem] font-bold leading-[0.9] tracking-tight sm:text-[3rem]">
              Faris
            </span>
            <span className="gradient-text block text-[2.2rem] font-bold leading-[0.9] tracking-tight sm:text-[3rem]">
              Rizqilail
            </span>
          </a>

          {/* <motion.div className="absolute left-1/2 top-7 hidden -translate-x-1/2 text-5xl font-bold tracking-tight text-white/90 sm:block">
            L7
          </motion.div> */}

          <div className="flex items-center gap-3">
            <motion.a
              href="#projects"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2F80FF] px-4 text-sm font-bold tracking-tight text-white shadow-[0_16px_42px_rgba(47,128,255,0.28)] transition hover:bg-[#1f6fe8] sm:h-18 sm:gap-3 sm:px-7 sm:text-2xl"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Briefcase className="h-4 w-4 sm:h-7 sm:w-7" />
              <span className="hidden sm:inline">Projects</span>
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-[3px] border-white/70 bg-white/4.5 text-white backdrop-blur-sm transition hover:border-[#2F80FF] hover:bg-[#2F80FF]/15 sm:h-18 sm:w-18"
              aria-label="Contact Faris"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Menu className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={3} />
            </motion.a>
          </div>
        </motion.header>

        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <motion.div
            className="font-serif absolute top-[18%] flex w-[130vw] justify-center overflow-hidden text-[clamp(4.5rem,15vw,15rem)] font-bold uppercase leading-[0.82] tracking-tight text-white"
            style={{
              x: titleLeftX,
              scale: titleScale,
              opacity: titleOpacity,
              filter: titleBlur,
            }}
          >
            FARIS
          </motion.div>
          <motion.div
            className="font-serif absolute top-[34%] flex w-[150vw] justify-center overflow-hidden text-[clamp(4.5rem,15vw,15rem)] font-bold uppercase leading-[0.82] tracking-tight text-white"
            style={{
              x: titleRightX,
              scale: titleScale,
              opacity: titleOpacity,
              filter: titleBlur,
            }}
          >
            RIZQILAIL
          </motion.div>
        </div>

        {floatingLabels.map((label) => (
          <FloatingLabel key={label.text} {...label} />
        ))}
        {codeSnippets.map((snippet) => (
          <CodeSnippet key={snippet.text} {...snippet} />
        ))}

        <motion.div
          className="absolute bottom-8 left-5 z-30 hidden w-[9.4rem] rounded-md bg-[#05070c]/62 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.24)] backdrop-blur-sm lg:block"
          style={{ y: metaY, opacity: metaOpacity }}
        >
          <div className="absolute -top-3 left-0 bg-[#2F80FF] px-1 text-[0.62rem] font-bold uppercase leading-none tracking-tight text-white">
            Profile
          </div>
          <p className="border-b border-white/25 pb-2 text-center text-[0.68rem] font-bold uppercase leading-tight tracking-tight text-white/80">
            Software
            <br />
            Engineer
          </p>
          <p className="mt-4 text-center text-[0.58rem] font-bold uppercase leading-tight tracking-tight text-white/60">
            Founder
            <br />
            of LailDev
          </p>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-[8%] right-5 z-30 hidden max-w-[18rem] text-right lg:block"
          style={{ y: metaY, opacity: metaOpacity }}
        >
          <p className="text-[0.72rem] font-bold uppercase tracking-tight text-[#2F80FF]/90">
            Code / Product / Impact
          </p>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/56">
            Building digital products with precision.
          </p>
        </motion.div>

        {/* <motion.div
          className="pointer-events-none absolute left-1/2 top-[19%] z-30 -translate-x-1/2 text-5xl font-bold tracking-tight text-white/80"
          style={{ x: signatureX, opacity: signatureOpacity }}
        >
          L7
        </motion.div> */}

        <motion.div
          className="absolute inset-x-0 bottom-0 z-20 mx-auto flex h-[82vh] max-w-[76rem] justify-center px-5 [perspective:1200px]"
          style={{ WebkitMaskImage: foregroundMask, maskImage: foregroundMask }}
        >
          <motion.div
            ref={portraitContainerRef}
            className="scroll-portrait relative aspect-square w-[min(88vw,44rem)] self-end overflow-hidden sm:w-[min(72vw,49rem)] lg:w-[min(48vw,56rem)]"
            style={{
              x: pointerX,
              y: portraitY,
              scale: portraitScale,
              opacity: portraitOpacity,
              rotateX: portraitRotateX,
              rotateY: portraitRotateY,
              filter: portraitFilter,
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            onMouseMove={handleImageMouseMove}
          >
            <Image
              src="/assets/images/faris-hero-2.png"
              alt="Faris Rizqilail portrait"
              fill
              priority
              sizes="(max-width: 768px) 88vw, 52vw"
              className="scroll-portrait__image object-cover object-center"
            />
            {!isTouchDevice && (
              <div
                ref={hoverLayerRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 10,
                  opacity: isOver ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  maskImage:
                    "radial-gradient(circle 380px at 50% 50%, black 0%, black 40%, transparent 78%)",
                }}
              >
                <Image
                  src="/assets/images/faris-hero-hover.png"
                  alt="Faris Rizqilail portrait hover"
                  fill
                  sizes="(max-width: 770px) 88vw, 52vw"
                  className="object-cover"
                  style={{ marginTop: 40, paddingRight: 20 }}
                />
              </div>
            )}
            <div className="scroll-portrait__scanlines" />
            <div className="scroll-portrait__scanner" />
            <div className="scroll-portrait__sweep" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(3,6,11,0.28)_100%)]" />
          </motion.div>
        </motion.div>

        {/* Mobile role badge — replaces the lg:block side panels */}
        <motion.div
          className="absolute bottom-20 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#2F80FF]/20 bg-[#05070c]/60 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-tight text-white/60 backdrop-blur-md sm:hidden"
          style={{ opacity: metaOpacity }}
        >
          <span className="text-[#2F80FF]/80">Software Engineer</span>
          <span className="text-white/30">·</span>
          <span>Founder of LailDev</span>
        </motion.div>

        <motion.div
          className="absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#05070c]/72 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-tight text-white/68 backdrop-blur-sm"
          style={{ opacity: metaOpacity }}
        >
          <span>Scroll to enter</span>
          <ArrowRight className="h-3.5 w-3.5 rotate-90" />
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-40 bg-gradient-to-b from-transparent via-[#03060b]/58 to-[#03060b]" />
      </div>
    </section>
  );
}
