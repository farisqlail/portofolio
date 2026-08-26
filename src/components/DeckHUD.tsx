import { ChevronLeft, ChevronRight } from "lucide-react";

interface DeckHUDProps {
  cards: {
    id: string;
    label: string;
    num: string;
  }[];
  activeIndex: number;
  onSelectCard: (index: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function DeckHUD({
  cards,
  activeIndex,
  onSelectCard,
  onPrev,
  onNext,
}: DeckHUDProps) {
  const current = cards[activeIndex];
  const total = cards.length;

  return (
    <aside
      aria-label="Deck Navigation"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center pointer-events-auto"
    >
      {/* Mobile Mini Controller */}
      <div className="flex md:hidden items-center gap-1.5 rounded-xl border border-dashed border-white/20 bg-black/90 px-3 py-1.5 backdrop-blur-2xl shadow-2xl font-mono text-xs">
        <button
          onClick={onPrev}
          disabled={activeIndex === 0}
          className="p-1 text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#FF5500] transition-colors"
          aria-label="Previous Section"
        >
          <ChevronLeft size={15} />
        </button>

        <span className="font-bold text-white px-2">
          <span className="text-[#FF5500]">{current.num}</span>{" "}
          <span className="text-zinc-500 font-normal">/ {String(total).padStart(2, "0")}</span>
          <span className="text-zinc-300 font-normal ml-1.5 uppercase">{current.label}</span>
        </span>

        <button
          onClick={onNext}
          disabled={activeIndex === total - 1}
          className="p-1 text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#FF5500] transition-colors"
          aria-label="Next Section"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Desktop Full Pill Row */}
      <div className="hidden md:flex items-center gap-1.5 rounded-full border border-dashed border-white/20 bg-black/85 p-1.5 backdrop-blur-2xl shadow-2xl font-mono text-xs">
        {cards.map((card, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={card.id}
              onClick={() => onSelectCard(idx)}
              className={`group relative flex items-center gap-1.5 rounded-full px-3 py-1 transition-all cursor-pointer ${
                isActive
                  ? "bg-[#FF5500] text-black font-bold shadow-sm"
                  : "border border-dashed border-transparent hover:border-white/20 text-zinc-400 hover:text-white"
              }`}
            >
              <span className="text-[10px] opacity-70">[{card.num}]</span>
              <span className={isActive ? "inline" : "hidden group-hover:inline"}>
                {card.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
