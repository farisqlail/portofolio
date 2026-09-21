export type PostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  category: string;
  tags: string[];
  status: PostStatus;
  view_count: number;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  author_id?: string | null;
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string[];
  status: PostStatus;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count?: number;
}
