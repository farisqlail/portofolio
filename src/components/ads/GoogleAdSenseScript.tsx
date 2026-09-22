import Script from "next/script";
import { useRouter } from "next/router";

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-2826613999405385";

export default function GoogleAdSenseScript() {
  const router = useRouter();

  // STRICT COMPLIANCE: Never load AdSense scripts on admin backoffice, login screens, or auth flows
  if (
    router.pathname.startsWith("/admin") ||
    router.pathname.startsWith("/api")
  ) {
    return null;
  }

  if (!ADSENSE_CLIENT_ID) return null;

  return (
    <Script
      id="google-adsense"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
