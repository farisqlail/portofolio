import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  PlusCircle,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  Eye,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { SAMPLE_POSTS } from "@/lib/blogData";
import type { BlogPost, PostStatus } from "@/types/blog";

export default function AdminPostsList() {
  const [posts, setPosts] = useState<BlogPost[]>(SAMPLE_POSTS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const fetchPosts = async () => {
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

      if (!error && data) {
        setPosts(data as BlogPost[]);
      }
    } catch (err) {
      console.warn("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: PostStatus) => {
    const nextStatus: PostStatus = currentStatus === "published" ? "draft" : "published";

    if (!isSupabaseConfigured) {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p))
      );
      setActionMsg(`[DEV_MODE]: Post status updated to ${nextStatus.toUpperCase()}`);
      setTimeout(() => setActionMsg(null), 3000);
      return;
    }

    try {
      const { error } = await supabase
        .from("posts")
        .update({
          status: nextStatus,
          published_at: nextStatus === "published" ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        alert(`Failed to update status: ${error.message}`);
      } else {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p))
        );
        setActionMsg(`Post status updated to ${nextStatus.toUpperCase()}`);
        setTimeout(() => setActionMsg(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    if (!isSupabaseConfigured) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setActionMsg("[DEV_MODE]: Post deleted successfully.");
      setTimeout(() => setActionMsg(null), 3000);
      return;
    }

    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) {
        alert(`Failed to delete post: ${error.message}`);
      } else {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setActionMsg("Post deleted successfully.");
        setTimeout(() => setActionMsg(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchStatus = filterStatus === "all" || post.status === filterStatus;
      const matchSearch =
        search.trim() === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.slug.toLowerCase().includes(search.toLowerCase()) ||
        post.category.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [posts, filterStatus, search]);

  return (
    <AdminLayout title="ARTICLES_MANAGEMENT">
      <Head>
        <title>Manage Articles · Faris Rizqilail CMS</title>
      </Head>

      <div className="space-y-6 max-w-6xl">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-mono">
              [ ARTICLE REPOSITORY ]
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Review, edit, publish, or remove blog articles.
            </p>
          </div>

          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-lg border border-[#FF5500] bg-[#FF5500] px-4 py-2 text-xs font-mono font-bold text-black hover:bg-[#ff6a1f] transition-all shadow-md self-start sm:self-auto"
          >
            <PlusCircle size={14} />
            <span>[ + NEW ARTICLE ]</span>
          </Link>
        </div>

        {actionMsg && (
          <div className="rounded border border-dashed border-[#A3E635]/40 bg-[#A3E635]/10 p-3 font-mono text-xs text-[#A3E635]">
            {actionMsg}
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="rounded-xl border border-dashed border-white/15 bg-black/60 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-zinc-500">[ FILTER ]:</span>
            {["all", "published", "draft"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded px-2.5 py-1 uppercase text-[11px] cursor-pointer transition-colors ${
                  filterStatus === status
                    ? "border border-[#FF5500] bg-[#FF5500] text-black font-bold"
                    : "border border-dashed border-white/15 text-zinc-400 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by title, slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-dashed border-white/15 bg-black/50 pl-8 pr-3 py-1.5 font-mono text-xs text-white placeholder-zinc-500 focus:border-[#FF5500] focus:outline-none"
            />
          </div>
        </div>

        {/* Posts Table */}
        <div className="rounded-xl border border-dashed border-white/20 bg-black/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-dashed border-white/15 bg-[#0e0e14] text-zinc-400 text-[10px] uppercase">
                <tr>
                  <th className="p-4">ARTICLE</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">VIEWS</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-white/10">
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-zinc-500">
                      No articles found matching query.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 min-w-[240px]">
                        <p className="font-bold text-white font-sans text-sm line-clamp-1">
                          {post.title}
                        </p>
                        <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                          /{post.slug}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className="rounded border border-dashed border-white/15 bg-white/[0.03] px-2 py-0.5 text-[10px] text-zinc-300">
                          {post.category}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleStatus(post.id, post.status)}
                          className="inline-flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                          title="Click to toggle status"
                        >
                          <span
                            className={`rounded border px-2 py-0.5 text-[9px] font-bold uppercase ${
                              post.status === "published"
                                ? "border-[#A3E635]/40 bg-[#A3E635]/10 text-[#A3E635]"
                                : "border-amber-500/40 bg-amber-500/10 text-amber-300"
                            }`}
                          >
                            [ {post.status} ]
                          </span>
                        </button>
                      </td>

                      <td className="p-4 whitespace-nowrap text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Eye size={11} className="text-zinc-500" />
                          {post.view_count}
                        </span>
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="p-1.5 rounded border border-dashed border-white/15 bg-zinc-950 text-zinc-300 hover:border-[#FF5500] hover:text-white transition-colors"
                            title="Edit Article"
                          >
                            <Edit size={13} />
                          </Link>

                          {post.status === "published" && (
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              className="p-1.5 rounded border border-dashed border-white/15 bg-zinc-950 text-zinc-400 hover:text-white transition-colors"
                              title="View Live"
                            >
                              <ExternalLink size={13} />
                            </Link>
                          )}

                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="p-1.5 rounded border border-dashed border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
