import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Geist, Geist_Mono } from "next/font/google";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  ExternalLink,
  LogOut,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const { user, loading, isConfigured, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      const returnUrl = router.asPath && router.asPath !== "/admin/login" ? encodeURIComponent(router.asPath) : undefined;
      const target = returnUrl ? `/admin/login?redirect=${returnUrl}` : "/admin/login";
      router.replace(target);
    }
  }, [user, loading, router]);

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Articles", href: "/admin/posts", icon: FileText },
    { label: "New Article", href: "/admin/posts/new", icon: PlusCircle },
  ];

  if (loading) {
    return (
      <div className={`${geistMono.variable} min-h-screen bg-[#07070a] flex items-center justify-center text-zinc-400 font-mono text-xs`}>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-[#FF5500] animate-ping" />
          <span>CHECKING_AUTHORIZATION...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`${geistMono.variable} min-h-screen bg-[#07070a] flex items-center justify-center text-zinc-400 font-mono text-xs`}>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-[#FF5500] animate-ping" />
          <span>ACCESS_PROTECTED // REDIRECTING_TO_LOGIN...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#07070a] text-foreground font-sans flex flex-col md:flex-row`}
    >
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-dashed border-white/15 bg-[#0a0a0f] p-4 sm:p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Brand Tag */}
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded border border-[#FF5500]/50 bg-[#FF5500]/10 font-mono text-xs font-bold text-[#FF5500]">
                FR
              </span>
              <div>
                <span className="font-mono text-xs font-bold text-white block">
                  BACKOFFICE
                </span>
                <span className="font-mono text-[9px] text-[#A3E635] block">
                  CMS // STITCH.v2
                </span>
              </div>
            </Link>
          </div>

          {!isConfigured && (
            <div className="rounded border border-dashed border-amber-500/40 bg-amber-500/10 p-3 text-[11px] font-mono text-amber-300 space-y-1">
              <div className="flex items-center gap-1 font-bold">
                <ShieldAlert size={13} />
                <span>DEV_MODE</span>
              </div>
              <p className="text-[10px] text-amber-200/80 leading-relaxed font-sans">
                Supabase belum dikonfigurasi di .env.local. Fitur CMS saat ini berjalan dalam mode preview/mock.
              </p>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="space-y-1 font-mono text-xs">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = router.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors ${
                    isActive
                      ? "border border-[#FF5500]/40 bg-[#FF5500]/10 text-white font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon
                    size={14}
                    className={isActive ? "text-[#FF5500]" : "text-zinc-500"}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-dashed border-white/10 space-y-2 font-mono text-xs">
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center justify-between text-zinc-400 hover:text-white py-1 transition-colors"
          >
            <span className="text-[11px]">View Live Blog</span>
            <ExternalLink size={12} />
          </Link>

          {user && (
            <button
              onClick={() => signOut().then(() => router.push("/admin/login"))}
              className="w-full flex items-center justify-between text-zinc-400 hover:text-rose-400 py-1 transition-colors cursor-pointer text-left"
            >
              <span className="text-[11px] truncate max-w-[140px] text-zinc-500">
                {user.email}
              </span>
              <LogOut size={12} />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-dashed border-white/15 px-6 flex items-center justify-between bg-[#08080c]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-zinc-500 uppercase">
              CONSOLE //
            </span>
            <h1 className="text-sm sm:text-base font-bold text-white font-mono">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="h-2 w-2 rounded-full bg-[#A3E635] animate-pulse" />
            <span className="text-zinc-400">SUPABASE_CONNECTED</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
