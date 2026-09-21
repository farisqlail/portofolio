import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/authContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { user, signIn, isConfigured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const destination =
        typeof router.query.redirect === "string"
          ? decodeURIComponent(router.query.redirect)
          : "/admin";
      window.location.href = destination;
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    const { error } = await signIn(email, password);

    if (error) {
      setSubmitting(false);
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setErrorMsg(
          "Email belum dikonfirmasi oleh Supabase. Silakan periksa inbox/spam email Anda untuk klik link verifikasi Supabase, atau buka Supabase Dashboard > Authentication > Users > klik titik tiga '...' di baris user lalu pilih 'Confirm user'."
        );
      } else if (error.message.toLowerCase().includes("invalid login credentials")) {
        setErrorMsg("Email atau password yang Anda masukkan salah.");
      } else {
        setErrorMsg(error.message);
      }
    } else {
      const destination =
        typeof router.query.redirect === "string"
          ? decodeURIComponent(router.query.redirect)
          : "/admin";
      window.location.href = destination;
    }
  };

  return (
    <>
      <Head>
        <title>Backoffice Login · Faris Rizqilail CMS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#07070a] text-foreground font-sans flex items-center justify-center p-4 relative overflow-hidden`}
      >
        {/* Blueprint Micro Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Login Box */}
        <div className="relative w-full max-w-md rounded-2xl border border-dashed border-white/20 bg-[#0c0c12]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl z-10 space-y-6">
          {/* Corner Cross Pins */}
          <span className="absolute top-2 left-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>
          <span className="absolute top-2 right-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>
          <span className="absolute bottom-2 left-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>
          <span className="absolute bottom-2 right-2 font-mono text-xs text-zinc-600 select-none font-bold">+</span>

          {/* Top Brand Header */}
          <div className="border-b border-dashed border-white/15 pb-4 text-center space-y-2">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded border border-[#FF5500]/50 bg-[#FF5500]/10 font-mono font-bold text-sm text-[#FF5500]">
              FR
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white font-mono">
              [ ADMIN // CONSOLE ]
            </h1>
            <p className="text-xs text-zinc-400 font-sans">
              Enter your authorized Supabase administrator credentials.
            </p>
          </div>

          {!isConfigured && (
            <div className="rounded border border-dashed border-amber-500/40 bg-amber-500/10 p-3 text-xs font-mono text-amber-300 flex items-start gap-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <p className="font-sans leading-relaxed text-[11px]">
                Kredensial Supabase belum terdeteksi di <code className="text-white">.env.local</code>. Harap buat project Supabase dan lengkapi env variables untuk mengaktifkan login autentikasi.
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="rounded border border-dashed border-rose-500/40 bg-rose-500/10 p-3 text-xs font-mono text-rose-300 flex items-start gap-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <p className="font-sans leading-relaxed text-[11px]">{errorMsg}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 font-mono text-xs">
              <label className="text-zinc-400 block font-bold">
                [ ADMIN_EMAIL ]
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@laildev.com"
                  className="w-full rounded-lg border border-dashed border-white/15 bg-black/60 pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <label className="text-zinc-400 block font-bold">
                [ PASSWORD ]
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-dashed border-white/15 bg-black/60 pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#FF5500] bg-[#FF5500] py-2.5 text-xs font-mono font-bold text-black hover:bg-[#ff6a1f] transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <span>{submitting ? "AUTHENTICATING..." : "[ SIGN IN TO BACKOFFICE ]"}</span>
              <ArrowRight size={13} />
            </button>
          </form>

          {/* Bottom links */}
          <div className="pt-2 border-t border-dashed border-white/10 flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-white transition-colors">
              <ArrowLeft size={11} />
              <span>Return to Portfolio</span>
            </Link>
            <Link href="/blog" className="hover:text-[#FF5500] transition-colors">
              View Blog ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
