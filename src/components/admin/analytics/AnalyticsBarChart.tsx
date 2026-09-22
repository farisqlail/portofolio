import React from "react";
import type { CategoryTraffic, SourceTraffic } from "@/lib/analytics";

interface CategoryBreakdownProps {
  categories: CategoryTraffic[];
}

export function CategoryBreakdownChart({ categories }: CategoryBreakdownProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="p-4 text-center font-mono text-xs text-zinc-500">
        NO_CATEGORY_DATA
      </div>
    );
  }

  const maxViews = Math.max(...categories.map((c) => c.views), 1);

  return (
    <div className="space-y-3 font-mono">
      {categories.map((cat) => {
        const barWidth = Math.max(4, Math.round((cat.views / maxViews) * 100));

        return (
          <div key={cat.category} className="space-y-1 group">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-sm shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-zinc-200 font-bold group-hover:text-white transition-colors">
                  {cat.category}
                </span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <span className="text-white font-bold">{cat.views.toLocaleString()}</span>
                <span className="text-[10px] text-zinc-500 w-9 text-right font-normal">
                  {cat.percentage}%
                </span>
              </div>
            </div>

            {/* Tactile Progress Track */}
            <div className="h-2 w-full bg-white/[0.04] rounded-sm overflow-hidden border border-dashed border-white/10 p-[1px]">
              <div
                className="h-full rounded-sm transition-all duration-500 ease-out relative"
                style={{
                  width: `${barWidth}%`,
                  backgroundColor: cat.color,
                  opacity: 0.85,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface SourceBreakdownProps {
  sources: SourceTraffic[];
}

export function SourceBreakdownChart({ sources }: SourceBreakdownProps) {
  if (!sources || sources.length === 0) {
    return (
      <div className="p-4 text-center font-mono text-xs text-zinc-500">
        NO_SOURCE_DATA
      </div>
    );
  }

  const SOURCE_COLORS: Record<string, string> = {
    "Direct / Organic": "#38BDF8", // Cyan
    "Google Search": "#A3E635", // Green
    "GitHub / Lab": "#FCD34D", // Amber
    "Twitter / X": "#C084FC", // Purple
  };

  return (
    <div className="space-y-3 font-mono">
      {sources.map((src) => {
        const color = SOURCE_COLORS[src.source] || "#94A3B8";

        return (
          <div key={src.source} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300 truncate">{src.source}</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{src.views.toLocaleString()}</span>
                <span className="text-[10px] text-zinc-500">{src.percentage}%</span>
              </div>
            </div>

            {/* Minimal Bar */}
            <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${src.percentage}%`,
                  backgroundColor: color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
