import "@/styles/globals.css";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import PageLoader from "@/components/PageLoader";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader key="page-loader" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key="page-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
