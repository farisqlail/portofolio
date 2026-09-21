import { useEffect, useRef, useState } from "react";

interface AdSlotProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "in-article";
  className?: string;
}

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-2826613999405385";

export default function AdSlot({
  slotId = "default-slot",
  format = "horizontal",
  className = "",
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const isLoadedRef = useRef(false);
  const [isUnfilled, setIsUnfilled] = useState(false);

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

    const currentIns = insRef.current;
    if (!currentIns) return;

    // Observe data-ad-status change (e.g. unfilled when account is in review)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-ad-status") {
          const status = currentIns.getAttribute("data-ad-status");
          if (status === "unfilled") {
            setIsUnfilled(true);
          } else if (status === "filled") {
            setIsUnfilled(false);
          }
        }
      }
    });

    observer.observe(currentIns, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const formatStyles = {
    horizontal: "min-h-[90px] w-full max-w-[728px]",
    rectangle: "min-h-[250px] w-full max-w-[336px]",
    "in-article": "min-h-[100px] w-full",
  }[format];

  const isNumericSlot = slotId && /^\d+$/.test(slotId);

  return (
    <div className={`my-6 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <div className="mb-1.5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
        <span>[ SPONSORED / ADVERTISEMENT ]</span>
        {isUnfilled && (
          <span className="rounded border border-[#FF5500]/30 bg-[#FF5500]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#FF5500]">
            AWAITING_APPROVAL
          </span>
        )}
      </div>

      <div
        ref={adRef}
        className={`relative flex items-center justify-center overflow-hidden rounded border border-dashed border-white/15 bg-[#0c0c12] ${formatStyles}`}
      >
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: isUnfilled ? "none" : "block", textAlign: "center", width: "100%", background: "transparent" }}
          data-ad-client={ADSENSE_CLIENT_ID}
          {...(isNumericSlot ? { "data-ad-slot": slotId } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {/* Blueprint standby placeholder while Google AdSense reviews the site */}
        {isUnfilled && (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-400">
              <span className="h-1.5 w-1.5 bg-[#FF5500] animate-pulse"></span>
              <span>Google AdSense Active // Slot Ready</span>
            </div>
            <p className="mt-1 font-mono text-[10px] text-zinc-500 max-w-sm">
              Iklan komersial akan otomatis tayang setelah peninjauan situs disetujui oleh Google AdSense.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
