import { useEffect } from "react";
import { useRouter } from "next/router";
import { logSiteVisit } from "@/lib/analytics";

export default function AnalyticsTracker() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleRouteChange = (url: string) => {
      // Do not track admin backoffice actions
      if (url.startsWith("/admin") || url.startsWith("/api")) {
        return;
      }

      // Debounce rapid reloads or double-clicks within 2 seconds
      const now = Date.now();
      const lastVisitKey = `last_visit_${url}`;
      const lastVisit = sessionStorage.getItem(lastVisitKey);
      if (lastVisit && now - Number(lastVisit) < 2000) {
        return;
      }
      sessionStorage.setItem(lastVisitKey, String(now));

      // Device detection
      const width = window.innerWidth;
      const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      const device = width < 640 || isMobileDevice ? "mobile" : width < 1024 ? "tablet" : "desktop";

      // Referrer detection
      let referrer = "direct";
      if (document.referrer) {
        try {
          referrer = new URL(document.referrer).hostname;
        } catch {
          referrer = "external";
        }
      }

      // Determine page type
      let pageType = "portfolio";
      let category = "Engineering";

      if (url.startsWith("/blog/")) {
        pageType = "blog_post";
      } else if (url === "/blog") {
        pageType = "blog_index";
      } else if (url === "/") {
        pageType = "home";
      } else if (url.startsWith("/lab/")) {
        pageType = "lab";
        category = "Lab";
      } else if (url.startsWith("/hermes")) {
        pageType = "hermes";
        category = "AI & ML";
      }

      // Defer execution so it does not block user navigation
      setTimeout(() => {
        logSiteVisit({
          path: url,
          page_type: pageType,
          title: typeof document !== "undefined" ? document.title : url,
          category,
          device,
          referrer,
        });
      }, 500);
    };

    // Track initial load
    handleRouteChange(router.asPath);

    // Track client-side navigations
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return null;
}
