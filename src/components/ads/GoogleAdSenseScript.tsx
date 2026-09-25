import Script from "next/script";
import { useRouter } from "next/router";

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-2826613999405385";

export default function GoogleAdSenseScript() {
  const router = useRouter();

  // STRICT COMPLIANCE & PERFORMANCE:
  // 1. Never load on admin, api, or pages without ad slots (home, blueprints, lab)
  // 2. Only load on blog routes (/blog, /blog/[slug]) where AdSlot units actually exist
  if (!router.pathname.startsWith("/blog")) {
    return null;
  }

  if (!ADSENSE_CLIENT_ID) return null;

  return (
    <Script
      id="google-adsense"
      strategy="lazyOnload"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
