import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Upload,
  AlertCircle,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import type { BlogPost, PostFormData, PostStatus } from "@/types/blog";
import WysiwygEditor from "./WysiwygEditor";

interface PostFormProps {
  initialData?: BlogPost;
  isEdit?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostForm({ initialData, isEdit = false }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialData?.slug));
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [coverImage, setCoverImage] = useState(initialData?.cover_image ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "Engineering");
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(", ") ?? "");
  const [status, setStatus] = useState<PostStatus>(initialData?.status ?? "draft");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManual) {
      setSlug(slugify(val));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isSupabaseConfigured) {
      alert("Supabase Storage belum aktif. Anda dapat menempelkan URL gambar langsung untuk saat ini.");
      return;
    }

    try {
      setUploadingImage(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-assets")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("blog-assets").getPublicUrl(filePath);
      setCoverImage(data.publicUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      alert(`Image upload error: ${msg}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSaving(true);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const postPayload = {
      title,
      slug: slugify(slug),
      excerpt,
      content,
      cover_image: coverImage || null,
      category,
      tags,
      status,
      updated_at: new Date().toISOString(),
      ...(status === "published" && !initialData?.published_at
        ? { published_at: new Date().toISOString() }
        : {}),
    };

    if (!isSupabaseConfigured) {
      // Mock save for local dev
      alert(`[DEV_MODE]: Artikel "${title}" berhasil disimpan secara lokal!`);
      router.push("/admin/posts");
      return;
    }

    try {
      if (isEdit && initialData?.id) {
        const { error } = await supabase
          .from("posts")
          .update(postPayload)
          .eq("id", initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("posts").insert([
          {
            ...postPayload,
            view_count: 0,
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;
      }

      router.push("/admin/posts");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Save failed";
      setErrorMsg(msg);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dashed border-white/15 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded border border-dashed border-white/20 bg-black/40 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
          </Link>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white font-mono">
              [ {isEdit ? "EDIT ARTICLE" : "COMPOSE NEW ARTICLE"} ]
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Draft or publish markdown articles directly to production.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PostStatus)}
            className="rounded border border-dashed border-white/20 bg-zinc-950 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#FF5500]"
          >
            <option value="draft">STATUS: DRAFT</option>
            <option value="published">STATUS: PUBLISHED</option>
          </select>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg border border-[#FF5500] bg-[#FF5500] px-4 py-1.5 text-xs font-mono font-bold text-black hover:bg-[#ff6a1f] transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save size={13} />
            <span>{saving ? "SAVING..." : "[ SAVE & DEPLOY ]"}</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="rounded border border-dashed border-rose-500/40 bg-rose-500/10 p-4 text-xs font-mono text-rose-300 flex items-start gap-2">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Fields Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Core inputs (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Title */}
          <div className="space-y-1 font-mono text-xs">
            <label className="text-zinc-400 block font-bold">[ ARTICLE_TITLE ]</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Architecting Distributed Message Queues with Redis"
              className="w-full rounded-lg border border-dashed border-white/15 bg-black/60 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1 font-mono text-xs">
            <div className="flex items-center justify-between">
              <label className="text-zinc-400 font-bold">[ URL_SLUG ]</label>
              <span className="text-[10px] text-zinc-500">/blog/{slug || "slug-preview"}</span>
            </div>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setIsSlugManual(true);
                setSlug(e.target.value);
              }}
              placeholder="architecting-distributed-message-queues"
              className="w-full rounded-lg border border-dashed border-white/15 bg-black/60 px-3 py-2 text-xs font-mono text-zinc-300 placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-1 font-mono text-xs">
            <label className="text-zinc-400 block font-bold">[ SUMMARY / EXCERPT ]</label>
            <textarea
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief 1-2 sentence overview of the article for catalog listing and search indexing..."
              className="w-full rounded-lg border border-dashed border-white/15 bg-black/60 p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
            />
          </div>

          {/* Content WYSIWYG Editor */}
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-2">
              <label className="text-zinc-400 font-bold">[ ARTICLE_CONTENT (WYSIWYG) ]</label>
              <span className="text-[10px] text-zinc-500 font-normal">
                RICH TEXT + VISUAL FORMATTING
              </span>
            </div>
            <WysiwygEditor
              value={content}
              onChange={(newVal) => setContent(newVal)}
              placeholder="Start drafting your article... Supports rich visual formatting, code blocks, lists, and images."
            />
          </div>
        </div>

        {/* Right Column: Metadata & Assets (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Category */}
          <div className="rounded-xl border border-dashed border-white/15 bg-black/60 p-4 space-y-2 font-mono text-xs">
            <label className="text-zinc-400 block font-bold">[ CATEGORY ]</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded border border-dashed border-white/20 bg-zinc-950 p-2 text-xs text-white focus:border-[#FF5500] focus:outline-none"
            >
              <option value="Engineering">Engineering</option>
              <option value="Architecture">Architecture</option>
              <option value="AI & ML">AI &amp; ML</option>
              <option value="Web3">Web3</option>
              <option value="Leadership">Leadership</option>
            </select>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-dashed border-white/15 bg-black/60 p-4 space-y-2 font-mono text-xs">
            <label className="text-zinc-400 block font-bold">[ TAGS (COMMA SEPARATED) ]</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Next.js, React, Tailwind, Microservices"
              className="w-full rounded border border-dashed border-white/15 bg-black/50 p-2 text-xs text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
            />
          </div>

          {/* Cover Image Upload & URL */}
          <div className="rounded-xl border border-dashed border-white/15 bg-black/60 p-4 space-y-3 font-mono text-xs">
            <label className="text-zinc-400 block font-bold">[ COVER IMAGE ]</label>

            <div className="space-y-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://... or /assets/images/..."
                className="w-full rounded border border-dashed border-white/15 bg-black/50 p-2 text-[11px] text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
              />

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                  id="cover-upload-input"
                />
                <label
                  htmlFor="cover-upload-input"
                  className="w-full flex items-center justify-center gap-2 rounded border border-dashed border-white/20 bg-zinc-950 py-2 text-xs text-zinc-300 hover:border-[#FF5500] hover:text-white cursor-pointer transition-colors"
                >
                  <Upload size={13} />
                  <span>{uploadingImage ? "UPLOADING..." : "Upload from Computer"}</span>
                </label>
              </div>

              {coverImage && (
                <div className="mt-2 rounded border border-dashed border-white/15 overflow-hidden aspect-[16/9] relative bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
