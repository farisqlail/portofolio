import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-dashed border-white/15 bg-black px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row font-mono text-xs text-zinc-500">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Faris Rizqilail. All rights reserved.
          </p>
          <span className="hidden sm:inline text-zinc-700">·</span>
          <p className="text-zinc-400">
            Founder @LailDev · Software Engineer
          </p>
        </div>

        {/* Legal & Navigation Links (Google AdSense Mandatory & Internal Link Equity) */}
        <div className="flex items-center flex-wrap justify-center gap-4 text-[11px]">
          <Link
            href="/blueprints"
            className="text-zinc-400 hover:text-[#FF5500] transition-colors"
          >
            Blueprints
          </Link>
          <span className="text-zinc-700">/</span>
          <Link
            href="/blog"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Blog
          </Link>
          <span className="text-zinc-700">/</span>
          <Link
            href="/privacy"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-zinc-700">/</span>
          <Link
            href="/terms"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
          <span className="text-zinc-700">/</span>
          <a
            href="mailto:farisrizqilail@gmail.com"
            className="text-zinc-400 hover:text-[#FF5500] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

