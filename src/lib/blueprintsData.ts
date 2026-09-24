import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { initialBlueprints } from "@/data/initialBlueprints";
import type { Blueprint } from "@/types/blueprint";

/**
 * Fetch all published blueprints for public catalog
 */
export async function getPublishedBlueprints(): Promise<Blueprint[]> {
  if (!isSupabaseConfigured) {
    return initialBlueprints.filter((b) => b.is_published);
  }

  try {
    const { data, error } = await supabase
      .from("blueprints")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Failed to fetch blueprints from Supabase, falling back to initial data:", error.message);
      return initialBlueprints.filter((b) => b.is_published);
    }

    if (data && data.length > 0) {
      return data as Blueprint[];
    }

    return initialBlueprints.filter((b) => b.is_published);
  } catch (err) {
    console.warn("Error in getPublishedBlueprints:", err);
    return initialBlueprints.filter((b) => b.is_published);
  }
}

/**
 * Fetch a single blueprint by its slug
 */
export async function getBlueprintBySlug(slug: string): Promise<Blueprint | null> {
  if (!isSupabaseConfigured) {
    return initialBlueprints.find((b) => b.slug === slug) ?? null;
  }

  try {
    const { data, error } = await supabase
      .from("blueprints")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return initialBlueprints.find((b) => b.slug === slug) ?? null;
    }

    return data as Blueprint;
  } catch {
    return initialBlueprints.find((b) => b.slug === slug) ?? null;
  }
}

/**
 * Admin: Fetch all blueprints (including drafts)
 */
export async function getAllBlueprintsAdmin(): Promise<Blueprint[]> {
  if (!isSupabaseConfigured) {
    return initialBlueprints;
  }

  try {
    const { data, error } = await supabase
      .from("blueprints")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Error fetching all blueprints for admin:", error.message);
      return initialBlueprints;
    }

    if (data && data.length > 0) {
      return data as Blueprint[];
    }

    return initialBlueprints;
  } catch (err) {
    console.warn("Error in getAllBlueprintsAdmin:", err);
    return initialBlueprints;
  }
}

/**
 * Admin: Toggle publication status
 */
export async function toggleBlueprintPublish(id: string, currentState: boolean): Promise<boolean> {
  if (!isSupabaseConfigured) return !currentState;

  try {
    const { error } = await supabase
      .from("blueprints")
      .update({ is_published: !currentState, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
    return !currentState;
  } catch (err) {
    console.error("Error toggling blueprint publish status:", err);
    throw err;
  }
}

/**
 * Admin: Delete blueprint
 */
export async function deleteBlueprint(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return true;

  try {
    const { error } = await supabase
      .from("blueprints")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Error deleting blueprint:", err);
    throw err;
  }
}
