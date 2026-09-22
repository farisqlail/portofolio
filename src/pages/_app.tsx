import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/lib/authContext";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AnalyticsTracker />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
