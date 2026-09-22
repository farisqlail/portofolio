export interface Template {
  id: string;
  title: string;
  description: string;
  price: string;
  gumroad_url: string;
  preview_url?: string;
  image_url: string;
  tags?: string[];
  featured?: boolean;
  created_at?: string;
}
