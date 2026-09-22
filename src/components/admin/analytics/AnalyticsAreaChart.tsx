import React, { useState, useRef, useId } from "react";
import type { TimeSeriesDataPoint } from "@/lib/analytics";

interface AnalyticsAreaChartProps {
  data: TimeSeriesDataPoint[];
  height?: number;
}

export default function AnalyticsAreaChart({ data, height = 280 }: AnalyticsAreaChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientId = useId();

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center font-mono text-xs text-zinc-500 border border-dashed border-white/10 rounded-xl">
        NO_TELEMETRY_DATA_IN_HORIZON
      </div>
    );
  }

  // SVG coordinate dimensions
  const svgWidth = 800;
  const svgHeight = height;
  const padding = { top: 24, right: 24, bottom: 36, left: 44 };

  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  // Compute maximum values for scaling
  const maxViews = Math.max(...data.map((d) => d.views), 10);
  // Round up to nice number
  const yMax = Math.ceil((maxViews * 1.15) / 10) * 10;

  // Map data to coordinates
  const points = data.map((d, index) => {
    const x = padding.left + (index / Math.max(data.length - 1, 1)) * chartWidth;
    const y = padding.top + chartHeight - (d.views / yMax) * chartHeight;
    const visitorY = padding.top + chartHeight - (d.visitors / yMax) * chartHeight;
    return { x, y, visitorY, ...d };
  });

  // SVG Path generation (smooth curve)
  const createSmoothPath = (pts: Array<{ x: number; y: number }>) => {
    if (pts.length === 0) return "";
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = createSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  // Secondary line for visitors
  const visitorPoints = points.map((p) => ({ x: p.x, y: p.visitorY }));
  const visitorLinePath = createSmoothPath(visitorPoints);

  // Y-axis grid ticks (4 levels)
  const yTicks = [0, 0.33, 0.66, 1].map((ratio) => {
    const val = Math.round(yMax * ratio);
    const yPos = padding.top + chartHeight - ratio * chartHeight;
    return { val, yPos };
  });

  // Handle pointer hover
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (relativeX - (padding.left / svgWidth) * rect.width) / ((chartWidth / svgWidth) * rect.width)));
    const targetIdx = Math.round(ratio * (data.length - 1));
    setHoverIndex(targetIdx);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const activePoint = hoverIndex !== null ? points[hoverIndex] : points[points.length - 1];

  return (
    <div className="relative font-mono" ref={containerRef}>
      {/* Top Telemetry HUD Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-1 border-b border-dashed border-white/10 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500]" />
            <span className="text-zinc-400 text-[11px]">PAGE_VIEWS</span>
            <span className="text-white font-bold text-sm">{activePoint.views.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635]" />
            <span className="text-zinc-400 text-[11px]">UNIQUE_VISITORS</span>
            <span className="text-white font-bold text-sm">{activePoint.visitors.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <span className="text-zinc-400">TIMESTAMP:</span>
          <span className="text-[#FF5500] font-bold bg-[#FF5500]/10 px-2 py-0.5 rounded border border-[#FF5500]/30">
            {activePoint.displayDate} ({activePoint.date})
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto select-none cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            {/* Gradient for views area */}
            <linearGradient id={`viewsGradient-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5500" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#FF5500" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#FF5500" stopOpacity="0.00" />
            </linearGradient>

            {/* Pattern grid lines */}
            <pattern id={`dotGrid-${gradientId}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#ffffff" fillOpacity="0.07" />
            </pattern>
          </defs>

          {/* Background dot grid */}
          <rect
            x={padding.left}
            y={padding.top}
            width={chartWidth}
            height={chartHeight}
            fill={`url(#dotGrid-${gradientId})`}
          />

          {/* Horizontal Grid lines */}
          {yTicks.map((t, idx) => (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={t.yPos}
                x2={svgWidth - padding.right}
                y2={t.yPos}
                stroke="#ffffff"
                strokeOpacity="0.1"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 8}
                y={t.yPos + 4}
                fill="#71717a"
                fontSize="9"
                textAnchor="end"
                className="font-mono"
              >
                {t.val}
              </text>
            </g>
          ))}

          {/* X-axis date labels */}
          {points.map((p, idx) => {
            // Show only ~5-7 date labels spaced evenly to prevent overlap
            const step = Math.max(1, Math.floor(points.length / 6));
            const shouldShow = idx === 0 || idx === points.length - 1 || idx % step === 0;

            if (!shouldShow) return null;

            return (
              <g key={idx}>
                <line
                  x1={p.x}
                  y1={padding.top + chartHeight}
                  x2={p.x}
                  y2={padding.top + chartHeight + 4}
                  stroke="#ffffff"
                  strokeOpacity="0.2"
                />
                <text
                  x={p.x}
                  y={padding.top + chartHeight + 18}
                  fill="#71717a"
                  fontSize="9"
                  textAnchor="middle"
                  className="font-mono"
                >
                  {p.displayDate}
                </text>
              </g>
            );
          })}

          {/* Gradient area fill */}
          <path d={areaPath} fill={`url(#viewsGradient-${gradientId})`} />

          {/* Visitors secondary line (dashed Acid Lime) */}
          <path
            d={visitorLinePath}
            fill="none"
            stroke="#A3E635"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeOpacity="0.75"
          />

          {/* Views primary line (Solid Safety Ember) */}
          <path
            d={linePath}
            fill="none"
            stroke="#FF5500"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Crosshair & Target Node */}
          {hoverIndex !== null && (
            <g>
              {/* Vertical crosshair line */}
              <line
                x1={activePoint.x}
                y1={padding.top}
                x2={activePoint.x}
                y2={padding.top + chartHeight}
                stroke="#FF5500"
                strokeWidth="1"
                strokeDasharray="2 2"
                strokeOpacity="0.8"
              />

              {/* Point on views line */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="5"
                fill="#0a0a0f"
                stroke="#FF5500"
                strokeWidth="2.5"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="10"
                fill="#FF5500"
                fillOpacity="0.2"
              />

              {/* Point on visitor line */}
              <circle
                cx={activePoint.x}
                cy={activePoint.visitorY}
                r="3.5"
                fill="#0a0a0f"
                stroke="#A3E635"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Chart Footer Legend & Blueprint Badges */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-dashed border-white/10 text-[10px] text-zinc-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-0.5 bg-[#FF5500]" />
            <span>Page Views (Linear Scale)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-0.5 border-b border-dashed border-[#A3E635]" />
            <span>Unique Visitors</span>
          </span>
        </div>

        <span className="text-zinc-600">
          [ CAD_GRID // SCALE 1:1 // TELEMETRY_ACTIVE ]
        </span>
      </div>
    </div>
  );
}
