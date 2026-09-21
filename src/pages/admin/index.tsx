import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  PlusCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { SAMPLE_POSTS } from "@/lib/blogData";
import type { BlogPost } from "@/types/blog";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>(SAMPLE_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      if (!isSupabaseConfigured) {
        setPosts(SAMPLE_POSTS);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setPosts(data as BlogPost[]);
        }
      } catch (err) {
        console.warn("Failed to fetch admin posts:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;
  const totalViews = posts.reduce((acc, curr) => acc + (curr.view_count || 0), 0);

  const metrics = [
    {
      label: "TOTAL ARTICLES",
      value: totalPosts,
      icon: FileText,
      color: "#FF5500",
      detail: "Indexed in Supabase",
    },
    {
      label: "PUBLISHED LIVE",
      value: publishedCount,
      icon: CheckCircle2,
      color: "#A3E635",
      detail: "Accessible publicly",
    },
    {
      label: "DRAFTS",
      value: draftCount,
      icon: Clock,
      color: "#F6D1AC",
      detail: "In progress",
    },
    {
      label: "TOTAL READERS",
      value: totalViews,
      icon: Eye,
      color: "#C7B8F5",
      detail: "Page impressions",
    },
  ];

  return (
    <AdminLayout title="DASHBOARD_OVERVIEW">
      <Head>
        <title>Backoffice Dashboard · Faris Rizqilail CMS</title>
      </Head>

      <div className="space-y-6 max-w-6xl">
        {/* Welcome Banner */}
        <div className="rounded-xl border border-dashed border-white/20 bg-[#0c0c12] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] text-[#FF5500] font-bold uppercase tracking-wider block">
              [ COMMAND CENTER // ACTIVE ]
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Engineering Blog Control Hub
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
              Create, curate, and deploy technical articles with instant static site invalidation and built-in AdSense monetization slots.
            </p>
          </div>

          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-lg border border-[#FF5500] bg-[#FF5500] px-4 py-2 text-xs font-mono font-bold text-black hover:bg-[#ff6a1f] transition-all shadow-md shrink-0"
          >
            <PlusCircle size={14} />
            <span>[ WRITE NEW ARTICLE ]</span>
          </Link>
        </div>

        {/* Metrics Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="rounded-xl border border-dashed border-white/15 bg-black/60 p-5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-400 font-bold">
                    [ {m.label} ]
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded border border-dashed border-white/20 bg-zinc-950">
                    <Icon size={14} style={{ color: m.color }} />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                    {loading ? "..." : m.value}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                    {m.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Articles Stream */}
        <div className="rounded-xl border border-dashed border-white/20 bg-black/60 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-dashed border-white/15 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                [ RECENT ARTICLES ]
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Overview of latest created or modified blog posts.
              </p>
            </div>
            <Link
              href="/admin/posts"
              className="inline-flex items-center gap-1 font-mono text-xs text-[#FF5500] hover:underline"
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-dashed divide-white/10 font-mono text-xs">
            {posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded border px-2 py-0.5 text-[9px] font-bold uppercase ${
                        post.status === "published"
                          ? "border-[#A3E635]/40 bg-[#A3E635]/10 text-[#A3E635]"
                          : "border-amber-500/40 bg-amber-500/10 text-amber-300"
                      }`}
                    >
                      [ {post.status} ]
                    </span>
                    <span className="text-zinc-500 text-[10px]">
                      {post.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate max-w-xl font-sans">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                    <span>{post.view_count} views</span>
                    <span>·</span>
                    <span>slug: /{post.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="rounded border border-dashed border-white/20 bg-zinc-950 px-3 py-1 text-[11px] text-zinc-300 hover:border-[#FF5500] hover:text-white transition-colors"
                  >
                    Edit
                  </Link>
                  {post.status === "published" && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="rounded border border-dashed border-white/20 bg-zinc-950 px-3 py-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                    >
                      Preview ↗
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
