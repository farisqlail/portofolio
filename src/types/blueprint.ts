export type BlueprintCategory =
  | "Starters & Code"
  | "AI & Agents"
  | "Architecture & Guides"
  | "Tools & Utilities"
  | "Advisory & Services";

export type BlueprintPlatform =
  | "Gumroad"
  | "Lynk.id"
  | "LemonSqueezy"
  | "GitHub"
  | "Cal.com"
  | "Custom";

export interface Blueprint {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description?: string;
  category: BlueprintCategory | string;
  platform: BlueprintPlatform | string;
  badge?: string | null;
  price_display: string;
  purchase_url: string;
  preview_url?: string | null;
  cover_image: string;
  tech_stack: string[];
  highlights: string[];
  sort_order?: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}
