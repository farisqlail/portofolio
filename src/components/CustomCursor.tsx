import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const ringX = useSpring(cursorX, { damping: 28, stiffness: 220, mass: 0.4 });
  const ringY = useSpring(cursorY, { damping: 28, stiffness: 220, mass: 0.4 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const attachHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    attachHoverListeners();

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Inner dot — snaps to cursor exactly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.4 : isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      >
        <div
          className="h-[5px] w-[5px] rounded-full"
          style={{ background: "var(--accent-glow)" }}
        />
      </motion.div>

      {/* Outer ring — trails with spring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 44 : isClicking ? 20 : 30,
          height: isHovering ? 44 : isClicking ? 20 : 30,
        }}
        transition={{
          width: { type: "spring", damping: 22, stiffness: 280 },
          height: { type: "spring", damping: 22, stiffness: 280 },
          opacity: { duration: 0.2 },
        }}
      >
        <motion.div
          className="h-full w-full rounded-full"
          animate={{
            borderWidth: isHovering ? 1.5 : 1,
            borderColor: isHovering
              ? "rgba(59,130,246,0.7)"   /* accent-glow */
              : "rgba(45,90,142,0.5)",    /* accent-light */
            backgroundColor: isHovering
              ? "rgba(30,58,95,0.12)"     /* accent tint */
              : "transparent",
          }}
          transition={{ duration: 0.2 }}
          style={{ borderStyle: "solid" }}
        />
      </motion.div>

      {/* Ambient glow — very subtle, only on hover */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovering ? 0.18 : 0,
          scale: isHovering ? 1 : 0.6,
        }}
        transition={{ type: "spring", damping: 18, stiffness: 160 }}
      >
        <div
          className="h-12 w-12 rounded-full blur-xl"
          style={{ background: "var(--accent-glow)" }}
        />
      </motion.div>
    </>
  );
}
