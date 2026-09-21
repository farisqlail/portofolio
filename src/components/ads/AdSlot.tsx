import { useEffect, useRef } from "react";

interface AdSlotProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "in-article";
  className?: string;
}

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function AdSlot({
  slotId = "default-slot",
  format = "horizontal",
  className = "",
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || isLoadedRef.current) return;

    try {
      if (typeof window !== "undefined") {
        ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || []).push({});
        isLoadedRef.current = true;
      }
    } catch (e) {
      console.warn("AdSense push error:", e);
    }
  }, []);

  const formatStyles = {
    horizontal: "min-h-[90px] w-full max-w-[728px]",
    rectangle: "min-h-[250px] w-full max-w-[336px]",
    "in-article": "min-h-[100px] w-full",
  }[format];

  // If AdSense client ID is configured, render the real AdSense tag
  if (ADSENSE_CLIENT_ID && process.env.NODE_ENV === "production") {
    return (
      <div className={`my-6 flex flex-col items-center justify-center overflow-hidden ${className}`}>
        <span className="mb-1 font-mono text-[9px] uppercase tracking-wider text-zinc-600">
          [ SPONSORED / ADVERTISEMENT ]
        </span>
        <div ref={adRef} className={`overflow-hidden rounded border border-dashed border-white/10 bg-black/40 ${formatStyles}`}>
          <ins
            className="adsbygoogle"
            style={{ display: "block", textAlign: "center" }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Development & Fallback placeholder with Stitch UI style
  return (
    <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
      <span className="mb-1 font-mono text-[9px] uppercase tracking-wider text-zinc-600">
        [ ADVERTISEMENT SLOT // {format.toUpperCase()} ]
      </span>
      <div
        className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-white/15 bg-[#09090e]/80 p-4 text-center backdrop-blur-sm ${formatStyles}`}
      >
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#FF5500]">
          <span className="h-1.5 w-1.5 bg-[#FF5500]" />
          <span>ADSENSE_CONTAINER // {slotId}</span>
        </div>
        <p className="mt-1 font-mono text-[10px] text-zinc-500">
          Active AdSense Slot · Ready for Publisher ID
        </p>
      </div>
    </div>
  );
}
