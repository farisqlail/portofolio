import type { GetServerSideProps } from "next";
import { getPublishedPosts } from "@/lib/blogData";
import { experiments } from "@/data/experiments";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://laildev.vercel.app").replace(
    /\/$/,
    ""
  );

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getPublishedPosts();

  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: `${SITE_URL}`, lastmod: today, changefreq: "weekly", priority: "1.0" },
    { url: `${SITE_URL}/blueprints`, lastmod: today, changefreq: "daily", priority: "0.9" },
    { url: `${SITE_URL}/blog`, lastmod: today, changefreq: "daily", priority: "0.9" },
    { url: `${SITE_URL}/hermes`, lastmod: today, changefreq: "monthly", priority: "0.8" },
    { url: `${SITE_URL}/hermes/downloads`, lastmod: today, changefreq: "weekly", priority: "0.7" },
    { url: `${SITE_URL}/privacy`, lastmod: "2026-09-22", changefreq: "monthly", priority: "0.5" },
    { url: `${SITE_URL}/terms`, lastmod: "2026-09-22", changefreq: "monthly", priority: "0.5" },
  ];

  const experimentPages = experiments.map((exp) => ({
    url: `${SITE_URL}/lab/${exp.slug}`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.8",
  }));

  const blogPages = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastmod: (post.updated_at || post.published_at || post.created_at || today).split("T")[0],
    changefreq: "weekly",
    priority: "0.85",
  }));

  const allUrls = [...staticPages, ...blogPages, ...experimentPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/0.5" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59"
  );
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null;
}
