import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Trash2,
  ExternalLink,
  Upload,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  Tag,
  DollarSign,
  Link as LinkIcon,
  Sparkles,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { initialTemplates } from "@/data/initialTemplates";
import type { Template } from "@/types/template";

export default function AdminTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("$29");
  const [gumroadUrl, setGumroadUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("Next.js, Tailwind, Framer Motion");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  // Fetch templates from Supabase
  const loadTemplates = useCallback(async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured) {
      setTemplates(initialTemplates);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setTemplates(data as Template[]);
      } else {
        setTemplates(initialTemplates);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load templates";
      console.warn("Error loading templates:", msg);
      setTemplates(initialTemplates);
      setStatusMessage({ type: "error", text: `Supabase query: ${msg}. Showing default templates.` });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const runFetch = async () => {
      setIsLoading(true);
      if (!isSupabaseConfigured) {
        if (!ignore) {
          setTemplates(initialTemplates);
          setIsLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from("templates")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!ignore) {
          setTemplates(data && data.length > 0 ? (data as Template[]) : initialTemplates);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to load templates";
        if (!ignore) {
          setTemplates(initialTemplates);
          setStatusMessage({ type: "error", text: `Supabase query: ${msg}. Showing default templates.` });
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    void runFetch();

    return () => {
      ignore = true;
    };
  }, []);

  // Image file select handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
  };

  // Upload image to Supabase Storage
  const uploadImageToStorage = async (file: File): Promise<string | null> => {
    try {
      setIsUploadingImage(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `template-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("templates")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("templates").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      throw new Error(`Storage upload failed: ${msg}`);
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Create Template Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !gumroadUrl.trim()) {
      setStatusMessage({ type: "error", text: "Title and Gumroad URL are required." });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      let finalImageUrl = imageUrl.trim();

      // 1. If file uploaded, upload to Supabase Storage
      if (imageFile) {
        if (isSupabaseConfigured) {
          const uploadedUrl = await uploadImageToStorage(imageFile);
          if (uploadedUrl) finalImageUrl = uploadedUrl;
        } else {
          finalImageUrl = imagePreview || "/assets/images/faris-hero-2.png";
        }
      }

      if (!finalImageUrl) {
        finalImageUrl = "/assets/images/faris-hero-2.png";
      }

      const parsedTags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const newTemplateData = {
        title: title.trim(),
        price: price.trim() || "$29",
        gumroad_url: gumroadUrl.trim(),
        preview_url: previewUrl.trim(),
        description: description.trim(),
        image_url: finalImageUrl,
        tags: parsedTags,
        featured: isFeatured,
      };

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from("templates")
          .insert([newTemplateData])
          .select();

        if (error) throw error;

        if (data && data[0]) {
          setTemplates((prev) => [data[0] as Template, ...prev]);
        }
      } else {
        const simulated: Template = {
          id: `local-${Date.now()}`,
          ...newTemplateData,
          created_at: new Date().toISOString(),
        };
        setTemplates((prev) => [simulated, ...prev]);
      }

      // Reset form
      setTitle("");
      setPrice("$29");
      setGumroadUrl("");
      setPreviewUrl("");
      setDescription("");
      setImageUrl("");
      setImageFile(null);
      setImagePreview("");
      setIsFeatured(false);

      setStatusMessage({
        type: "success",
        text: isSupabaseConfigured
          ? "Template successfully published to Supabase!"
          : "Template added locally (Supabase is not yet configured in .env.local).",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving template";
      console.error(err);
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Template Handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.from("templates").delete().eq("id", id);
        if (error) throw error;
      }

      setTemplates((prev) => prev.filter((t) => t.id !== id));
      setStatusMessage({ type: "success", text: "Template deleted successfully." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete template";
      setStatusMessage({ type: "error", text: msg });
    }
  };

  return (
    <AdminLayout title="GUMROAD_TEMPLATES_MANAGER">
      <Head>
        <title>Templates Manager · Faris Rizqilail Backoffice</title>
      </Head>

      <div className="space-y-6 max-w-6xl">
        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`flex items-start justify-between rounded-xl border p-4 text-xs font-mono ${
              statusMessage.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-rose-500/30 bg-rose-500/10 text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === "success" ? (
                <CheckCircle size={16} className="text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle size={16} className="text-rose-400 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-zinc-400 hover:text-white"
            >
              &times;
            </button>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-dashed border-white/15 pb-4">
          <div>
            <span className="font-mono text-[10px] text-[#FF5500] font-bold uppercase tracking-wider block">
              [ MONETIZATION &amp; GUMROAD STORE ]
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-sans">
              Templates Catalog &amp; Image Assets
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Upload template assets to Supabase Storage and manage Gumroad products in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/templates"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/20 bg-zinc-950 px-3.5 py-1.5 font-mono text-xs text-zinc-300 hover:text-white hover:border-[#FF5500] transition-colors"
            >
              <Eye size={13} />
              <span>[ VIEW PUBLIC STORE ]</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Upload Form (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-dashed border-white/20 bg-[#0c0c12] p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <Plus size={15} className="text-[#FF5500]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  [ NEW GUMROAD TEMPLATE ]
                </h3>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">Supabase</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 font-mono text-xs">
              {/* Title */}
              <div>
                <label className="block text-zinc-400 mb-1 text-[11px] font-semibold uppercase">
                  Template Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Minimalist Virtual-Deck Portfolio"
                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                />
              </div>

              {/* Price & Featured */}
              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-zinc-400 mb-1 text-[11px] font-semibold uppercase flex items-center gap-1">
                    <DollarSign size={12} className="text-[#FF5500]" />
                    <span>Price</span>
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="$29"
                    className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-black accent-[#FF5500] cursor-pointer"
                  />
                  <label htmlFor="featured-check" className="text-zinc-300 cursor-pointer select-none text-[11px]">
                    Featured Badge
                  </label>
                </div>
              </div>

              {/* Gumroad URL */}
              <div>
                <label className="block text-zinc-400 mb-1 text-[11px] font-semibold uppercase flex items-center gap-1">
                  <LinkIcon size={12} className="text-[#FF5500]" />
                  <span>Gumroad URL *</span>
                </label>
                <input
                  type="url"
                  required
                  value={gumroadUrl}
                  onChange={(e) => setGumroadUrl(e.target.value)}
                  placeholder="https://gumroad.com/l/your-product"
                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                />
              </div>

              {/* Live Preview URL */}
              <div>
                <label className="block text-zinc-400 mb-1 text-[11px] font-semibold uppercase flex items-center gap-1">
                  <ExternalLink size={12} className="text-zinc-500" />
                  <span>Live Demo URL (Optional)</span>
                </label>
                <input
                  type="url"
                  value={previewUrl}
                  onChange={(e) => setPreviewUrl(e.target.value)}
                  placeholder="https://your-template-demo.vercel.app"
                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                />
              </div>

              {/* Image Upload Box */}
              <div className="rounded-xl border border-dashed border-white/20 bg-black/40 p-3 space-y-2.5">
                <label className="block text-zinc-300 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Upload size={13} className="text-[#FF5500]" />
                  <span>Preview Image Upload</span>
                </label>

                {/* File input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-[11px] text-zinc-400 file:mr-2 file:rounded-md file:border-0 file:bg-white/10 file:px-2.5 file:py-1 file:font-mono file:text-[10px] file:text-white hover:file:bg-white/20 cursor-pointer"
                />

                {/* Direct URL input */}
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="Or paste image URL..."
                  className="w-full rounded-lg border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                />

                {imagePreview && (
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/20 bg-zinc-900 mt-1">
                    <Image
                      src={imagePreview}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-zinc-400 mb-1 text-[11px] font-semibold uppercase flex items-center gap-1">
                  <Tag size={12} className="text-[#FF5500]" />
                  <span>Tags (Comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Next.js 16, Tailwind, Framer Motion"
                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-zinc-400 mb-1 text-[11px] font-semibold uppercase">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key features, responsive layouts, tech stack highlights..."
                  className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none font-sans text-xs"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || isUploadingImage}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#FF5500] bg-[#FF5500] py-2.5 text-xs font-bold text-black uppercase tracking-wider hover:bg-[#ff6a1f] transition-all disabled:opacity-50 cursor-pointer shadow-md"
              >
                {isSubmitting || isUploadingImage ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>Save to Supabase</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Active Catalog (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-dashed border-white/15 pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#FF5500]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  [ ACTIVE TEMPLATES ] ({templates.length})
                </h3>
              </div>

              <button
                onClick={loadTemplates}
                className="flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-white transition-colors"
              >
                <RefreshCw size={11} className={isLoading ? "animate-spin" : ""} />
                <span>Refresh</span>
              </button>
            </div>

            {isLoading ? (
              <div className="rounded-xl border border-dashed border-white/15 bg-black/40 p-12 text-center font-mono text-xs text-zinc-500">
                <RefreshCw size={16} className="animate-spin mx-auto mb-2 text-[#FF5500]" />
                <span>Loading templates from Supabase...</span>
              </div>
            ) : templates.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/15 bg-black/40 p-12 text-center font-mono text-xs text-zinc-500">
                No templates uploaded yet. Use the form to publish your first Gumroad template!
              </div>
            ) : (
              <div className="space-y-3">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="rounded-xl border border-dashed border-white/15 bg-black/60 p-4 flex flex-col sm:flex-row gap-4 items-start hover:border-white/30 transition-colors"
                  >
                    <div className="relative aspect-[16/10] w-full sm:w-36 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                      <Image
                        src={tpl.image_url || "/assets/images/faris-hero-2.png"}
                        alt={tpl.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {tpl.featured && (
                        <span className="absolute top-1 left-1 rounded bg-[#FF5500] px-1 py-0.2 font-mono text-[8px] font-bold text-black uppercase">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight font-sans">
                            {tpl.title}
                          </h4>
                          <span className="font-mono text-[11px] font-bold text-[#FF5500]">
                            {tpl.price}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDelete(tpl.id)}
                          className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                          title="Delete template"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                        {tpl.description}
                      </p>

                      {tpl.tags && tpl.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {tpl.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded border border-white/10 bg-zinc-900 px-1.5 py-0.2 font-mono text-[8px] text-zinc-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-2 font-mono text-[10px]">
                        <a
                          href={tpl.gumroad_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#FF5500] hover:underline"
                        >
                          <span>Gumroad</span>
                          <ExternalLink size={10} />
                        </a>

                        {tpl.preview_url && (
                          <a
                            href={tpl.preview_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-zinc-400 hover:text-white"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
