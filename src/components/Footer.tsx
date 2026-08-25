export default function Footer() {
  return (
    <footer className="border-t border-border bg-black px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row font-mono text-xs text-zinc-500">
        <p>
          &copy; {new Date().getFullYear()} Faris Rizqilail. All rights reserved.
        </p>
        <p className="text-zinc-400">
          Founder @LailDev · Software Engineer
        </p>
      </div>
    </footer>
  );
}
