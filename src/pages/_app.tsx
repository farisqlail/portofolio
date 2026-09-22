import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/lib/authContext";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import GoogleAdSenseScript from "@/components/ads/GoogleAdSenseScript";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GoogleAdSenseScript />
      <AnalyticsTracker />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

