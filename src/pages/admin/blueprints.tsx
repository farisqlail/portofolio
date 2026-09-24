import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
  Layers,
  Edit2,
  X,
  CheckCircle2,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { initialBlueprints } from "@/data/initialBlueprints";
import type { Blueprint, BlueprintCategory, BlueprintPlatform } from "@/types/blueprint";

const CATEGORIES: BlueprintCategory[] = [
  "Starters & Code",
  "AI & Agents",
  "Architecture & Guides",
  "Tools & Utilities",
  "Advisory & Services",
];

const PLATFORMS: BlueprintPlatform[] = [
  "Gumroad",
  "Lynk.id",
  "LemonSqueezy",
  "GitHub",
  "Cal.com",
  "Custom",
];

export default function AdminBlueprints() {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("Starters & Code");
  const [platform, setPlatform] = useState<string>("Gumroad");
  const [badge, setBadge] = useState<string>("");
  const [priceDisplay, setPriceDisplay] = useState("$29");
  const [purchaseUrl, setPurchaseUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [techStackInput, setTechStackInput] = useState("Next.js 16, TypeScript, Tailwind CSS");
  const [highlightsInput, setHighlightsInput] = useState("Production Ready Architecture\nStitch Blueprint Dark UI\nFull Documentation Included");
  const [imageUrl, setImageUrl] = useState("/assets/images/categories/engineering.jpg");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // Slugify helper
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(slugify(val));
    }
  };

  // Fetch blueprints from Supabase
  const loadBlueprints = useCallback(async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured) {
      setBlueprints(initialBlueprints);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("blueprints")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setBlueprints(data as Blueprint[]);
      } else {
        setBlueprints(initialBlueprints);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load blueprints";
      console.warn("Error loading blueprints:", msg);
      setBlueprints(initialBlueprints);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlueprints();
  }, [loadBlueprints]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setDescription("");
    setCategory("Starters & Code");
    setPlatform("Gumroad");
    setBadge("");
    setPriceDisplay("$29");
    setPurchaseUrl("");
    setPreviewUrl("");
    setTechStackInput("Next.js 16, TypeScript, Tailwind CSS");
    setHighlightsInput("Production Ready Architecture\nStitch Blueprint Dark UI");
    setImageUrl("/assets/images/categories/engineering.jpg");
    setImageFile(null);
    setIsPublished(true);
    setIsModalOpen(false);
  };

  const handleOpenEdit = (item: Blueprint) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setSummary(item.summary);
    setDescription(item.description || "");
    setCategory(item.category);
    setPlatform(item.platform);
    setBadge(item.badge || "");
    setPriceDisplay(item.price_display);
    setPurchaseUrl(item.purchase_url);
    setPreviewUrl(item.preview_url || "");
    setTechStackInput(item.tech_stack ? item.tech_stack.join(", ") : "");
    setHighlightsInput(item.highlights ? item.highlights.join("\n") : "");
    setImageUrl(item.cover_image);
    setIsPublished(item.is_published);
    setIsModalOpen(true);
  };

  // Image upload to Supabase Storage
  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    if (isSupabaseConfigured) {
      setIsUploadingImage(true);
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `blueprint_${Date.now()}.${fileExt}`;
        const filePath = `blueprints/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-assets")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("blog-assets")
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          setImageUrl(publicUrlData.publicUrl);
          setStatusMessage({ type: "success", text: "Cover image uploaded successfully!" });
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Image upload failed";
        setStatusMessage({ type: "error", text: msg });
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  // Save blueprint (Insert / Update)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !purchaseUrl.trim() || !summary.trim()) {
      setStatusMessage({ type: "error", text: "Please fill in title, summary, and external purchase URL." });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const techStackArray = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const highlightsArray = highlightsInput
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      summary: summary.trim(),
      description: description.trim(),
      category,
      platform,
      badge: badge.trim() ? badge.trim().toUpperCase() : null,
      price_display: priceDisplay.trim(),
      purchase_url: purchaseUrl.trim(),
      preview_url: previewUrl.trim() ? previewUrl.trim() : null,
      cover_image: imageUrl.trim() || "/assets/images/categories/engineering.jpg",
      tech_stack: techStackArray,
      highlights: highlightsArray,
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured) {
      if (editingId) {
        setBlueprints((prev) =>
          prev.map((b) => (b.id === editingId ? { ...b, ...payload } : b))
        );
      } else {
        const newBlueprint: Blueprint = {
          id: `local-${Date.now()}`,
          ...payload,
          created_at: new Date().toISOString(),
        };
        setBlueprints((prev) => [newBlueprint, ...prev]);
      }
      setIsSubmitting(false);
      resetForm();
      setStatusMessage({ type: "success", text: "Saved locally (Supabase not configured)." });
      return;
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from("blueprints")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        setStatusMessage({ type: "success", text: "Blueprint updated successfully!" });
      } else {
        const { error } = await supabase
          .from("blueprints")
          .insert([payload]);
        if (error) throw error;
        setStatusMessage({ type: "success", text: "New blueprint published to vault!" });
      }

      resetForm();
      await loadBlueprints();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save blueprint";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle publish
  const handleTogglePublish = async (item: Blueprint) => {
    if (!isSupabaseConfigured) {
      setBlueprints((prev) =>
        prev.map((b) => (b.id === item.id ? { ...b, is_published: !b.is_published } : b))
      );
      return;
    }

    try {
      const { error } = await supabase
        .from("blueprints")
        .update({ is_published: !item.is_published, updated_at: new Date().toISOString() })
        .eq("id", item.id);
      if (error) throw error;
      setBlueprints((prev) =>
        prev.map((b) => (b.id === item.id ? { ...b, is_published: !b.is_published } : b))
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to toggle status";
      setStatusMessage({ type: "error", text: msg });
    }
  };

  // Delete
  const handleDelete = async (id: string, itemTitle: string) => {
    if (!window.confirm(`Delete "${itemTitle}" permanently from Vault?`)) return;

    if (!isSupabaseConfigured) {
      setBlueprints((prev) => prev.filter((b) => b.id !== id));
      return;
    }

    try {
      const { error } = await supabase.from("blueprints").delete().eq("id", id);
      if (error) throw error;
      setBlueprints((prev) => prev.filter((b) => b.id !== id));
      setStatusMessage({ type: "success", text: "Blueprint deleted." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete";
      setStatusMessage({ type: "error", text: msg });
    }
  };

  return (
    <AdminLayout title="The Blueprint Vault Management">
      <Head>
        <title>Manage Blueprints &amp; Vault · Admin</title>
      </Head>

      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dashed border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-zinc-500 mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
              <span>COMMERCE // 3RD-PARTY FULFILLMENT</span>
            </div>
            <h1 className="font-mono text-2xl font-bold text-white tracking-tight">
              Blueprint <span className="text-[#FF5500]">Vault</span> Management
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Manage code starters, AI agent modules, architecture runbooks, and 1-on-1 advisory sessions.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/blueprints"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 font-mono text-xs text-zinc-300 hover:border-white/30 hover:text-white transition-colors"
            >
              <Eye size={13} />
              <span>Live Vault</span>
              <ExternalLink size={10} className="text-zinc-500" />
            </Link>

            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#FF5500] bg-[#FF5500] px-4 py-2 font-mono text-xs font-bold text-black hover:bg-[#e04b00] transition-colors shadow-lg cursor-pointer"
            >
              <Plus size={14} />
              <span>New Blueprint</span>
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {statusMessage && (
          <div
            className={`flex items-center justify-between rounded-xl border px-4 py-3 font-mono text-xs ${
              statusMessage.type === "success"
                ? "border-[#A3E635]/30 bg-[#A3E635]/10 text-[#A3E635]"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
              <span>{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-zinc-500 hover:text-white">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Metrics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-dashed border-white/10 bg-black/40 p-4 font-mono">
            <span className="text-[10px] text-zinc-500 uppercase">Total Items</span>
            <div className="text-xl font-bold text-white mt-1">{blueprints.length}</div>
          </div>
          <div className="rounded-xl border border-dashed border-white/10 bg-black/40 p-4 font-mono">
            <span className="text-[10px] text-zinc-500 uppercase">Live Published</span>
            <div className="text-xl font-bold text-[#A3E635] mt-1">
              {blueprints.filter((b) => b.is_published).length}
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-white/10 bg-black/40 p-4 font-mono">
            <span className="text-[10px] text-zinc-500 uppercase">Drafts</span>
            <div className="text-xl font-bold text-zinc-400 mt-1">
              {blueprints.filter((b) => !b.is_published).length}
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-white/10 bg-black/40 p-4 font-mono">
            <span className="text-[10px] text-zinc-500 uppercase">Fulfillment</span>
            <div className="text-xl font-bold text-[#FF5500] mt-1">Gumroad / 3rd</div>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl border border-dashed border-white/15 bg-[#09090e]/95 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-dashed border-white/10 bg-white/[0.02] text-zinc-500 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Artifact</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-zinc-500">
                      Loading blueprints...
                    </td>
                  </tr>
                ) : blueprints.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-zinc-500">
                      No blueprints yet. Click &quot;New Blueprint&quot; to add your first digital product.
                    </td>
                  </tr>
                ) : (
                  blueprints.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black">
                            <Image
                              src={item.cover_image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{item.title}</span>
                              {item.badge && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/40">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-zinc-500 line-clamp-1 max-w-xs">
                              {item.summary}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-zinc-300">
                          {item.category}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-zinc-400 font-medium">{item.platform}</span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[#A3E635] font-bold">{item.price_display}</span>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border transition-colors cursor-pointer ${
                            item.is_published
                              ? "border-[#A3E635]/40 bg-[#A3E635]/15 text-[#A3E635]"
                              : "border-zinc-700 bg-zinc-800 text-zinc-500"
                          }`}
                        >
                          {item.is_published ? "PUBLISHED" : "DRAFT"}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={item.purchase_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors"
                            title="Open 3rd-party checkout"
                          >
                            <ExternalLink size={12} />
                          </a>

                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg border border-white/10 hover:border-[#FF5500] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 size={12} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-1.5 rounded-lg border border-white/10 hover:border-red-500 hover:text-red-400 text-zinc-400 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={12} />
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

        {/* Modal Form for Add / Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-dashed border-white/20 bg-[#0d0d14] p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-dashed border-white/10 pb-4 mb-6">
                <div>
                  <h2 className="font-mono text-lg font-bold text-white">
                    {editingId ? "Edit Blueprint" : "Publish New Blueprint"}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Specify title, category, external checkout URL, and presentation.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="rounded-lg p-1.5 border border-white/10 text-zinc-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Title & Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Next.js SaaS Starter"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(slugify(e.target.value))}
                      placeholder="e.g. nextjs-saas-starter"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category & Platform */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white focus:border-[#FF5500] focus:outline-none"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-black">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Fulfillment Platform *</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white focus:border-[#FF5500] focus:outline-none"
                    >
                      {PLATFORMS.map((plat) => (
                        <option key={plat} value={plat} className="bg-black">
                          {plat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Display & Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">
                      Price Display Label * (e.g. $29, Rp 149.000, Free)
                    </label>
                    <input
                      type="text"
                      required
                      value={priceDisplay}
                      onChange={(e) => setPriceDisplay(e.target.value)}
                      placeholder="e.g. $29 or Rp 149.000 or Free"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">
                      Badge (Optional: FEATURED, NEW, BESTSELLER, LIMITED)
                    </label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="e.g. FEATURED"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Purchase URL & Preview URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">
                      External Checkout / Booking URL * (Gumroad, Lynk.id, Cal.com)
                    </label>
                    <input
                      type="url"
                      required
                      value={purchaseUrl}
                      onChange={(e) => setPurchaseUrl(e.target.value)}
                      placeholder="https://gumroad.com/l/your-product"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Live Demo URL (Optional)</label>
                    <input
                      type="url"
                      value={previewUrl}
                      onChange={(e) => setPreviewUrl(e.target.value)}
                      placeholder="https://your-demo.vercel.app"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className="block text-zinc-400 mb-1">Short Summary (1-2 sentences) *</label>
                  <textarea
                    required
                    rows={2}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief description for the catalog card..."
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                  />
                </div>

                {/* Tech Stack & Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">Tech Stack (comma-separated)</label>
                    <input
                      type="text"
                      value={techStackInput}
                      onChange={(e) => setTechStackInput(e.target.value)}
                      placeholder="Next.js 16, TypeScript, Supabase"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Key Highlights (1 per line)</label>
                    <textarea
                      rows={2}
                      value={highlightsInput}
                      onChange={(e) => setHighlightsInput(e.target.value)}
                      placeholder="High Performance&#10;Stitch Dark UI"
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Cover Image Upload / URL */}
                <div>
                  <label className="block text-zinc-400 mb-1">Cover Image URL or Upload</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="/assets/images/categories/engineering.jpg"
                      className="flex-1 rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-white placeholder-zinc-600 focus:border-[#FF5500] focus:outline-none"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-dashed border-white/20 bg-white/5 px-3 py-2 text-zinc-300 hover:text-white hover:border-white/40">
                      <Upload size={13} />
                      <span>{isUploadingImage ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Published Toggle */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-700 bg-black text-[#FF5500] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="isPublished" className="text-zinc-300 cursor-pointer">
                    Publish immediately to Vault (Live)
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-dashed border-white/10">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl border border-[#FF5500] bg-[#FF5500] px-5 py-2 font-bold text-black hover:bg-[#e04b00] disabled:opacity-50 cursor-pointer shadow-lg"
                  >
                    {isSubmitting ? "Saving..." : editingId ? "Save Changes" : "Create Blueprint"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
