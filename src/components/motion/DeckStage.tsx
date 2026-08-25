import { useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeckHUD from "@/components/DeckHUD";
import AmbientGridBeams from "@/components/motion/AmbientGridBeams";

export interface DeckCardItem {
  id: string;
  tag: string;
  title: string;
  label: string;
  num: string;
  component: ReactNode;
}

interface DeckStageProps {
  cards: DeckCardItem[];
  activeIndex: number;
  onCardChange: (index: number) => void;
}

export default function DeckStage({
  cards,
  activeIndex,
  onCardChange,
}: DeckStageProps) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const isTransitioningRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const total = cards.length;

  const goToCard = useCallback(
    (index: number) => {
      if (index === activeIndex || index < 0 || index >= total) return;
      setDirection(index > activeIndex ? 1 : -1);
      onCardChange(index);
    },
    [activeIndex, total, onCardChange]
  );

  const nextCard = useCallback(() => {
    if (activeIndex < total - 1 && !isTransitioningRef.current) {
      isTransitioningRef.current = true;
      setDirection(1);
      onCardChange(activeIndex + 1);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 500);
    }
  }, [activeIndex, total, onCardChange]);

  const prevCard = useCallback(() => {
    if (activeIndex > 0 && !isTransitioningRef.current) {
      isTransitioningRef.current = true;
      setDirection(-1);
      onCardChange(activeIndex - 1);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 500);
    }
  }, [activeIndex, onCardChange]);

  // Wheel listener
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      const scrollable = target?.closest(".custom-card-scroll") as HTMLElement | null;

      if (scrollable) {
        const isScrollable = scrollable.scrollHeight > scrollable.clientHeight + 4;
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 6;
        const atTop = scrollable.scrollTop <= 6;

        if (isScrollable) {
          if (e.deltaY > 0 && !atBottom) {
            return;
          }
          if (e.deltaY < 0 && !atTop) {
            return;
          }
        }
      }

      if (Math.abs(e.deltaY) > 18) {
        if (e.deltaY > 0) {
          nextCard();
        } else {
          prevCard();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextCard, prevCard]);

  // Touch gesture listener with swipe threshold
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      const target = e.target as HTMLElement | null;
      const scrollable = target?.closest(".custom-card-scroll") as HTMLElement | null;

      if (scrollable && scrollable.scrollHeight > scrollable.clientHeight + 4) {
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 8;
        const atTop = scrollable.scrollTop <= 8;

        if (diff > 0 && !atBottom) return;
        if (diff < 0 && !atTop) return;
      }

      if (Math.abs(diff) > 35) {
        if (diff > 0) {
          nextCard();
        } else {
          prevCard();
        }
      }
      touchStartY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextCard, prevCard]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        nextCard();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prevCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard]);

  const current = cards[activeIndex];

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-black flex flex-col justify-between select-none">
      {/* Animated Background Grid Beams Layer */}
      <AmbientGridBeams />

      {/* Main Card Stage Area */}
      <main className="relative flex-1 w-full flex items-center justify-center px-2.5 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 pb-14 sm:pb-16 overflow-hidden z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            initial={{
              y: direction > 0 ? 50 : -50,
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1.0,
            }}
            exit={{
              y: direction > 0 ? -40 : 40,
              opacity: 0,
              scale: 0.97,
            }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-6xl xl:max-w-7xl h-[82dvh] sm:h-[84vh] rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#09090d]/90 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden flex flex-col z-20 select-text"
          >
            {/* Header Bar with Traffic Lights */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/50 px-4 sm:px-8 py-2.5 sm:py-3.5 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Traffic light control dots */}
                <div className="flex items-center gap-1.5 sm:gap-2 mr-1">
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ff5f56] shadow-sm" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#ffbd2e] shadow-sm" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#27c93f] shadow-sm" />
                </div>

                <span className="font-mono text-[11px] sm:text-xs text-zinc-500 font-medium">
                  {current.num}
                </span>
                <span className="text-zinc-700">/</span>
                <span className="text-[11px] sm:text-xs font-medium text-zinc-300 truncate max-w-[160px] sm:max-w-none">
                  {current.title}
                </span>
              </div>

              <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500 shrink-0">
                {String(activeIndex + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
              </div>
            </div>

            {/* Card Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-b from-[#0a0a0d]/95 to-[#070709]/95 custom-card-scroll">
              {current.component}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Deck HUD Indicator (Responsive for both Desktop and Mobile) */}
      <DeckHUD
        cards={cards}
        activeIndex={activeIndex}
        onSelectCard={goToCard}
        onPrev={prevCard}
        onNext={nextCard}
      />
    </div>
  );
}
