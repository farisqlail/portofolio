import { useEffect, useRef } from "react";

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

  const isNumericSlot = slotId && /^\d+$/.test(slotId);

  return (
    <div className={`my-6 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <span className="mb-1 font-mono text-[9px] uppercase tracking-wider text-zinc-600">
        [ SPONSORED / ADVERTISEMENT ]
      </span>
      <div
        ref={adRef}
        className={`overflow-hidden rounded border border-dashed border-white/10 bg-black/40 ${formatStyles}`}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-client={ADSENSE_CLIENT_ID}
          {...(isNumericSlot ? { "data-ad-slot": slotId } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
